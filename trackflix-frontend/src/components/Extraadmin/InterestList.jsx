import React from "react";

const InterestList = ({ interests, onEdit, onDelete, loading, error }) => {
  if (loading)
    return (
      <p className="text-center py-8 text-gray-600">Loading interests...</p>
    );
  if (error)
    return (
      <p className="text-center py-8 text-red-600 font-semibold">Error: {error}</p>
    );

  return (
    <div className="px-4 sm:px-6">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-sky-500 drop-shadow mb-8">
        🎞️ Full Interest Collection
      </h2>

      <div className="max-w-full sm:max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6">
        {/* Table for md+ screens */}
        <div className="hidden md:block">
          <table className="min-w-full divide-y divide-gray-200 table-fixed">
            <thead className="bg-gray-100">
              <tr>
                {[
                  "ID",
                  "Title",
                  "Image",
                  "Rating",
                  "Genres",
                  "Trailer",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-5 py-3 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {interests.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-10 text-gray-500 italic text-sm"
                  >
                    No interests found.
                  </td>
                </tr>
              ) : (
                interests.map((interest) => (
                  <tr
                    key={interest.id}
                    className="hover:bg-yellow-50 transition-colors duration-200"
                  >
                    <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-700 font-medium text-center">
                      {interest.id}
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap text-base text-gray-700 font-semibold max-w-[140px] truncate">
                      {interest.title}
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <img
                        src={interest.img}
                        alt={interest.title}
                        className="w-20 h-12 object-cover rounded-md shadow-sm"
                        loading="lazy"
                      />
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-700 font-semibold text-center">
                      {interest.rating}
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-600 max-w-[180px] truncate">
                      {Array.isArray(interest.genres)
                        ? interest.genres.join(", ")
                        : interest.genres}
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <a
                        href={interest.trailerLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 font-medium underline text-sm"
                      >
                        Watch
                      </a>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap text-center space-x-3">
                      <button
                        onClick={() => onEdit(interest)}
                        className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-md shadow-sm transition text-sm"
                        aria-label={`Edit ${interest.title}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(interest.id)}
                        className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md shadow-sm transition text-sm"
                        aria-label={`Delete ${interest.title}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Card List for mobile (smaller than md) */}
        <div className="md:hidden space-y-4">
          {interests.length === 0 ? (
            <p className="text-center py-10 text-gray-500 italic text-sm">
              No interests found.
            </p>
          ) : (
            interests.map((interest) => (
              <div
                key={interest.id}
                className="border rounded-lg p-4 shadow-sm bg-gray-50 hover:bg-white transition"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={interest.img}
                    alt={interest.title}
                    className="w-24 h-14 object-cover rounded-md flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold text-gray-800 truncate">
                      {interest.title}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      Genres:{" "}
                      {Array.isArray(interest.genres)
                        ? interest.genres.join(", ")
                        : interest.genres}
                    </p>
                    <p className="text-sm text-gray-600">Rating: {interest.rating}</p>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <a
                    href={interest.trailerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 font-medium underline text-sm"
                  >
                    Watch Trailer
                  </a>
                  <div className="space-x-3">
                    <button
                      onClick={() => onEdit(interest)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-3 py-1.5 rounded-md shadow-sm transition text-sm"
                      aria-label={`Edit ${interest.title}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(interest.id)}
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-1.5 rounded-md shadow-sm transition text-sm"
                      aria-label={`Delete ${interest.title}`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default InterestList;
