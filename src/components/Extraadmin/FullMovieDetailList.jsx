import React from "react";

const FullMovieDetailList = ({
  fullMovieDetails,
  onEdit,
  onDelete,
  loading,
  error,
}) => {
  if (loading)
    return (
      <p className="text-center text-sky-500 font-medium mt-8 animate-pulse">
        Loading full movie details...
      </p>
    );
  if (error)
    return (
      <p className="text-red-500 text-center font-semibold mt-8">{error}</p>
    );
  if (!fullMovieDetails || fullMovieDetails.length === 0)
    return (
      <p className="text-center text-gray-400 italic mt-8">
        No full movies found.
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h3 className="text-3xl font-extrabold mb-8 text-center text-sky-500 drop-shadow">
        🎬 Full Movie List
      </h3>

      <div className="space-y-8">
        {fullMovieDetails.map((movie) => (
          <div
            key={movie.id}
            className="bg-gradient-to-br from-slate-800 via-slate-900 to-black text-white rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col md:flex-row gap-6 p-6"
          >
            {/* Poster Image */}
            {movie.image ? (
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full md:w-48 h-auto rounded-lg object-cover shadow-lg"
                loading="lazy"
              />
            ) : (
              <div className="w-full md:w-48 h-64 bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 text-lg font-semibold">
                No Image
              </div>
            )}

            {/* Movie Info */}
            <div className="flex-grow flex flex-col justify-between">
              <div>
                <h4 className="text-2xl font-bold">{movie.title}</h4>
                <p
                  className="mt-3 text-slate-300 line-clamp-3 leading-relaxed"
                  title={movie.overview}
                  style={{ cursor: "help" }}
                >
                  {movie.overview}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {movie.genres?.map((g) => (
                    <span
                      key={g}
                      className="bg-gradient-to-r from-sky-500 to-fuchsia-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow"
                    >
                      {g}
                    </span>
                  ))}
                </div>

                <div className="mt-4 text-sm text-slate-400 space-y-1">
                  <p>
                    <span className="font-medium text-sky-400">📅 Release Date:</span>{" "}
                    {movie.releaseDate}
                  </p>
                  <p>
                    <span className="font-medium text-sky-400">⭐ Rating:</span> {movie.rating} / 10 &nbsp;|&nbsp;
                    <span className="font-medium text-sky-400">⏱ Runtime:</span> {movie.runtime} min
                  </p>
                  <p>
                    <span className="font-medium text-sky-400">💰 Budget:</span> ${movie.budget.toLocaleString()} &nbsp;|&nbsp;
                    <span className="font-medium text-sky-400">💵 Box Office:</span> ${movie.boxOffice.toLocaleString()}
                  </p>
                  <p>
                    <span className="font-medium text-sky-400">🎬 Director{movie.director?.length > 1 ? "s" : ""}:</span>{" "}
                    {movie.director?.join(", ")}
                  </p>
                  <p>
                    <span className="font-medium text-sky-400">🎭 Cast:</span>{" "}
                    {movie.cast?.slice(0, 5).join(", ")}
                    {movie.cast?.length > 5 ? "..." : ""}
                  </p>
                  <p>
                    <span className="font-medium text-sky-400">🏆 Awards:</span> {movie.awards?.length || 0}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-6 flex gap-4 justify-end">
                <button
                  onClick={() => onEdit(movie)}
                  className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => onDelete(movie.id)}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FullMovieDetailList;
