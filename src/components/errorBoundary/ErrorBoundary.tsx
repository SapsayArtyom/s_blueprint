import React, { ReactNode } from "react";
import { ErrorInfo } from "react";

interface ErrorBoundaryProps {
    children: ReactNode
    fallback?: ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }
  
    componentDidCatch(error: Error, info: ErrorInfo) {
        // Example "componentStack":
        //   in ComponentThatThrows (created by App)
        //   in ErrorBoundary (created by App)
        //   in div (created by App)
        //   in App
        console.log(error, info.componentStack);
        // logErrorToMyService(error, info.componentStack);
    }
  
    render() {
        const { hasError } = this.state;
        const { children } = this.props;
        if (this.state.hasError) {
        // You can render any custom fallback UI
            return this.props.fallback;
        }
  
        return this.props.children;
    }
}