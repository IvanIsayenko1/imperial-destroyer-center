import React from "react";
import "./Loading.css";

interface LoadingProps {
  text?: string;
}

export const Loading: React.FC<LoadingProps> = ({ text = "Loading..." }) => {
  return (
    <div className="loading-container">
      <div className="loading-spinner" data-testid="loading-spinner" />
      <p className="loading-text">{text}</p>
    </div>
  );
};
