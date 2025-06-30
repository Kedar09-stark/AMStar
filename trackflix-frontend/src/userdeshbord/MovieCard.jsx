// MovieCard.jsx

import React, { useState, useEffect } from "react";

const MovieCard = ({ movie, onRate, editable = false }) => {
  const movieId = movie.id || movie.movieId;
  const imageSrc = movie.image || movie.img || movie.poster || "/fallback.jpg";
  const isValidImage =
    typeof imageSrc === "string" &&
    (imageSrc.startsWith("http") || imageSrc.startsWith("data:image"));

  // For editable mode, keep local userRating state, else just show fixed rating
  const [userRating, setUserRating] = useState(movie.userRating || 0);

  useEffect(() => {
    setUserRating(movie.userRating || 0);
  }, [movie.userRating]);

  const handleRatingChange = (e) => {
    const newRating = Number(e.target.value);
    setUserRating(newRating);
    if (onRate) {
      onRate(movieId, newRating);
    }
  };

  return (
    <article
      tabIndex={0}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 max-w-xs mx-auto"
      aria-label={`Movie: ${movie.title || "Untitled"}`}
    >
      <img
        src={isValidImage ? imageSrc : "/fallback.jpg"}
        alt={movie.title || "Movie poster"}
        className="w-full h-64 object-cover"
        loading="lazy"
        onError={(e) => {
          e.target.src = "/fallback.jpg";
        }}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900 truncate">{movie.title || "Untitled"}</h2>
        <p className="text-yellow-500 mt-1">
          ⭐ {editable ? userRating.toFixed(1) : (movie.rating || 0).toFixed(1)}
        </p>
        <p className="text-gray-600 text-sm mt-2">
          {Array.isArray(movie.genres) && movie.genres.length > 0
            ? movie.genres.join(", ")
            : "Genre N/A"}
        </p>

        {/* Show rating dropdown only if editable */}
        {editable && (
          <div className="mt-4">
            <label htmlFor={`rating-${movieId}`} className="block text-sm font-medium text-gray-700">
              Rate this movie:
            </label>
            <select
              id={`rating-${movieId}`}
              value={userRating}
              onChange={handleRatingChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            >
              <option value={0}>No rating</option>
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </article>
  );
};

export default MovieCard;
