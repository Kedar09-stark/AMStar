import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

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
    <motion.article
      tabIndex={0}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, rotate: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      viewport={{ once: true }}
      className="
        flex flex-col justify-between
        bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group 
        w-full 
        max-w-[100px] sm:max-w-[160px] md:max-w-[200px] lg:max-w-[250px] 
        mx-auto
      "
      aria-label={`Movie: ${movie.title || "Untitled"}`}
    >
      <div className="relative w-full aspect-[2/3] overflow-hidden rounded-t-2xl shadow-lg">
        <motion.img
          src={isValidImage ? imageSrc : "/fallback.jpg"}
          alt={movie.title || "Movie poster"}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            if (e.target.src !== "/fallback.jpg") {
              e.target.src = "/fallback.jpg";
            }
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
        <motion.div
          className="
            absolute top-2 left-2
            bg-gradient-to-br from-yellow-400 to-yellow-500
            text-black font-semibold text-xs sm:text-sm
            px-2 sm:px-3 py-0.5 sm:py-1 rounded-full
            shadow-lg
            flex items-center
            select-none
            drop-shadow-md
            ring-1 ring-yellow-600
          "
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          ⭐ {userRating.toFixed(1)}
        </motion.div>
      </div>

      <motion.div
        className="p-2 sm:p-3 md:p-5 bg-yellow-50 rounded-b-2xl shadow-md border border-yellow-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <motion.h2
          className="text-sm sm:text-base md:text-lg font-bold text-yellow-700 line-clamp-1 tracking-tight"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
        >
          {movie.title || "Untitled"}
        </motion.h2>

        <motion.p
          className="text-xs sm:text-sm text-yellow-600 mt-1 line-clamp-2"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          {Array.isArray(movie.genres) && movie.genres.length > 0
            ? movie.genres.join(", ")
            : "Genre N/A"}
        </motion.p>

        <motion.div
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <label
            htmlFor={`rating-${movieId}`}
            className="block mb-1 text-xs sm:text-sm font-semibold text-yellow-800"
          >
            My Ratings
          </label>

          <select
            id={`rating-${movieId}`}
            value={userRating}
            onChange={handleRatingChange}
            className="
              w-full
              text-xs sm:text-sm
              rounded-md
              border-2
              border-yellow-500
              bg-black
              px-2 sm:px-3 py-1.5 sm:py-2
              shadow-sm
              focus:outline-none
              focus:ring-4
              focus:ring-yellow-300
              focus:border-yellow-600
              transition
              duration-300
              hover:bg-yellow-300
              cursor-pointer
              text-white
            "
          >
            <option value={0}>No rating</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </motion.div>
      </motion.div>
    </motion.article>
  );
};

export default RatingMovieCard;
