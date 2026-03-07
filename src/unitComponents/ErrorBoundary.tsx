import { Button } from "antd";
import React, { Component } from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
  seconds: number;
  startTimeMillis: number;
}

// const TIMEOUT_MILLIS = 30_000;
const TIMEOUT_MILLIS = 5000;

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  reloadTimeoutId: number | undefined;
  secondsIntervalId: number | undefined;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      seconds: 0,
      startTimeMillis: 0,
    };
  }

  componentDidCatch(): void {
    this.setState({
      hasError: true,
      startTimeMillis: Date.now(),
    });
    this.reloadTimeoutId = setTimeout(
      () => globalThis.location.reload(),
      TIMEOUT_MILLIS,
    );
    this.secondsIntervalId = setInterval(() => {
      this.setState((prevState) => ({
        seconds: Math.round((Date.now() - prevState.startTimeMillis) / 1000),
      }));
    }, 100);
  }

  componentWillUnmount(): void {
    clearTimeout(this.reloadTimeoutId);
    clearInterval(this.secondsIntervalId);
  }

  render(): JSX.Element | React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="tw-m-8">
          <div>
            <p>
              Поймана ошибка, страница перезагрузится автоматически через{" "}
              {TIMEOUT_MILLIS / 1000}
              секунд (прошло {this.state.seconds} секунд).
            </p>
          </div>
          <br />
          <Button
            className="tw-mr-8 custom-btn-bg-color"
            onClick={() => globalThis.location.reload()}
          >
            Принудительная перезагрузка
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
