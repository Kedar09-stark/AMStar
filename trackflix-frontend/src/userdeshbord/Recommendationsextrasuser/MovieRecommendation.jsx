import React from "react";
import MovieCard from "../WatchlistMovieCard";

const MovieRecommendation = ({
  movie,
  loading,
  error,
  onGetAnother,
  onReset,
}) => {
  return (
    <div className="text-center">
      {loading ? (
        <p className="text-blue-400 font-medium">Loading recommendation...</p>
      ) : error ? (
        <p className="text-red-400 font-medium" role="alert">
          {error}
        </p>
      ) : movie ? (
        <>
          <h3 className="text-2xl font-bold mb-2 text-green-400">
            Your Recommendation 🎉
          </h3>
          <MovieCard movie={movie} />
          <button
            onClick={onGetAnother}
            disabled={loading}
            className="mt-4 bg-green-500 text-gray-900 px-4 py-2 rounded hover:bg-green-600 font-semibold"
            type="button"
          >
            {loading ? "Loading..." : "🎲 Get Another Recommendation"}
          </button>
          <button
            onClick={onReset}
            className="block mt-2 text-yellow-400 text-sm underline"
            type="button"
          >
            Start Over
          </button>
        </>
      ) : (
        <>
          <h3 className="text-lg mb-3 font-semibold text-blue-300">
            Ready to recommend a movie based on your answers?
          </h3>
          <button
            onClick={onGetAnother}
            className="bg-green-500 text-gray-900 px-6 py-2 rounded hover:bg-green-600 font-semibold"
            type="button"
          >
            Check Results
          </button>
        </>
      )}
    </div>
  );
};

export default MovieRecommendation;
