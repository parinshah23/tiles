// src/components/ErrorBoundary.tsx
import React from "react";

export class ErrorBoundary extends React.Component<any, { hasError: boolean; message?: string }> {
  constructor(props:any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error:any) {
    return { hasError: true, message: error?.message ?? String(error) };
  }
  componentDidCatch(error:any, info:any) {
    console.error("Unhandled error:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="max-w-xl text-center bg-card p-8 rounded-2xl shadow-premium">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="text-muted-foreground mb-6">{this.state.message}</p>
            <a href="/" className="text-accent underline">Return home</a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
