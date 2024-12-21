import React from "react";
import "./Error.css";

interface ErrorProps {
  message?: string;
  onRetry?: () => void;
}

export const Error: React.FC<ErrorProps> = ({
  message = "Something went wrong",
  onRetry,
}) => {
  return (
    <div className="error-container">
      <div className="error-content">
        <div className="error-icon">!</div>
        <h2 className="error-title">Error</h2>
        <p className="error-message">{message}</p>
        {onRetry && (
          <button onClick={onRetry} className="error-retry">
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};
