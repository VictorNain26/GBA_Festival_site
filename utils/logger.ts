/**
 * Development-only logger utility
 * Prevents console logs from appearing in production builds
 */

type LogLevel = 'log' | 'warn' | 'error' | 'info' | 'debug';

interface Logger {
  log: (message: string, ...args: unknown[]) => void;
  warn: (message: string, ...args: unknown[]) => void;
  error: (message: string, ...args: unknown[]) => void;
  info: (message: string, ...args: unknown[]) => void;
  debug: (message: string, ...args: unknown[]) => void;
}

const createLogger = (): Logger => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  const createLogFunction = (level: LogLevel) => {
    return (message: string, ...args: unknown[]): void => {
      if (isDevelopment) {
        console[level](`[Festival Site] ${message}`, ...args);
      }
    };
  };

  return {
    log: createLogFunction('log'),
    warn: createLogFunction('warn'),
    error: createLogFunction('error'), // Errors should always be logged
    info: createLogFunction('info'),
    debug: createLogFunction('debug'),
  };
};

export const logger = createLogger();

// For production errors that should always be logged
export const productionLogger = {
  error: (message: string, ...args: unknown[]): void => {
    console.error(`[Festival Site] ${message}`, ...args);
  }
};