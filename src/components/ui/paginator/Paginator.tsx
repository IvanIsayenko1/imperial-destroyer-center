import React from 'react';
import './Paginator.css';

interface PaginatorProps {
  currentPage: number;
  totalElements: number;
  elementsPerPage: number;
  onPageChange: (page: number) => void;
}

export const Paginator: React.FC<PaginatorProps> = ({
  currentPage,
  totalElements,
  elementsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalElements / elementsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="paginator box">
      <button
        className="paginator-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <div className="paginator-pages">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`paginator-page ${
              currentPage === number ? 'active' : ''
            }`}
          >
            {number}
          </button>
        ))}
      </div>

      <button
        className="paginator-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};
