// src/components/MoviePages/Pagination.jsx
const Pagination = ({ currentPage, totalPages, setCurrentPage }) => (
  <div className="flex justify-center mt-10 gap-4">
    <button
      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
      disabled={currentPage === 1}
      className="bg-zinc-800 px-4 py-2 rounded disabled:opacity-50"
    >
      Prev
    </button>
    <span className="text-white font-medium">
      Page {currentPage} of {totalPages}
    </span>
    <button
      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
      disabled={currentPage === totalPages}
      className="bg-zinc-800 px-4 py-2 rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
);

export default Pagination;
