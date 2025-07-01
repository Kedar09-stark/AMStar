import React from "react";

const LiveTVShowList = ({ liveTVShows, onEdit, onDelete }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
        📺 Live TV Shows Collection
      </h2>

      {/* Mobile View */}
      <div className="space-y-6 lg:hidden">
        {liveTVShows.length === 0 ? (
          <p className="text-center text-gray-400 italic">No Live TV Shows found.</p>
        ) : (
          liveTVShows.map((show) => (
            <div
              key={show.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 space-y-3"
            >
              <div className="text-lg font-semibold text-indigo-700">{show.title}</div>
              <div className="text-sm text-gray-500">ID: {show.id}</div>
              <div className="text-sm text-yellow-600">⭐ Rating: {show.rating}</div>
              <div className="text-sm text-gray-600">
                🎭 Genres: {show.genres?.join(", ")}
              </div>
              <div className="text-sm text-gray-500">📅 Release: {show.releaseDate}</div>
              <div className="flex gap-3 pt-3">
                <button
                  onClick={() => onEdit(show)}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => onDelete(show.id)}
                  className="flex-1 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-md transition"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop & Tablet View */}
      <div className="hidden lg:block overflow-x-auto rounded-xl shadow border border-gray-300 bg-white mt-10">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
            <tr>
              {["ID", "Title", "Rating", "Genres", "Release Date", "Actions"].map((th) => (
                <th
                  key={th}
                  className="px-6 py-4 text-left text-sm font-bold text-indigo-700 tracking-wider"
                >
                  {th}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {liveTVShows.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-400 italic">
                  No Live TV Shows found.
                </td>
              </tr>
            ) : (
              liveTVShows.map((show) => (
                <tr key={show.id} className="hover:bg-indigo-50 transition">
                  <td className="px-6 py-4 text-sm font-mono text-indigo-600">{show.id}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-indigo-900">{show.title}</td>
                  <td className="px-6 py-4 text-sm text-yellow-600 font-bold">{show.rating}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {show.genres?.join(", ")}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{show.releaseDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => onEdit(show)}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-md transition"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => onDelete(show.id)}
                        className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold rounded-md transition"
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

export default LiveTVShowList;
