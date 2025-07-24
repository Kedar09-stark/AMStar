import React, { useState, useEffect } from "react";
import MovieCard from "../WatchlistMovieCard";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "@uidotdev/usehooks";

const MovieRecommendation = ({ movie, loading, error, onGetAnother, onReset }) => {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (movie) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [movie]);

  return (
    <motion.div
      className="w-full max-w-[95vw] sm:max-w-3xl mx-auto text-center p-4 sm:p-10 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-lg relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {showConfetti && <Confetti width={width} height={height} />}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="h-12 w-12 sm:h-14 sm:w-14 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-yellow-300 text-base sm:text-lg font-medium tracking-wide">
            Finding the perfect match...
          </p>
        </div>
      ) : error ? (
        <p className="text-red-400 bg-red-900 bg-opacity-30 p-4 rounded-lg font-semibold shadow-md" role="alert">
          {error}
        </p>
      ) : movie ? (
        <>
          <motion.h3
            className="text-2xl sm:text-3xl font-extrabold mb-4 sm:mb-6 text-green-400 drop-shadow-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            🎉 Here's Your Movie!
          </motion.h3>

          <motion.div
            className="flex justify-center mb-6 px-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <MovieCard movie={movie} />
          </motion.div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-6">
            <button
              onClick={onGetAnother}
              className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-black font-semibold px-5 py-3 rounded-full shadow-md transition hover:scale-105"
            >
              🎲 Try Another Recommendation
            </button>

            <button
              onClick={onReset}
              className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-5 py-3 rounded-full shadow-md transition hover:scale-105"
            >
              🔁 Start Over
            </button>
          </div>
        </>
      ) : (
        <>
          <motion.h3
            className="text-xl sm:text-2xl font-semibold text-blue-300 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Ready to discover your movie?
          </motion.h3>
          <button
            onClick={onGetAnother}
            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full transition hover:scale-105 shadow-md"
          >
            🎬 Check Result
          </button>
        </>
      )}
    </motion.div>
  );
};

export default MovieRecommendation;
