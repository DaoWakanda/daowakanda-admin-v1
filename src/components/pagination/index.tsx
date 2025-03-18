import React from "react";

interface Props {
  page: number;
  numOfItemsPerPage: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  page = 0,
  numOfItemsPerPage = 0,
  itemCount = 0,
  pageCount = 0,
  hasPreviousPage = false,
  hasNextPage = false,
  onPageChange,
}:Props) => {
// Generate page numbers
const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

return (
  <div className="flex items-center gap-2 mt-4">
    {/* Previous Button */}
    <button
      className={`px-3 py-1 rounded ${hasPreviousPage ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
      onClick={() => hasPreviousPage && onPageChange(page - 1)}
      disabled={!hasPreviousPage}
    >
      Prev
    </button>

    {/* Page Numbers */}
    {pages.map((p) => (
      <button
        key={p}
        className={`px-3 py-1 rounded ${p === page + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
        onClick={() => onPageChange(p)}
      >
        {p}
      </button>
    ))}

    {/* Next Button */}
    <button
      className={`px-3 py-1 rounded ${hasNextPage ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
      onClick={() => hasNextPage && onPageChange(page + 1)}
      disabled={!hasNextPage}
    >
      Next
    </button>
  </div>
);
};

export default Pagination;