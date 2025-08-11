import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaStar, FaPlay, FaPlus } from "react-icons/fa";
import { auth } from "../../firebase/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";

const MovieCard = ({ movie, onAddToWatchlist }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const getEmbedUrl = (url) => {
    try {
      const videoId = new URL(url).searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
    } catch {
      return "";
    }
  };

  const handleWatchlistClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (typeof onAddToWatchlist === "function") {
      onAddToWatchlist(movie);
    } else {
      alert("Added to watchlist!");
    }
  };

  const embedUrl = getEmbedUrl(movie.trailer || movie.trailerLink);
  const posterSrc = movie.img || movie.image || movie.poster || "/fallback.jpg";

  return (
    <>
      {/* -------- Desktop Card -------- */}
      <div className="hidden md:block w-full">
        <div className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-[1.03] group min-h-[580px] flex flex-col">
          <div className="relative w-full h-[350px] bg-zinc-800 overflow-hidden">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent animate-spin rounded-full"></div>
              </div>
            )}
            <img
              src={posterSrc}
              alt={movie.title || "Movie"}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                e.target.src = "/fallback.jpg";
                setImageLoaded(true);
              }}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              } group-hover:scale-105`}
            />
          </div>

          <div className="p-4 space-y-3 flex-grow flex flex-col">
            <Link
              to={`/movies/${movie.id}`}
              className="text-lg font-semibold text-white truncate block hover:underline"
            >
              {movie.title || "Untitled"}
            </Link>

            <div className="flex items-center gap-2 text-yellow-400 text-sm">
              <FaStar className="text-base" />
              <span className="font-medium">
                {movie.rating ? movie.rating.toFixed(1) : "N/A"}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {movie.genres?.slice(0, 3).map((genre, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-zinc-800 px-3 py-1 rounded-full text-white"
                >
                  {genre}
                </span>
              ))}
            </div>

            <p className="text-sm text-zinc-400">
              Release: <span className="text-white">{movie.releaseDate || "Unknown"}</span>
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-zinc-800 mt-auto">
              {embedUrl ? (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="flex items-center gap-2 text-blue-400 hover:underline text-sm"
                >
                  <FaPlay className="text-sm" />
                  Trailer
                </button>
              ) : (
                <span className="text-gray-500 text-sm">No trailer</span>
              )}

              <button
                onClick={handleWatchlistClick}
                className="flex items-center gap-2 text-green-400 hover:underline text-sm"
              >
                <FaPlus className="text-sm" />
                Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* -------- Mobile Card -------- */}
      <div className="block md:hidden w-full px-1">
        <div className="bg-zinc-900 rounded-lg overflow-hidden shadow-md group flex flex-col min-h-[260px]">
          <div className="w-full h-[120px] bg-zinc-800 overflow-hidden relative rounded-t-lg">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-yellow-400 border-t-transparent animate-spin rounded-full"></div>
              </div>
            )}
          <img
  src={posterSrc}
  alt={movie.title || "Movie"}
  loading="lazy"
  onLoad={() => setImageLoaded(true)}
  onError={(e) => {
    e.target.src = "/fallback.jpg";
    setImageLoaded(true);
  }}
  className={`w-full h-full object-contain bg-black transition-opacity duration-500 ${
    imageLoaded ? "opacity-100" : "opacity-0"
  }`}
/>



          </div>

          <div className="p-2 flex flex-col flex-grow">
            <Link
              to={`/movies/${movie.id}`}
              className="text-xs font-semibold text-white truncate hover:underline"
              title={movie.title}
            >
              {movie.title || "Untitled"}
            </Link>

            <div className="flex items-center gap-1 text-yellow-400 text-[10px] mt-1">
              <FaStar className="text-xs" />
              <span>{movie.rating ? movie.rating.toFixed(1) : "N/A"}</span>
            </div>

            <div className="flex flex-wrap gap-1 mt-1">
              {movie.genres?.slice(0, 2).map((genre, idx) => (
                <span
                  key={idx}
                  className="text-[9px] bg-zinc-800 px-2 py-[2px] rounded-full text-white"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Release Date for Mobile */}
            <p className="text-[10px] text-zinc-400 mt-1">
              Release: <span className="text-white">{movie.releaseDate || "Unknown"}</span>
            </p>

            <div className="flex justify-between items-center border-t border-zinc-800 mt-auto pt-1">
              {embedUrl ? (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="text-[10px] text-blue-400 hover:underline flex items-center gap-[2px]"
                >
                  <FaPlay className="text-[10px]" />
                  Trailer
                </button>
              ) : (
                <span className="text-[10px] text-gray-500">No trailer</span>
              )}

              <button
                onClick={handleWatchlistClick}
                className="text-[10px] text-green-400 hover:underline flex items-center gap-[2px]"
              >
                <FaPlus className="text-[10px]" />
                Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Shared Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="relative w-[90%] md:w-[700px] bg-zinc-900 rounded-xl overflow-hidden shadow-lg">
            <div className="flex justify-end p-2">
              <button
                onClick={() => setShowTrailer(false)}
                className="text-white hover:text-red-400 text-xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="w-full aspect-video">
              <iframe
                className="w-full h-full"
                src={embedUrl}
                title={`${movie.title} Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;
