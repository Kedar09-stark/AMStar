import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaStar, FaPlay, FaPlus } from "react-icons/fa";

import { auth } from "../../firebase/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";

const MovieCard = ({ movie }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const navigate = useNavigate();

  // Get current logged-in user from Firebase
  const [user] = useAuthState(auth);

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
      navigate("/login"); // redirect to login if not authenticated
    } else {
      // Add to watchlist logic here
      alert("Added to watchlist!");
    }
  };

  const embedUrl = getEmbedUrl(movie.trailer);

  return (
    <>
      <div className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-[1.03] group">
        {/* Poster */}
        <div className="relative w-full h-[350px] bg-zinc-800 overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent animate-spin rounded-full"></div>
            </div>
          )}
          <img
            src={movie.image}
            alt={movie.title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            } group-hover:scale-105`}
          />
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Movie title wrapped with Link for navigation */}
         <Link
  to={`/movies/${movie.id}`} // <-- "movies" (plural)
  className="text-lg font-semibold text-white truncate block hover:underline"
  title={`View details for ${movie.title}`}
>
  {movie.title}
</Link>


          {/* Rating */}
          <div className="relative group flex items-center gap-2 text-yellow-400 text-sm w-fit">
            <FaStar className="text-base" />
            <span className="font-medium">{movie.rating || "N/A"}</span>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            {movie.genres?.slice(0, 3).map((genre, idx) => (
              <span
                key={idx}
                className="text-xs bg-zinc-700 px-3 py-1 rounded-full text-white"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Release Date */}
          <p className="text-sm text-zinc-400">
            Release:{" "}
            <span className="text-white">{movie.releaseDate || "Unknown"}</span>
          </p>

          {/* Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-zinc-800 mt-4">
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

      {/* Trailer Modal */}
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
