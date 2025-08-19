/**
 * Rate limiting utilities for API protection
 * Implements sliding window rate limiting with IP tracking
 */

import { securityLogger } from '@/utils/logger';

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
  keyGenerator?: (req: any) => string;
}

interface RateLimitRecord {
  requests: number[];
  blocked: boolean;
  firstRequest: number;
}

class RateLimiter {
  private store: Map<string, RateLimitRecord> = new Map();
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = {
      skipSuccessfulRequests: false,
      skipFailedRequests: false,
      keyGenerator: (req) => this.getClientIp(req),
      ...config
    };

    // Clean up old entries every 5 minutes
    setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  private getClientIp(req: any): string {
    // Handle various proxy configurations
    const forwarded = req.headers['x-forwarded-for'];
    const realIp = req.headers['x-real-ip'];
    const clientIp = req.headers['x-client-ip'];
    
    if (forwarded) {
      return forwarded.split(',')[0]?.trim() || '';
    }
    
    return realIp || clientIp || req.connection?.remoteAddress || req.socket?.remoteAddress || 'unknown';
  }

  private cleanup(): void {
    const now = Date.now();
    const cutoff = now - this.config.windowMs;
    
    for (const [key, record] of this.store.entries()) {
      // Remove requests outside the window
      record.requests = record.requests.filter(time => time > cutoff);
      
      // Remove empty records
      if (record.requests.length === 0) {
        this.store.delete(key);
      } else {
        // Reset blocked status if window has passed
        if (record.blocked && record.firstRequest < cutoff) {
          record.blocked = false;
        }
      }
    }
  }

  public async checkLimit(req: any): Promise<{ 
    allowed: boolean; 
    remaining: number; 
    resetTime: number;
    retryAfter?: number;
  }> {
    const key = this.config.keyGenerator!(req);
    const now = Date.now();
    const windowStart = now - this.config.windowMs;
    
    let record = this.store.get(key);
    
    if (!record) {
      record = {
        requests: [],
        blocked: false,
        firstRequest: now
      };
      this.store.set(key, record);
    }

    // Remove old requests outside the window
    record.requests = record.requests.filter(time => time > windowStart);

    const currentRequests = record.requests.length;
    const remaining = Math.max(0, this.config.maxRequests - currentRequests);
    const resetTime = record.requests[0] ? record.requests[0] + this.config.windowMs : now + this.config.windowMs;

    // Check if limit exceeded
    if (currentRequests >= this.config.maxRequests) {
      record.blocked = true;
      
      // Log security event
      securityLogger.suspiciousActivity('Rate limit exceeded', {
        ip: key,
        endpoint: req.url,
        user_agent: req.headers['user-agent'],
        requests_in_window: currentRequests,
        limit: this.config.maxRequests,
        window_ms: this.config.windowMs
      });

      return {
        allowed: false,
        remaining: 0,
        resetTime,
        retryAfter: Math.ceil((resetTime - now) / 1000)
      };
    }

    // Add current request to the window
    record.requests.push(now);

    return {
      allowed: true,
      remaining: remaining - 1,
      resetTime
    };
  }

  public getStats(): { 
    totalKeys: number; 
    blockedKeys: number; 
    requestsInWindow: number; 
  } {
    let blockedKeys = 0;
    let requestsInWindow = 0;
    
    for (const record of this.store.values()) {
      if (record.blocked) {
        blockedKeys++;
      }
      requestsInWindow += record.requests.length;
    }

    return {
      totalKeys: this.store.size,
      blockedKeys,
      requestsInWindow
    };
  }
}

// Rate limiter instances for different endpoints
export const apiRateLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100 // 100 requests per 15 minutes per IP
});

export const strictApiRateLimiter = new RateLimiter({
  windowMs: 5 * 60 * 1000, // 5 minutes
  maxRequests: 10 // 10 requests per 5 minutes per IP
});

export const previewRateLimiter = new RateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 5 // 5 preview requests per minute per IP
});

/**
 * Middleware factory for Next.js API routes
 */
export function createRateLimitMiddleware(limiter: RateLimiter) {
  return async (req: any, res: any): Promise<boolean> => {
    try {
      const result = await limiter.checkLimit(req);
      
      // Set rate limit headers
      res.setHeader('X-RateLimit-Limit', limiter['config'].maxRequests);
      res.setHeader('X-RateLimit-Remaining', result.remaining);
      res.setHeader('X-RateLimit-Reset', Math.ceil(result.resetTime / 1000));
      
      if (!result.allowed) {
        res.setHeader('Retry-After', result.retryAfter || 60);
        res.status(429).json({
          error: 'Too many requests',
          message: 'Rate limit exceeded. Please try again later.',
          retryAfter: result.retryAfter
        });
        return false;
      }
      
      return true;
    } catch (error) {
      securityLogger.suspiciousActivity('Rate limiter error', {
        error: error instanceof Error ? error.message : 'Unknown error',
        ip: req.headers['x-forwarded-for'] || req.connection?.remoteAddress,
        endpoint: req.url
      });
      
      // Allow request to continue on rate limiter error (fail open)
      return true;
    }
  };
}

/**
 * Enhanced rate limiter with different limits based on authentication
 */
export function createAdaptiveRateLimiter(configs: {
  anonymous: RateLimitConfig;
  authenticated?: RateLimitConfig;
  premium?: RateLimitConfig;
}) {
  const limiters = {
    anonymous: new RateLimiter(configs.anonymous),
    authenticated: configs.authenticated ? new RateLimiter(configs.authenticated) : undefined,
    premium: configs.premium ? new RateLimiter(configs.premium) : undefined
  };

  return async (req: any, res: any, userType: 'anonymous' | 'authenticated' | 'premium' = 'anonymous'): Promise<boolean> => {
    const limiter = limiters[userType] || limiters.anonymous;
    const middleware = createRateLimitMiddleware(limiter);
    return middleware(req, res);
  };
}