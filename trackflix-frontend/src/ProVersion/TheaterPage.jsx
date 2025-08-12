import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import proMovies from "../data/moviest";
import { motion, AnimatePresence } from "framer-motion";

function TheaterPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [showProModal, setShowProModal] = useState(false);
  const movieListRef = useRef(null);

  useEffect(() => {
    if (proMovies.length > 0) setSelectedMovie(proMovies[0]);
  }, []);

  useEffect(() => {
    if (!loading && user && !user.pro) {
      setShowProModal(true);
    }
  }, [loading, user]);

  if (loading) return <LoadingSkeleton />;

  if (!user) {
    navigate("/login");
    return null;
  }

  if (!user.pro) {
    return <ProModal onClose={() => navigate("/subscription")} />;
  }

  const handleSelectMovie = (movie) => {
    setIframeLoading(true);
    setSelectedMovie(movie);
    if (movieListRef.current) {
      movieListRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-12 p-6 bg-gray-900 text-white rounded-lg shadow-xl min-h-screen flex flex-col">
      <h1 className="text-5xl font-extrabold mb-10 text-yellow-400 text-center bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg select-none">
        Welcome to the Trackflix Theater
      </h1>

      <div className="flex flex-col lg:flex-row gap-10 flex-grow">
        
        {/* Mobile Dropdown for Movie List */}
        <div className="lg:hidden mb-4">
          <details className="bg-yellow-900 rounded-lg">
            <summary className="cursor-pointer p-3 text-yellow-300 font-semibold flex justify-between items-center">
              Movie List
              <span className="text-yellow-400">▼</span>
            </summary>
            <div className="p-3 max-h-[300px] overflow-y-auto custom-scrollbar">
              {proMovies.map((movie) => {
                const isSelected = selectedMovie?.id === movie.id;
                return (
                  <div
                    key={movie.id}
                    onClick={() => handleSelectMovie(movie)}
                    className={`p-2 mb-2 rounded cursor-pointer transition ${
                      isSelected
                        ? "bg-yellow-800 border border-yellow-500"
                        : "hover:bg-yellow-700"
                    }`}
                  >
                    {movie.title}
                  </div>
                );
              })}
            </div>
          </details>
        </div>

        {/* Desktop Sidebar Movie List */}
        <aside
          ref={movieListRef}
          className="hidden lg:block flex-1 max-h-[80vh] overflow-y-auto pr-4 border-r border-yellow-600 custom-scrollbar"
          aria-label="Movie list"
        >
          {proMovies.map((movie) => {
            const isSelected = selectedMovie?.id === movie.id;
            return (
              <motion.div
                key={movie.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => handleSelectMovie(movie)}
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleSelectMovie(movie)}
                role="button"
                aria-pressed={isSelected}
                aria-label={`Select movie ${movie.title}`}
                className={`group flex items-center gap-4 p-4 mb-3 rounded-lg cursor-pointer border-2 transition-all
                  focus:outline-yellow-400 focus:outline-2 focus:outline-offset-2
                  ${
                    isSelected
                      ? "border-yellow-400 bg-yellow-900 scale-[1.03] shadow-xl"
                      : "border-transparent hover:border-yellow-500 hover:bg-yellow-800"
                  }
                `}
              >
                <div className="relative w-28 h-16 rounded-md overflow-hidden shadow-md flex-shrink-0 transform-gpu transition-transform duration-300 group-hover:scale-105 group-focus:scale-105">
                  <img
                    src={`https://img.youtube.com/vi/${getYouTubeID(movie.url)}/mqdefault.jpg`}
                    alt={`${movie.title} thumbnail`}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-80 group-focus:opacity-80 bg-black bg-opacity-60 transition-opacity duration-300">
                    <svg
                      className="w-10 h-10 text-yellow-400 animate-pulse"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                <div className="flex flex-col flex-grow overflow-hidden">
                  <h2 className="text-lg font-semibold text-yellow-300 truncate">
                    {movie.title}
                  </h2>
                  <p className="text-gray-400 text-sm truncate">
                    {movie.description || "No description available."}
                  </p>
                  {movie.rating && (
                    <div className="mt-1 flex items-center space-x-2 text-yellow-400 text-sm font-semibold">
                      <StarIcon /> <span>{movie.rating}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </aside>

        {/* Video Player */}
        <main className="flex-1 flex flex-col rounded-lg shadow-inner bg-black select-none">
          <div className="px-6 pt-6 pb-4 border-b border-yellow-600">
            <h2
              className="text-3xl font-semibold text-yellow-400"
              aria-live="polite"
              aria-atomic="true"
            >
              Now Playing: {selectedMovie?.title || "Select a movie"}
            </h2>
            {selectedMovie?.description && (
              <p className="mt-2 text-gray-300 italic max-w-lg">
                {selectedMovie.description}
              </p>
            )}
          </div>

          <div className="flex-grow relative p-6">
            <AnimatePresence mode="wait">
              {iframeLoading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 z-20 rounded-lg"
                >
                  <LoadingSpinner />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {selectedMovie ? (
                <motion.iframe
                  key={selectedMovie.id}
                  title={selectedMovie.title}
                  src={selectedMovie.url}
                  allowFullScreen
                  className="w-full h-[450px] sm:h-[600px] rounded-lg shadow-lg border-4 border-yellow-500"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  onLoad={() => setIframeLoading(false)}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                />
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center h-[450px] sm:h-[600px] text-gray-400 italic"
                >
                  Select a movie to start watching
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Custom Scrollbar CSS */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #f59e0b;
          border-radius: 10px;
          border: 2px solid transparent;
          background-clip: content-box;
          transition: background-color 0.3s;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #d97706;
        }
      `}</style>
    </div>
  );
}

function ProModal({ onClose }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pro-modal-title"
    >
      <motion.div
        className="bg-yellow-900 rounded-lg p-8 max-w-sm w-full text-center shadow-lg"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <h2
          id="pro-modal-title"
          className="text-2xl font-bold text-yellow-300 mb-4"
        >
          Pro Subscription Required
        </h2>
        <p className="text-yellow-100 mb-6">
          You must be a Pro subscriber to access the theater.
        </p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 rounded text-black font-semibold transition"
        >
          Go to Subscription
        </button>
      </motion.div>
    </motion.div>
  );
}

function getYouTubeID(url) {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

function LoadingSpinner() {
  return (
    <svg
      className="animate-spin h-12 w-12 text-yellow-400"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      role="img"
      aria-label="Loading spinner"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8z"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      className="w-4 h-4 fill-current"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M10 15l-5.878 3.09 1.123-6.545L.488 7.91l6.566-.955L10 2l2.946 4.955 6.566.955-4.757 4.635 1.123 6.545z" />
    </svg>
  );
}

function LoadingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto mt-12 p-6 flex flex-col gap-4 animate-pulse">
      <div className="h-12 bg-yellow-400 rounded w-3/4 mx-auto" />
      <div className="flex gap-4 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex-1 space-y-3">
            <div className="h-16 bg-yellow-700 rounded" />
            <div className="h-6 bg-yellow-700 rounded w-3/4" />
            <div className="h-4 bg-yellow-700 rounded w-1/2" />
          </div>
        ))}
      </div>
      <div className="h-[450px] bg-yellow-700 rounded" />
    </div>
  );
}

export default TheaterPage;
