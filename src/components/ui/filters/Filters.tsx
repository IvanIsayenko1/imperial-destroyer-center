import React from 'react';
import './Filters.css';
import { SORT_DIRECTIONS } from '@/constants/constants';

interface FiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  sortDirection: SORT_DIRECTIONS;
  onSortDirectionChange: (direction: SORT_DIRECTIONS) => void;
  onClearFilters: () => void;
  inputPlaceholder: string;
  sortOptions: { label: string; value: string }[];
}

export const Filters: React.FC<FiltersProps> = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  sortDirection,
  onSortDirectionChange,
  onClearFilters,
  inputPlaceholder,
  sortOptions,
}) => {
  const hasActiveFilters = searchTerm || sortBy;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClearFilters();
    }
  };

  return (
    <div className="filters" onKeyDown={handleKeyDown}>
      <input
        type="text"
        placeholder={inputPlaceholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="filters-search"
      />

      <div className="filters-sort-container">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="filters-sort"
        >
          <option value="">Sort by...</option>
          {sortOptions.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {sortBy && (
          <select
            value={sortDirection}
            onChange={(e) =>
              onSortDirectionChange(e.target.value as SORT_DIRECTIONS)
            }
            className="filters-direction"
          >
            <option value={SORT_DIRECTIONS.ASC}>Ascending</option>
            <option value={SORT_DIRECTIONS.DESC}>Descending</option>
          </select>
        )}

        {hasActiveFilters && (
          <button onClick={onClearFilters} className="filters-clear">
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};
