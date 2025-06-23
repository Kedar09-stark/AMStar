import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../components/MoviePages/MovieCard";
import GenreFilter from "../components/MoviePages/GenreFilter";
import Pagination from "../components/MoviePages/Pagination";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Movie = () => {
  const query = useQuery();
  const initialQuery = query.get("query") || "";

  const [allMovies, setAllMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [sortType, setSortType] = useState("rating");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const itemsPerPage = 48;

  useEffect(() => {
    setSearchTerm(initialQuery);
    setCurrentPage(1);
  }, [initialQuery]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/fullmovies");
        if (!res.ok) throw new Error("Failed to fetch movies.");
        const data = await res.json();
        setAllMovies(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const allGenres = Array.from(
    new Set(allMovies.flatMap((movie) => movie.genres))
  );

  const filteredMovies = allMovies
    .filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((movie) =>
      selectedGenres.length === 0
        ? true
        : selectedGenres.every((genre) => movie.genres.includes(genre))
    );

  const sortedMovies = [...filteredMovies].sort((a, b) => {
    if (sortType === "rating") return b.rating - a.rating;
    if (sortType === "releaseDate")
      return new Date(b.releaseDate) - new Date(a.releaseDate);
    return 0;
  });

  const totalPages = Math.ceil(sortedMovies.length / itemsPerPage);
  const paginatedMovies = sortedMovies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setCurrentPage(1);
  };

  return (
    <section className="bg-black min-h-screen pt-28 px-4 md:px-10 text-white">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Filters Panel */}
        <aside className="w-full lg:w-1/4 space-y-6">
          <div>
            <label className="block mb-2 text-sm font-semibold">Search</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-zinc-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Find a movie..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">Sort by</label>
            <select
              className="w-full px-4 py-2 bg-zinc-900 text-white rounded-md"
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="rating">Rating</option>
              <option value="releaseDate">Release Date</option>
            </select>
          </div>

          <GenreFilter
            allGenres={allGenres}
            selectedGenres={selectedGenres}
            toggleGenre={toggleGenre}
            clearFilters={clearFilters}
          />
        </aside>

        {/* Movies Grid */}
        <main className="flex-1">
          {loading && <p className="text-gray-300">Loading movies...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && paginatedMovies.length === 0 && (
            <p className="text-gray-400">No matching movies found.</p>
          )}

          {!loading && !error && paginatedMovies.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {paginatedMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </>
          )}
        </main>
      </div>
    </section>
  );
};

export default Movie;
