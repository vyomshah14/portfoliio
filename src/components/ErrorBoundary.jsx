import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info);
    this.setState({ error, info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ position: 'absolute', zIndex: 9999, background: 'red', color: 'white', padding: '20px', whiteSpace: 'pre-wrap', inset: 0 }}>
          <h1>Canvas Crashed!</h1>
          <p>{this.state.error && this.state.error.toString()}</p>
          <pre>{this.state.info && this.state.info.componentStack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
