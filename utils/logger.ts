/**
 * Production-aware logger utility with structured logging
 * Provides development debugging while maintaining production safety
 */

type LogLevel = 'log' | 'warn' | 'error' | 'info' | 'debug';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
  userId?: string;
  sessionId?: string;
}

interface Logger {
  log: (message: string, context?: Record<string, unknown>) => void;
  warn: (message: string, context?: Record<string, unknown>) => void;
  error: (message: string, context?: Record<string, unknown>) => void;
  info: (message: string, context?: Record<string, unknown>) => void;
  debug: (message: string, context?: Record<string, unknown>) => void;
}

const createLogger = (): Logger => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isProduction = process.env.NODE_ENV === 'production';

  const createLogEntry = (level: LogLevel, message: string, context?: Record<string, unknown>): LogEntry => ({
    timestamp: new Date().toISOString(),
    level,
    message,
    context,
    sessionId: typeof window !== 'undefined' ? window.sessionStorage?.getItem('sessionId') || undefined : undefined
  });

  const createLogFunction = (level: LogLevel) => {
    return (message: string, context?: Record<string, unknown>): void => {
      const logEntry = createLogEntry(level, message, context);

      if (isDevelopment) {
        // Full logging in development
        console[level](`[Festival Site] ${message}`, context || '');
      } else if (isProduction) {
        // Production: Only errors and critical warnings
        if (level === 'error') {
          console.error(`[Festival Site] ${message}`, { ...logEntry, context });
          
          // Send to monitoring service in production (placeholder)
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'exception', {
              description: message,
              fatal: false,
              custom_map: context
            });
          }
        } else if (level === 'warn' && context?.critical) {
          console.warn(`[Festival Site] ${message}`, { ...logEntry, context });
        }
      }
    };
  };

  return {
    log: createLogFunction('log'),
    warn: createLogFunction('warn'),
    error: createLogFunction('error'),
    info: createLogFunction('info'),
    debug: createLogFunction('debug'),
  };
};

export const logger = createLogger();

// Specialized loggers for different contexts
export const apiLogger = {
  error: (endpoint: string, error: Error, context?: Record<string, unknown>) => {
    logger.error(`API Error: ${endpoint}`, {
      error: error.message,
      stack: error.stack,
      endpoint,
      ...context
    });
  },
  
  warn: (endpoint: string, message: string, context?: Record<string, unknown>) => {
    logger.warn(`API Warning: ${endpoint} - ${message}`, {
      endpoint,
      ...context
    });
  }
};

export const performanceLogger = {
  measure: (name: string, startTime: number, context?: Record<string, unknown>) => {
    const duration = performance.now() - startTime;
    logger.info(`Performance: ${name}`, {
      duration: `${duration.toFixed(2)}ms`,
      ...context
    });
  },

  slowOperation: (name: string, duration: number, threshold = 1000) => {
    if (duration > threshold) {
      logger.warn(`Slow Operation Detected: ${name}`, {
        duration: `${duration.toFixed(2)}ms`,
        threshold: `${threshold}ms`,
        critical: true
      });
    }
  }
};

export const securityLogger = {
  suspiciousActivity: (activity: string, context?: Record<string, unknown>) => {
    logger.warn(`Security Alert: ${activity}`, {
      ...context,
      critical: true,
      timestamp: new Date().toISOString()
    });
  },

  authFailure: (reason: string, context?: Record<string, unknown>) => {
    logger.error(`Authentication Failure: ${reason}`, {
      ...context,
      security: true
    });
  }
};