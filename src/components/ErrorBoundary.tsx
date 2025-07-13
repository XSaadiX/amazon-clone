import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import "./ErrorBoundary.css";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='error-boundary'>
          <div className='error-content'>
            <h1>🛠️ Oops! Something went wrong</h1>
            <p>We're sorry, but something unexpected happened.</p>

            <div className='error-actions'>
              <button
                onClick={() => window.location.reload()}
                className='error-button primary'>
                Refresh Page
              </button>
              <button
                onClick={() => (window.location.href = "/")}
                className='error-button secondary'>
                Go Home
              </button>
            </div>

            {process.env.NODE_ENV === "development" && (
              <details className='error-details'>
                <summary>Error Details (Development Only)</summary>
                <pre className='error-stack'>
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
