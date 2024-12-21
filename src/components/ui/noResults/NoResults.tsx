import React from 'react';
import './NoResults.css';

interface NoResultsProps {
  searchTerm: string;
  onClearFilters: () => void;
}

export const NoResults: React.FC<NoResultsProps> = ({
  searchTerm,
  onClearFilters,
}) => {
  return (
    <div className="no-results">
      <div className="no-results-content">
        <p className="no-results-text">
          No planets found matching &quot;{searchTerm}&quot;
        </p>
        <button onClick={onClearFilters} className="no-results-button">
          Clear Filters
        </button>
      </div>
    </div>
  );
};
