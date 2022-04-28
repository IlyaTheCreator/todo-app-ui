import React from 'react';

import MonkeyImage from '../../assets/images/monkey-error.gif';

import classes from './ErrorBoundary.module.scss';

interface IErrorBoundaryProps {
  children: React.ReactNode;
  error: boolean;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

/**
 * HOC for managing app errors
 * Manual: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/error_boundaries/
 */
class ErrorBoundary extends React.Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  public state: IErrorBoundaryState = { hasError: false };

  // Update state so the next render will show the fallback UI.
  public static getDerivedStateFromError(_: Error): IErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error: ', error, errorInfo);
  }

  public componentDidMount() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
  }

  public render() {
    if (this.state.hasError || this.props.error) {
      return (
        <div className={classes.error}>
          <h1 className={classes.errorTitle}>
            Soryan. Something went wrong.
          </h1>
          <img
            className={classes.errorImage}
            src={MonkeyImage}
            alt="error message"
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
