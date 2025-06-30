import React, { useState } from "react";
import MovieCard from "./WatchlistMovieCard";

const OMDB_API_KEY = "be28d8e8";

const sampleGenres = [
  "Action", "Comedy", "Drama", "Thriller", "Romance",
  "Sci-Fi", "Horror", "Adventure", "Animation", "Crime",
];

function getRandomGenres() {
  const count = Math.floor(Math.random() * 3) + 1;
  const shuffled = [...sampleGenres].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const Recommendations = () => {
  const [query, setQuery] = useState("");
  const [searchBy, setSearchBy] = useState("title"); // title, genre, rating
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch movies by title only (always call API with a search term >= 3 chars)
  // For genre and rating, fetch generic results and filter client side

  const fetchMovies = async (searchTerm) => {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(searchTerm)}&type=movie`
    );
    const data = await res.json();
    return data;
  };

  const handleSearch = async () => {
    setError(null);
    setMovies([]);

    if (searchBy === "title") {
      if (query.trim().length < 3) {
        setError("Please enter at least 3 characters for title search.");
        return;
      }
      setLoading(true);
      try {
        const data = await fetchMovies(query.trim());
        if (data.Response === "True") {
          const moviesWithDetails = data.Search.map((movie) => ({
            id: movie.imdbID,
            title: movie.Title,
            image: movie.Poster !== "N/A" ? movie.Poster : null,
            genres: getRandomGenres(),
            rating: parseFloat((Math.random() * 4.9 + 5).toFixed(1)),
          }));
          setMovies(moviesWithDetails);
        } else if (data.Error === "Too many results.") {
          setError("Too many results. Please refine your search.");
        } else {
          setError(data.Error || "No movies found.");
        }
      } catch {
        setError("Failed to fetch movies.");
      } finally {
        setLoading(false);
      }
    } else {
      // For genre or rating searches: fetch generic term 'a' (or 'the', etc) to get enough results
      setLoading(true);
      try {
        const data = await fetchMovies("a");
        if (data.Response === "True") {
          let moviesWithDetails = data.Search.map((movie) => ({
            id: movie.imdbID,
            title: movie.Title,
            image: movie.Poster !== "N/A" ? movie.Poster : null,
            genres: getRandomGenres(),
            rating: parseFloat((Math.random() * 4.9 + 5).toFixed(1)),
          }));

          if (searchBy === "genre") {
            moviesWithDetails = moviesWithDetails.filter((m) =>
              m.genres.some((g) =>
                g.toLowerCase().includes(query.trim().toLowerCase())
              )
            );
            if (moviesWithDetails.length === 0) {
              setError("No movies found for that genre.");
            }
          } else if (searchBy === "rating") {
            const ratingQuery = parseFloat(query);
            if (isNaN(ratingQuery) || ratingQuery < 0 || ratingQuery > 10) {
              setError("Please enter a valid rating between 0 and 10.");
              moviesWithDetails = [];
            } else {
              moviesWithDetails = moviesWithDetails.filter(
                (m) => m.rating >= ratingQuery
              );
              if (moviesWithDetails.length === 0) {
                setError("No movies found with that rating or higher.");
              }
            }
          }
          setMovies(moviesWithDetails);
        } else {
          setError(data.Error || "No movies found.");
          setMovies([]);
        }
      } catch {
        setError("Failed to fetch movies.");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-800">
        Movie Recommendations & Search
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className="flex flex-col sm:flex-row items-center gap-4 mb-8"
        aria-label="Movie search form"
      >
        <label htmlFor="searchBy" className="sr-only">
          Search type
        </label>
        <select
          id="searchBy"
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="title">Title</option>
          <option value="genre">Genre</option>
          <option value="rating">Minimum Rating</option>
        </select>

        <label htmlFor="searchQuery" className="sr-only">
          Search query
        </label>
        <input
          id="searchQuery"
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setError(null);
          }}
          placeholder={
            searchBy === "rating"
              ? "e.g. 7.5"
              : searchBy === "genre"
              ? "e.g. Drama"
              : "Search movies by title..."
          }
          className="flex-grow border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Search input"
        />

        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2 rounded-md font-semibold text-white transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          aria-label="Search movies"
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 mx-auto text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 010 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
              ></path>
            </svg>
          ) : (
            "Search"
          )}
        </button>
      </form>

      {error && (
        <p className="text-red-600 text-center mb-6 font-medium" role="alert">
          {error}
        </p>
      )}

      {!loading && movies.length === 0 && !error && (
        <p className="text-center text-gray-600">No movies found.</p>
      )}

      <section
        aria-live="polite"
        aria-label="Search results"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>
    </div>
  );
};

export default Recommendations;
