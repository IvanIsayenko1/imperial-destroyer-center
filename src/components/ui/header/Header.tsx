import React, { useState } from 'react';
import './Header.css';
import { Navigation } from '../navigation/Navigation';
import { Title } from '../title/Title';

interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Imperial Destroyer Center',
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header>
      <div className="header-wrapper">
        <div className="header-top">
          <Title title={title} />
          <button
            className="menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
          >
            ☰
          </button>
        </div>
        <div className={`navigation-container ${isMenuOpen ? 'open' : ''}`}>
          <Navigation />
        </div>
      </div>
    </header>
  );
};
