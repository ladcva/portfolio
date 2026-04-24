import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(prevProps) {
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false });
    }
  }

  componentDidCatch(error, info) {
    console.error("Portfolio render error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="page-section">
          <div className="section-shell">
            <div className="empty-state">
              This page could not render cleanly. I have logged the issue in the console; use the menu to continue browsing.
            </div>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
