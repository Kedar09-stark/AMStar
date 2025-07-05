import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaStar, FaPlay, FaPlus } from "react-icons/fa";
import { auth } from "../../firebase/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";
const LiveCard = ({ movie }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  // Extract YouTube video ID from trailer URL
  const getEmbedUrl = (url) => {
    try {
      const videoId = new URL(url).searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
    } catch {
      return "";
    }
  };

  // Handle adding movie to watchlist via API
 const handleAddToWatchlist = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const movieData = {
      id: movie.id ? movie.id.toString() : null,
      title: movie.title || "Untitled",
      type: movie.type || "movie",
      image: movie.image || movie.img || movie.poster || "",
      rating: typeof movie.rating === "number" ? movie.rating : 0,
      genres: Array.isArray(movie.genres) ? movie.genres : [],
      releaseDate: movie.releaseDate ? movie.releaseDate.toString() : "",
      trailerLink: movie.trailerLink || movie.trailer || "",
    };

    try {
      const response = await axios.post("http://localhost:5000/api/watchlist/add", {
        userId: user.uid,
        userEmail: user.email,
        movie: movieData,
      });

      if (response.status === 201) {
        alert(response.data.message || `"${movie.title}" added to your watchlist!`);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        alert(`"${movie.title}" is already in your watchlist!`);
      } else {
        console.error("Failed to add to watchlist:", error);
        alert("Failed to add to watchlist. Please try again.");
      }
    }
  };

  const embedUrl = getEmbedUrl(movie.trailer || movie.trailerLink);

  return (
    <>
      <div className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-[1.03] group">
        {/* Poster Image */}
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
          {/* Title */}
          <Link
            to={`/liveD/${movie.id}`}
            className="text-lg font-semibold text-white truncate block hover:underline"
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
              onClick={handleAddToWatchlist}
              className="flex items-center gap-2 text-red-400 hover:underline text-sm"
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

export default LiveCard;
