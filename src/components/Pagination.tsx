import React from 'react';
import { PaginationProps } from '../types/Pagination.type';


const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1);

  return (
    <div className="pagination">
      {currentPage > 1 && <button onClick={() => onPageChange(currentPage - 1)}>←</button>}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={page === currentPage ? 'active' : ''}
        >
          {page}
        </button>
      ))}
      {currentPage < totalPages && <button onClick={() => onPageChange(currentPage + 1)}>→</button>}
    </div>
  );
};

export default Pagination;