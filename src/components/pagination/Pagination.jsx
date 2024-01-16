// Pagination.jsx
import React from 'react';

export function Pagination({ totalPages, currentPage, onChangePage }) {
  const getItemProps = (index) => ({
    className: `px-4 py-2 rounded focus:outline-none ${
      currentPage === index
        ? 'bg-gray-500 text-white'
        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
    }`,
    onClick: () => onChangePage(index),
  });

  const next = () => {
    if (currentPage < totalPages) {
      onChangePage(currentPage + 1);
    }
  };

  const prev = () => {
    if (currentPage > 1) {
      onChangePage(currentPage - 1);
    }
  };

  return (
    <div className="flex justify-end mt-4">
      <div className="flex items-center gap-2">
        <button
          className={`px-4 py-2 rounded focus:outline-none ${
            currentPage === 1
              ? 'bg-gray-300 text-gray-700'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
          onClick={prev}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(totalPages).keys()].map((index) => (
          <button key={index + 1} {...getItemProps(index + 1)}>
            {index + 1}
          </button>
        ))}
        <button
          className={`px-4 py-2 rounded focus:outline-none ${
            currentPage === totalPages
              ? 'bg-gray-300 text-gray-700'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
          onClick={next}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
