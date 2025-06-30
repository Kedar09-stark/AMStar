import React, { useState, useEffect, useRef } from "react";

const CelebrityList = ({
  celebrities,
  onEdit,
  onDelete,
  loading,
  error,
  submitting,
}) => {
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const modalRef = useRef(null);

  // Focus modal when it opens
  useEffect(() => {
    if (confirmDeleteId && modalRef.current) {
      modalRef.current.focus();
    }
  }, [confirmDeleteId]);

  // Close modal on Escape key press
  useEffect(() => {
    if (!confirmDeleteId) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setConfirmDeleteId(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [confirmDeleteId]);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (confirmDeleteId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [confirmDeleteId]);

  if (loading)
    return (
      <div className="flex justify-center py-10" role="status" aria-live="polite">
        <svg
          className="animate-spin h-10 w-10 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-label="Loading spinner"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      </div>
    );

  if (error)
    return (
      <p
        role="alert"
        className="text-red-600 bg-red-100 p-4 rounded border border-red-300 max-w-xl mx-auto"
      >
        {error}
      </p>
    );

  if (!celebrities || celebrities.length === 0)
    return (
      <p className="text-center text-gray-500 py-8">No celebrities found.</p>
    );

  const confirmDelete = (id) => setConfirmDeleteId(id);
  const cancelDelete = () => setConfirmDeleteId(null);
  const handleDelete = () => {
    if (confirmDeleteId) {
      onDelete(confirmDeleteId);
      setConfirmDeleteId(null);
    }
  };

  return (
    <>
      <h3 className="text-3xl font-extrabold mb-8 text-center text-sky-500 drop-shadow">
        🎬 Full Movie List
      </h3>
      <ul className="space-y-6 max-w-4xl mx-auto" role="list">
        {celebrities.map((celebrity) => (
          <li
            key={celebrity.id}
            tabIndex={0}
            className="
              bg-white rounded-lg shadow-md flex items-center justify-between p-5
              hover:shadow-xl focus-within:ring-2 focus-within:ring-blue-400
              transition-shadow duration-300 outline-none cursor-pointer
              focus-visible:outline focus-visible:outline-blue-400
            "
            aria-label={`Celebrity ${celebrity.name}`}
          >
            <div className="flex items-center space-x-5">
              <img
                src={celebrity.img}
                alt={celebrity.name || "Celebrity"}
                className="w-20 h-20 rounded-lg object-cover border border-gray-200"
                loading="lazy"
                decoding="async"
              />
              <div>
                <p className="font-bold text-xl text-gray-900">{celebrity.name}</p>
                <p className="text-sm text-gray-500">ID: {celebrity.id}</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => onEdit(celebrity)}
                disabled={submitting}
                className="
                  px-5 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 
                  text-white font-semibold shadow-md transition-colors
                  disabled:opacity-60 disabled:cursor-not-allowed
                  focus:outline-none focus:ring-2 focus:ring-yellow-300
                  focus-visible:ring-yellow-400
                "
                aria-label={`Edit ${celebrity.name}`}
              >
                Edit
              </button>

              <button
                onClick={() => confirmDelete(celebrity.id)}
                disabled={submitting}
                className="
                  px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700
                  text-white font-semibold shadow-md transition-colors
                  disabled:opacity-60 disabled:cursor-not-allowed
                  focus:outline-none focus:ring-2 focus:ring-red-400
                  focus-visible:ring-red-500
                "
                aria-label={`Delete ${celebrity.name}`}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          ref={modalRef}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div
            className="
              bg-white rounded-lg p-6 max-w-sm w-full shadow-lg text-center space-y-4
              focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500
            "
          >
            <p className="text-lg font-semibold text-gray-800">
              Are you sure you want to delete this celebrity?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDelete}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-red-400 focus-visible:ring-red-500"
                autoFocus
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-gray-400 focus-visible:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CelebrityList;
