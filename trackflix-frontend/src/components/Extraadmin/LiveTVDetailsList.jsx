import React from "react";

const LiveTVDetailsList = ({ liveTVDetails, onEdit, onDelete, onAdd }) => {
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 pt-24 pb-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-sky-500 drop-shadow">
          📺 Live TV Show List
        </h2>
      </div>

      {/* Add New Button */}
      <div className="flex justify-center sm:justify-end mb-6">
        <button
          onClick={onAdd}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-2.5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
          aria-label="Add new live TV detail"
        >
          ➕ Add New
        </button>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-lg bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <table className="min-w-full text-xs sm:text-sm md:text-base">
          <thead>
            <tr className="bg-gradient-to-r from-sky-600 to-purple-700 text-white uppercase font-semibold tracking-wider whitespace-nowrap">
              <th className="py-4 px-4 text-left">ID</th>
              <th className="py-4 px-4 text-left">Title</th>
              <th className="py-4 px-4 text-left hidden sm:table-cell">Release Date</th>
              <th className="py-4 px-4 text-left hidden sm:table-cell">Status</th>
              <th className="py-4 px-4 text-center hidden md:table-cell">Rating</th>
              <th className="py-4 px-4 text-center hidden md:table-cell">Seasons</th>
              <th className="py-4 px-4 text-center hidden lg:table-cell">Episodes</th>
              <th className="py-4 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {liveTVDetails.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-10 text-slate-400 italic">
                  No live TV details found.
                </td>
              </tr>
            ) : (
              liveTVDetails.map((item, idx) => (
                <tr
                  key={item.id}
                  className={`transition duration-200 ${
                    idx % 2 === 0 ? "bg-slate-800" : "bg-slate-700"
                  } hover:bg-slate-600`}
                >
                  <td className="py-3 px-4 font-medium whitespace-nowrap">{item.id}</td>
                  <td className="py-3 px-4 font-semibold max-w-xs truncate" title={item.title}>
                    {item.title}
                  </td>
                  <td className="py-3 px-4 hidden sm:table-cell text-slate-300">{item.releaseDate}</td>
                  <td className="py-3 px-4 hidden sm:table-cell">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                        item.status.toLowerCase() === "active"
                          ? "bg-emerald-200 text-emerald-800"
                          : "bg-slate-300 text-slate-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center hidden md:table-cell text-slate-300">
                    {item.rating}
                  </td>
                  <td className="py-3 px-4 text-center hidden md:table-cell text-slate-300">
                    {item.seasons}
                  </td>
                  <td className="py-3 px-4 text-center hidden lg:table-cell text-slate-300">
                    {item.episodes}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center gap-2 flex-wrap">
                      <button
                        onClick={() => onEdit(item)}
                        className="px-3 py-1.5 text-xs bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-full transition duration-200"
                        aria-label={`Edit ${item.title}`}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => onDelete(item.id)}
                        className="px-3 py-1.5 text-xs bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-full transition duration-200"
                        aria-label={`Delete ${item.title}`}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LiveTVDetailsList;
