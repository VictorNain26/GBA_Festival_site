/**
 * Performance monitoring hook for tracking component and user interaction performance
 * Provides tools for measuring render times, user interactions, and custom metrics
 */

import { useEffect, useRef, useCallback } from 'react';
import { performanceLogger } from '@/utils/logger';

interface PerformanceMetrics {
  renderTime?: number;
  mountTime?: number;
  interactions?: number;
  customMetrics?: Record<string, number>;
}

interface UsePerformanceMonitorOptions {
  componentName: string;
  trackRender?: boolean;
  trackMount?: boolean;
  trackInteractions?: boolean;
  thresholds?: {
    render?: number;
    mount?: number;
    interaction?: number;
  };
}

interface PerformanceMonitorReturn {
  startMeasurement: (name: string) => () => void;
  trackInteraction: (name: string, callback: () => void) => void;
  logCustomMetric: (name: string, value: number) => void;
  getMetrics: () => PerformanceMetrics;
}

export function usePerformanceMonitor(
  options: UsePerformanceMonitorOptions
): PerformanceMonitorReturn {
  const {
    componentName,
    trackRender = true,
    trackMount = true,
    trackInteractions = false,
    thresholds = {
      render: 16, // 60fps = 16ms per frame
      mount: 100,
      interaction: 200
    }
  } = options;

  const metricsRef = useRef<PerformanceMetrics>({
    interactions: 0,
    customMetrics: {}
  });
  
  const renderStartRef = useRef<number>();
  const mountStartRef = useRef<number>();

  // Track component mount time
  useEffect(() => {
    if (trackMount) {
      mountStartRef.current = performance.now();
      
      return () => {
        if (mountStartRef.current) {
          const mountTime = performance.now() - mountStartRef.current;
          metricsRef.current.mountTime = mountTime;
          
          performanceLogger.measure(
            `${componentName} Mount`,
            mountStartRef.current,
            { component: componentName, type: 'mount' }
          );

          if (thresholds.mount && mountTime > thresholds.mount) {
            performanceLogger.slowOperation(
              `${componentName} Mount`,
              mountTime,
              thresholds.mount
            );
          }
        }
      };
    }
  }, [componentName, trackMount, thresholds.mount]);

  // Track render performance
  useEffect(() => {
    if (trackRender) {
      renderStartRef.current = performance.now();
    }
  });

  useEffect(() => {
    if (trackRender && renderStartRef.current) {
      const renderTime = performance.now() - renderStartRef.current;
      metricsRef.current.renderTime = renderTime;

      performanceLogger.measure(
        `${componentName} Render`,
        renderStartRef.current,
        { component: componentName, type: 'render' }
      );

      if (thresholds.render && renderTime > thresholds.render) {
        performanceLogger.slowOperation(
          `${componentName} Render`,
          renderTime,
          thresholds.render
        );
      }
    }
  });

  const startMeasurement = useCallback((name: string) => {
    const startTime = performance.now();
    
    return () => {
      const duration = performance.now() - startTime;
      const metricName = `${componentName} ${name}`;
      
      performanceLogger.measure(metricName, startTime, {
        component: componentName,
        operation: name,
        type: 'custom'
      });
      
      // Store in custom metrics
      if (!metricsRef.current.customMetrics) {
        metricsRef.current.customMetrics = {};
      }
      metricsRef.current.customMetrics[name] = duration;
      
      return duration;
    };
  }, [componentName]);

  const trackInteraction = useCallback((name: string, callback: () => void) => {
    if (!trackInteractions) {
      callback();
      return;
    }

    const startTime = performance.now();
    
    try {
      callback();
      
      const interactionTime = performance.now() - startTime;
      metricsRef.current.interactions = (metricsRef.current.interactions || 0) + 1;
      
      performanceLogger.measure(
        `${componentName} ${name}`,
        startTime,
        { 
          component: componentName,
          interaction: name,
          type: 'interaction'
        }
      );

      if (thresholds.interaction && interactionTime > thresholds.interaction) {
        performanceLogger.slowOperation(
          `${componentName} ${name}`,
          interactionTime,
          thresholds.interaction
        );
      }
    } catch (error) {
      performanceLogger.slowOperation(
        `${componentName} ${name} Error`,
        performance.now() - startTime
      );
      throw error;
    }
  }, [componentName, trackInteractions, thresholds.interaction]);

  const logCustomMetric = useCallback((name: string, value: number) => {
    performanceLogger.measure(
      `${componentName} ${name}`,
      0,
      { 
        component: componentName,
        metric: name,
        value,
        type: 'metric'
      }
    );
    
    if (!metricsRef.current.customMetrics) {
      metricsRef.current.customMetrics = {};
    }
    metricsRef.current.customMetrics[name] = value;
  }, [componentName]);

  const getMetrics = useCallback((): PerformanceMetrics => {
    return { ...metricsRef.current };
  }, []);

  return {
    startMeasurement,
    trackInteraction,
    logCustomMetric,
    getMetrics
  };
}

/**
 * Higher-order component for automatic performance monitoring
 */
export function withPerformanceMonitoring<T extends object>(
  Component: React.ComponentType<T>,
  componentName?: string
) {
  const WrappedComponent = (props: T) => {
    const monitor = usePerformanceMonitor({
      componentName: componentName || Component.displayName || Component.name || 'Unknown',
      trackRender: true,
      trackMount: true
    });

    return <Component {...props} />;
  };

  WrappedComponent.displayName = `withPerformanceMonitoring(${componentName || Component.displayName || Component.name})`;
  
  return WrappedComponent;
}

/**
 * Performance observer for critical user journeys
 */
export function observeUserJourney(journeyName: string) {
  const startTime = performance.now();
  
  return {
    step: (stepName: string) => {
      const stepTime = performance.now();
      performanceLogger.measure(
        `Journey: ${journeyName} - ${stepName}`,
        startTime,
        {
          journey: journeyName,
          step: stepName,
          type: 'user-journey'
        }
      );
      return stepTime;
    },
    
    complete: () => {
      const totalTime = performance.now() - startTime;
      performanceLogger.measure(
        `Journey: ${journeyName} - Complete`,
        startTime,
        {
          journey: journeyName,
          total_duration: totalTime,
          type: 'user-journey-complete'
        }
      );
      
      // Flag slow user journeys
      if (totalTime > 3000) { // 3 seconds
        performanceLogger.slowOperation(
          `User Journey: ${journeyName}`,
          totalTime,
          3000
        );
      }
      
      return totalTime;
    }
  };
}