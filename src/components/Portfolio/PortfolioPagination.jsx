import React from "react";

const PortfolioPagination = ({ totalPages, currentPage, onPageChange }) => {
  const renderPageButtons = () => {
    const pageButtons = [];
    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
        <button
          key={i}
          className={`join-item mx-3 font-sans ${
            currentPage === i ? "px-4 py-4 bg-primary text-white rounded-lg" : ""
          }`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pageButtons;
  };

  return (
    <div>
      <div className="join">
        {currentPage > 1 && (
          <button
            className="join-item text-primary mr-10"
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </button>
        )}
        {renderPageButtons()}
        {currentPage < totalPages && (
          <button
            className="join-item text-primary ml-10"
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default PortfolioPagination;
