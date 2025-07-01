import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const TopTenMovieList = ({ topTenMovies, onEdit, onDelete }) => {
  return (
    <>
      <section className="w-full px-4 sm:px-6 md:px-8 lg:px-12 mt-10">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-200">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-yellow-700 border-b border-yellow-300 pb-4 mb-6 select-none">
            🎬 Top 10 Movies
          </h2>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-[600px] w-full text-gray-800 text-left text-sm sm:text-base">
              <thead className="bg-yellow-50 text-yellow-900 text-xs sm:text-sm uppercase tracking-wide select-none">
                <tr>
                  <th className="px-5 py-4 whitespace-nowrap">Rank</th>
                  <th className="px-5 py-4 whitespace-nowrap">Title</th>
                  <th className="px-5 py-4 whitespace-nowrap text-center">Year</th>
                  <th className="px-5 py-4 whitespace-nowrap text-center">Rating</th>
                  <th className="px-5 py-4 whitespace-nowrap text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-100">
                {topTenMovies.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
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
                        i % 2 === 0 ? "bg-yellow-50" : "bg-white"
                      } hover:bg-yellow-100 sm:table-row block rounded-lg sm:rounded-none mb-6 sm:mb-0 p-4 sm:p-0 shadow-sm sm:shadow-none`}
                    >
                      {/* For mobile card view, add data-label */}
                      <td
                        data-label="Rank"
                        className="px-0 sm:px-5 py-2 sm:py-3 text-center font-semibold sm:table-cell block rounded-t-lg"
                      >
                        <span className="font-semibold sm:hidden block text-yellow-700 uppercase tracking-wide mb-1">
                          Rank
                        </span>
                        {movie.rank}
                      </td>
                      <td
                        data-label="Title"
                        className="px-0 sm:px-5 py-2 sm:py-3 font-semibold sm:table-cell block"
                      >
                        <span className="font-semibold sm:hidden block text-yellow-700 uppercase tracking-wide mb-1">
                          Title
                        </span>
                        {movie.title}
                      </td>
                      <td
                        data-label="Year"
                        className="px-0 sm:px-5 py-2 sm:py-3 text-center sm:table-cell block"
                      >
                        <span className="font-semibold sm:hidden block text-yellow-700 uppercase tracking-wide mb-1">
                          Year
                        </span>
                        {movie.year}
                      </td>
                      <td
                        data-label="Rating"
                        className="px-0 sm:px-5 py-2 sm:py-3 text-center sm:table-cell block"
                      >
                        <span className="font-semibold sm:hidden block text-yellow-700 uppercase tracking-wide mb-1">
                          Rating
                        </span>
                        <span className="inline-flex items-center gap-1 bg-yellow-200 text-yellow-800 font-semibold rounded-full px-3 py-1 select-none">
                          ⭐ {movie.rating.toFixed(1)}
                        </span>
                      </td>
                      <td
                        data-label="Actions"
                        className="px-0 sm:px-5 py-3 sm:py-3 text-center sm:table-cell block rounded-b-lg sm:rounded-none"
                      >
                        <span className="font-semibold sm:hidden block text-yellow-700 uppercase tracking-wide mb-3">
                          Actions
                        </span>
                        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
                          <button
                            onClick={() => onEdit(movie)}
                            title={`Edit ${movie.title}`}
                            aria-label={`Edit ${movie.title}`}
                            className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-md shadow-md transition focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1 text-xs sm:text-sm min-w-[70px] justify-center"
                          >
                            <Pencil className="w-4 h-4" />
                            <span className="hidden sm:inline">Edit</span>
                          </button>
                          <button
                            onClick={() => {
                              if (
                                window.confirm(
                                  `Are you sure you want to delete "${movie.title}"?`
                                )
                              ) {
                                onDelete(movie.id);
                              }
                            }}
                            title={`Delete ${movie.title}`}
                            aria-label={`Delete ${movie.title}`}
                            className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md shadow-md transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 text-xs sm:text-sm min-w-[70px] justify-center"
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

      {/* Custom styles for card-like layout on small screens */}
      <style>{`
        @media (max-width: 640px) {
          table, thead, tbody, th, td, tr {
            display: block;
          }
          thead tr {
            display: none;
          }
          tbody tr {
            margin-bottom: 1rem;
            border-radius: 0.75rem;
            padding: 0;
            box-shadow: 0 1px 3px rgb(0 0 0 / 0.1);
            background-color: #fff;
            border: 1px solid #fbbf24; /* Tailwind yellow-400 */
          }
          tbody td {
            display: flex;
            justify-content: space-between;
            padding: 0.75rem 1rem;
            font-size: 1rem;
            border-bottom: 1px solid #fde68a; /* Tailwind yellow-300 */
            align-items: center;
          }
          tbody td:last-child {
            border-bottom: none;
            padding-bottom: 1rem;
          }
          tbody td span:first-child {
            font-weight: 700;
            color: #b45309; /* Tailwind yellow-700 */
            text-transform: uppercase;
          }
        }
      `}</style>
    </>
  );
};

export default TopTenMovieList;
