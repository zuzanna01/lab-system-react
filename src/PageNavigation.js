import React from 'react';
import './PageNavigation.css';

const PageNavigation = ({ totalPages, currentPage, handlePageClick }) => {
  
    const generatePageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        const ellipsis = '...';
    
        if (totalPages <= maxVisiblePages) {
          for (let i = 0; i < totalPages; i++) {
            pages.push(
              <button key={i} onClick={() => handlePageClick(i)} disabled={i === currentPage}>
                {i + 1}
              </button>
            );
          }
        } else {
          if (currentPage < maxVisiblePages - 1) {
            for (let i = 0; i < maxVisiblePages - 1; i++) {
              pages.push(
                <button key={i} onClick={() => handlePageClick(i)} disabled={i === currentPage}>
                  {i + 1}
                </button>
              );
            }
            pages.push(<button key={maxVisiblePages - 1} disabled>{ellipsis}</button>);
            pages.push(
              <button key={totalPages - 1} onClick={() => handlePageClick(totalPages - 1)}>
                {totalPages}
              </button>
            );
          } else {
            pages.push(
              <button key={0} onClick={() => handlePageClick(0)}>
                1
              </button>
            );
            pages.push(<button key={1} disabled>{ellipsis}</button>);
            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
              pages.push(
                <button key={i} onClick={() => handlePageClick(i)} disabled={i === currentPage}>
                  {i + 1}
                </button>
              );
            }
            if (currentPage + 2 !== totalPages) {
              pages.push(<button key={currentPage + 2} disabled>{ellipsis}</button>);
            }
            pages.push(
              <button key={totalPages - 1} onClick={() => handlePageClick(totalPages - 1)}>
                {totalPages}
              </button>
            );
          }
        }
        return pages;
      };

  return (
    <div className="page-navigation">
      <button onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 0}>
        Poprzednia
      </button>
      {generatePageNumbers()}
      <button onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages - 1}>
        Następna
      </button>
    </div>
  );
};

export default PageNavigation;