import React from "react";
import { motion } from "framer-motion";

const WatchlistMovieCard = ({ movie }) => {
  const imageSrc = movie.image || movie.img || movie.poster || "/fallback.jpg";
  const isValidImage =
    typeof imageSrc === "string" &&
    (imageSrc.startsWith("http") || imageSrc.startsWith("data:image"));

  const displayRating =
    typeof movie.rating === "number" && !isNaN(movie.rating)
      ? movie.rating.toFixed(1)
      : "N/A";

  const displayGenres =
    Array.isArray(movie.genres) && movie.genres.length > 0
      ? movie.genres
      : [];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative overflow-hidden rounded-xl shadow-xl group w-full max-w-xs sm:max-w-sm md:max-w-xs bg-black text-white cursor-pointer transition-all duration-300"
    >
      {/* Poster Image */}
      <img
        src={isValidImage ? imageSrc : "/fallback.jpg"}
        alt={movie.title || "Movie Poster"}
        className="w-full h-64 sm:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
        onError={(e) => (e.target.src = "/fallback.jpg")}
        loading="lazy"
      />

      {/* Overlay or Always-Visible Info */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent p-3 sm:opacity-0 sm:group-hover:opacity-100 opacity-100 sm:transition-opacity sm:duration-300 flex flex-col justify-end">
        <h2 className="text-base sm:text-lg font-bold leading-tight line-clamp-2">
          {movie.title || "Untitled"}
        </h2>
        <p className="text-yellow-400 text-sm mt-1">⭐ {displayRating}</p>

        {/* Genres */}
        <div className="flex flex-wrap gap-1 mt-2">
          {displayGenres.length > 0 ? (
            displayGenres.slice(0, 3).map((genre, i) => (
              <span
                key={i}
                className="bg-white/10 text-white text-xs px-2 py-0.5 rounded-full"
              >
                {genre}
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-300 italic">Genre N/A</span>
          )}
        </div>
      </div>

      {/* Year Badge */}
      {movie.year && (
        <div className="absolute top-3 left-3 bg-white text-black text-xs font-bold px-2 py-1 rounded shadow">
          {movie.year}
        </div>
      )}
    </motion.div>
  );
};

export default WatchlistMovieCard;
