import React from "react";
import "./Footer.css";

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        © {new Date().getFullYear()} Imperial Fleet Database
      </div>
    </footer>
  );
};
