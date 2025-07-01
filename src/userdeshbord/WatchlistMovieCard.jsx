import React from "react";

const WatchlistMovieCard = ({ movie }) => {
  // Determine valid image URL fallback
  const imageSrc = movie.image || movie.img || movie.poster || "/fallback.jpg";
  const isValidImage =
    typeof imageSrc === "string" &&
    (imageSrc.startsWith("http") || imageSrc.startsWith("data:image"));

  // Format rating safely
  const displayRating =
    typeof movie.rating === "number" && !isNaN(movie.rating)
      ? movie.rating.toFixed(1)
      : "N/A";

  // Format genres safely
  const displayGenres =
    Array.isArray(movie.genres) && movie.genres.length > 0
      ? movie.genres.join(", ")
      : "Genre N/A";

  return (
    <article
      tabIndex={0}
      className="bg-white rounded-lg shadow-md max-w-xs mx-auto cursor-pointer
                 focus:outline-none focus:ring-2 focus:ring-blue-500
                 hover:shadow-lg transition-shadow duration-200"
      aria-label={`Movie: ${movie.title || "Untitled"}`}
    >
      <img
        src={isValidImage ? imageSrc : "/fallback.jpg"}
        alt={movie.title || "Movie poster"}
        className="w-full h-64 object-cover rounded-t-lg"
        loading="lazy"
        onError={(e) => {
          e.target.src = "/fallback.jpg";
        }}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900 truncate">
          {movie.title || "Untitled"}
        </h2>
        <p className="text-yellow-500 mt-1">⭐ {displayRating}</p>
        <p className="text-gray-600 text-sm mt-2">{displayGenres}</p>
      </div>
    </article>
  );
};

export default WatchlistMovieCard;
