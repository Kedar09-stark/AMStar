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

  useEffect(() => {
    if (confirmDeleteId && modalRef.current) modalRef.current.focus();
  }, [confirmDeleteId]);

  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && setConfirmDeleteId(null);
    if (confirmDeleteId) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [confirmDeleteId]);

  useEffect(() => {
    document.body.style.overflow = confirmDeleteId ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [confirmDeleteId]);

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (error)
    return (
      <p className="text-red-600 bg-red-100 p-4 rounded-md border border-red-300 max-w-xl mx-auto">
        {error}
      </p>
    );

  if (!celebrities || celebrities.length === 0)
    return <p className="text-center text-gray-500 py-8">No celebrities found.</p>;

  return (
    <>
      <h3 className="text-2xl font-bold text-center mb-6 text-sky-600">
        🎬 Full Movie List
      </h3>

      <ul className="space-y-4 px-4 sm:px-6 max-w-3xl mx-auto">
        {celebrities.map((celebrity) => (
          <li
            key={celebrity.id}
            tabIndex={0}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 flex items-center justify-between gap-4 focus-within:ring-2 focus-within:ring-sky-400"
          >
            <div className="flex items-center gap-4">
              <img
                src={celebrity.img || "/fallback.jpg"}
                alt={celebrity.name || "Celebrity"}
                className="w-16 h-16 rounded-lg object-cover border border-gray-200"
              />
              <div>
                <p className="text-base font-semibold text-gray-900">{celebrity.name}</p>
                <p className="text-sm text-gray-500">ID: {celebrity.id}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onEdit(celebrity)}
                disabled={submitting}
                className="px-3 py-1 text-xs bg-yellow-400 hover:bg-yellow-500 text-white font-medium rounded-md transition disabled:opacity-50"
              >
                Edit
              </button>
              <button
                onClick={() => setConfirmDeleteId(celebrity.id)}
                disabled={submitting}
                className="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {confirmDeleteId && (
        <div
          role="dialog"
          aria-modal="true"
          ref={modalRef}
          tabIndex={-1}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
        >
          <div className="bg-white rounded-lg p-6 w-full max-w-sm text-center space-y-4">
            <p className="text-lg font-medium text-gray-800">
              Are you sure you want to delete this celebrity?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  onDelete(confirmDeleteId);
                  setConfirmDeleteId(null);
                }}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-5 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-md"
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
