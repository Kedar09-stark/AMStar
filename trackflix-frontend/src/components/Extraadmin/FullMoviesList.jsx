import React from "react";

const FullMoviesList = ({ fullMovies, onEdit, onDelete }) => {
  if (!fullMovies.length)
    return (
      <p className="text-center text-slate-400 italic mt-10">
        No full movies found.
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto px-4 pt-20 pb-10">
      <h2 className="text-3xl font-extrabold text-center text-sky-500 drop-shadow mb-8">
        🎞️ Full Movies Collection
      </h2>

      <div className="flex flex-col space-y-8">
        {fullMovies.map((movie) => (
          <article
            key={movie.id}
            tabIndex={0}
            className="
              bg-gradient-to-br from-slate-800 via-slate-900 to-black 
              text-white rounded-xl shadow-xl p-6 flex flex-col
              transform transition-transform duration-300
              hover:scale-[1.02] hover:shadow-2xl
              focus:outline-none focus:ring-4 focus:ring-sky-500
              focus:ring-opacity-60 cursor-pointer
            "
            aria-label={`Movie: ${movie.title}`}
          >
            {/* Movie Info */}
            <header className="mb-5">
              <h3 className="text-2xl font-bold text-sky-400">{movie.title}</h3>
              <p className="text-sm text-slate-400">ID: {movie.id}</p>
            </header>

            <section className="flex-grow text-slate-200 space-y-2 text-base leading-relaxed">
              <p>
                <span className="text-sky-400 font-semibold">⭐ Rating:</span>{" "}
                {movie.rating}
              </p>
              <p>
                <span className="text-sky-400 font-semibold">🎭 Genres:</span>{" "}
                {movie.genres.join(", ")}
              </p>
              <p>
                <span className="text-sky-400 font-semibold">📅 Release:</span>{" "}
                {movie.releaseDate}
              </p>
            </section>

            {/* Action Buttons */}
            <footer className="mt-6 flex gap-4">
              <button
                onClick={() => onEdit(movie)}
                className="
                  flex-1 py-3 rounded bg-sky-600 hover:bg-sky-700 
                  text-white font-semibold shadow-md transition duration-200
                  focus:outline-none focus:ring-4 focus:ring-sky-400
                  focus:ring-opacity-70 transform hover:scale-105
                  active:scale-95
                "
                aria-label={`Edit movie ${movie.title}`}
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => onDelete(movie.id)}
                className="
                  flex-1 py-3 rounded bg-rose-600 hover:bg-rose-700 
                  text-white font-semibold shadow-md transition duration-200
                  focus:outline-none focus:ring-4 focus:ring-rose-400
                  focus:ring-opacity-70 transform hover:scale-105
                  active:scale-95
                "
                aria-label={`Delete movie ${movie.title}`}
              >
                🗑️ Delete
              </button>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
};

export default FullMoviesList;
