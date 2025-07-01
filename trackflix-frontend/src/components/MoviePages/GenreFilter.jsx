// src/components/MoviePages/GenreFilter.jsx
import React from "react";

const GenreFilter = ({ allGenres, selectedGenres, toggleGenre, clearFilters }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">Filter by Genre:</h2>
        {selectedGenres.length > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-400 hover:underline"
            aria-label="Clear all genre filters"
          >
            Clear Filters
          </button>
        )}
      </div>

      <div
        className="flex flex-wrap gap-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900"
        aria-label="Genre filter options"
      >
        {allGenres.map((genre) => {
          const isSelected = selectedGenres.includes(genre);

          return (
            <button
              key={genre}
              type="button"
              onClick={() => toggleGenre(genre)}
              className={`px-3 py-1 text-sm rounded-full cursor-pointer transition
                ${
                  isSelected
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
                }
              `}
              aria-pressed={isSelected}
            >
              {genre}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GenreFilter;
