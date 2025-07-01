// src/utils/formatMovieData.js
export const formatMovie = (movie) => ({
  id: movie.imdbID,
  title: movie.Title || "N/A",
  rating: parseFloat(movie.imdbRating) || 0,
  genres: movie.Genre?.split(", ").map((g) => g.trim()) || [],
  releaseDate: movie.Released || "N/A",
  trailer: `https://www.youtube.com/results?search_query=${encodeURIComponent(
    movie.Title + " trailer"
  )}`,
  image:
    movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/300x450?text=No+Image",
});
