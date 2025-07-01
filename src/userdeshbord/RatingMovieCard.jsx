import React, { useState, useEffect, useMemo } from "react";

const RatingMovieCard = ({ movie, onRate }) => {
  const movieId = movie.id || movie.movieId;

  const imageSrc = useMemo(() => {
    return movie.image || movie.img || movie.poster || "/fallback.jpg";
  }, [movie]);

  const isValidImage = useMemo(() => {
    return (
      typeof imageSrc === "string" &&
      (imageSrc.startsWith("http") || imageSrc.startsWith("data:image"))
    );
  }, [imageSrc]);

  const [userRating, setUserRating] = useState(movie.userRating || 0);

  useEffect(() => {
    setUserRating(movie.userRating || 0);
  }, [movie.userRating]);

  const handleRatingChange = (e) => {
    const newRating = Number(e.target.value);
    setUserRating(newRating);
    if (onRate) onRate(movieId, newRating);
  };

  return (
    <article
      tabIndex={0}
      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group w-full max-w-[160px] sm:max-w-[180px] md:max-w-[220px] lg:max-w-[250px] mx-auto"
      aria-label={`Movie: ${movie.title || "Untitled"}`}
    >
      <div className="relative w-full aspect-[2/3] overflow-hidden rounded-t-2xl shadow-lg">
        <img
          src={isValidImage ? imageSrc : "/fallback.jpg"}
          alt={movie.title || "Movie poster"}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            if (e.target.src !== "/fallback.jpg") {
              e.target.src = "/fallback.jpg";
            }
          }}
        />
        <div
          className="
            absolute top-3 left-3
            bg-gradient-to-br from-yellow-400 to-yellow-500
            text-black font-semibold text-sm
            px-3 py-1 rounded-full
            shadow-lg
            flex items-center
            select-none
            drop-shadow-md
            ring-1 ring-yellow-600
          "
          style={{ fontFeatureSettings: "'tnum'" }}
        >
          ⭐ {userRating.toFixed(1)}
        </div>
      </div>

      <div className="p-5 bg-yellow-50 rounded-b-2xl shadow-md border border-yellow-300">
        <h2 className="text-lg font-bold text-yellow-700 line-clamp-1 tracking-tight">
          {movie.title || "Untitled"}
        </h2>

        <p className="text-yellow-600 text-sm mt-1 line-clamp-2">
          {Array.isArray(movie.genres) && movie.genres.length > 0
            ? movie.genres.join(", ")
            : "Genre N/A"}
        </p>

        <div className="mt-5">
          <label
            htmlFor={`rating-${movieId}`}
            className="block mb-2 font-semibold text-yellow-800"
          >
            My Ratings
          </label>

          <select
            id={`rating-${movieId}`}
            value={userRating}
            onChange={handleRatingChange}
            className="
              w-full
              text-sm
              rounded-md
              border-2
              border-yellow-500
              bg-black
              px-3 py-2
              shadow-sm
              focus:outline-none
              focus:ring-4
              focus:ring-yellow-300
              focus:border-yellow-600
              transition
              duration-300
              hover:bg-yellow-300
              cursor-pointer
            "
          >
            <option value={0}>No rating</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
    </article>
  );
};

export default RatingMovieCard;
