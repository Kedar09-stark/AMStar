import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const TopTenMovieList = ({ topTenMovies, onEdit, onDelete }) => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-12 mt-10">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-200">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-yellow-700 border-b border-yellow-300 pb-4 mb-6 select-none">
          🎬 Top 10 Movies
        </h2>

        {/* Mobile layout */}
        <div className="sm:hidden space-y-6">
          {topTenMovies.length === 0 ? (
            <p className="text-center text-gray-400 italic font-medium py-12">
              No top 10 movies available.
            </p>
          ) : (
            topTenMovies.map((movie, i) => (
              <div
                key={movie.id}
                className={`rounded-xl p-4 shadow-sm border ${
                  i % 2 === 0 ? "bg-yellow-50" : "bg-white"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold text-yellow-800">
                    #{movie.rank} - {movie.title}
                  </h3>
                  <img
                    src={movie.img}
                    alt={movie.title}
                    className="w-16 h-16 rounded object-cover border"
                  />
                </div>
                <p className="text-gray-700">
                  <strong>Year:</strong> {movie.year}
                </p>
                <p className="text-gray-700">
                  <strong>Rating:</strong>{" "}
                  <span className="inline-flex items-center bg-yellow-200 text-yellow-800 font-semibold rounded-full px-2 py-1 text-sm">
                    ⭐ {movie.rating.toFixed(1)}
                  </span>
                </p>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => onEdit(movie)}
                    className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-md shadow transition text-xs"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      window.confirm(`Delete "${movie.title}"?`) &&
                      onDelete(movie.id)
                    }
                    className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md shadow transition text-xs"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Table layout */}
        <div className="hidden sm:block overflow-x-auto border rounded-lg mt-6">
          <table className="min-w-[700px] w-full text-sm sm:text-base text-left text-gray-800">
            <thead className="bg-yellow-50 text-yellow-900 uppercase text-xs sm:text-sm tracking-wide">
              <tr>
                {["Rank", "Poster", "Title", "Year", "Rating", "Actions"].map(
                  (h) => (
                    <th key={h} className="px-5 py-4 text-center sm:text-left">
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {topTenMovies.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="py-12 text-center text-gray-400 italic font-medium"
                  >
                    No top 10 movies available.
                  </td>
                </tr>
              ) : (
                topTenMovies.map((movie, i) => (
                  <tr
                    key={movie.id}
                    className={`transition-colors duration-300 ${
                      i % 2 ? "bg-white" : "bg-yellow-50"
                    } hover:bg-yellow-100`}
                  >
                    <td className="px-5 py-3 text-center sm:text-left">
                      {movie.rank}
                    </td>
                    <td className="px-5 py-3 text-center">
                      <img
                        src={movie.img}
                        alt={movie.title}
                        className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded shadow-sm mx-auto"
                      />
                    </td>
                    <td className="px-5 py-3 font-semibold">{movie.title}</td>
                    <td className="px-5 py-3 text-center">{movie.year}</td>
                    <td className="px-5 py-3 text-center">
                      <span className="inline-flex items-center bg-yellow-200 text-yellow-800 font-semibold rounded-full px-3 py-1 select-none">
                        ⭐ {movie.rating.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-center">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => onEdit(movie)}
                          className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-md shadow transition text-xs sm:text-sm"
                        >
                          <Pencil className="w-4 h-4" />
                          <span className="hidden sm:inline">Edit</span>
                        </button>
                        <button
                          onClick={() =>
                            window.confirm(`Delete "${movie.title}"?`) &&
                            onDelete(movie.id)
                          }
                          className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md shadow transition text-xs sm:text-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Delete</span>
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
    </section>
  );
};

export default TopTenMovieList;
