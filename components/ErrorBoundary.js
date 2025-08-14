import { Component } from 'react';

/**
 * Error boundary component to catch and handle React errors gracefully.
 * Provides a user-friendly fallback UI when JavaScript errors occur.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="font-title text-4xl md:text-6xl text-accent mb-8">
              Oops!
            </h1>
            <p className="font-body text-lg md:text-xl text-primary mb-6 max-w-md">
              Something went wrong. Please refresh the page or try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 border border-primary rounded-full text-primary hover:bg-primary hover:text-background transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;