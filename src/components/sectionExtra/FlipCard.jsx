import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const FlipCard = ({ item, isFlipped, onFlip, isLoggedIn }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const auth = getAuth();

  const embedUrl = item.trailerLink
    ? item.trailerLink.replace("watch?v=", "embed/")
    : null;

  const handleWatchlistClick = async (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("User not authenticated.");
      navigate("/login");
      return;
    }

    const movieData = {
      id: item.id,
      title: item.title,
      img: item.img,
      rating: item.rating,
      genres: item.genres,
      trailerLink: item.trailerLink,
    };

    try {
      const response = await fetch("http://localhost:5000/api/watchlist/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.uid,
          userEmail: user.email,
          movie: movieData,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message || `"${item.title}" added to your watchlist!`);
        navigate("/dashboard");
      } else if (response.status === 409) {
        alert(`"${item.title}" is already in your watchlist!`);
      } else {
        alert("Failed to add to watchlist. Please try again.");
      }
    } catch (error) {
      console.error("Failed to add to watchlist:", error);
      alert("Failed to add to watchlist. Please try again.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onFlip(item.id);
    }
  };

  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape" && showTrailer) {
        setShowTrailer(false);
      }
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [showTrailer]);

  useEffect(() => {
    if (showTrailer && modalRef.current) {
      modalRef.current.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showTrailer]);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        aria-pressed={isFlipped}
        onClick={() => onFlip(item.id)}
        onKeyDown={handleKeyDown}
        className="w-64 h-96 relative cursor-pointer perspective flex-shrink-0"
        style={{ perspective: "1000px" }}
      >
        <div
          className="w-full h-full rounded-xl shadow-xl transition-transform duration-700 bg-zinc-900"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            position: "relative",
          }}
        >
          {/* Front Side */}
          <div
            className="absolute w-full h-full rounded-xl overflow-hidden border border-zinc-700"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => (e.target.src = "/fallback.jpg")}
            />
          </div>

          {/* Back Side */}
          <div
            className="absolute w-full h-full bg-zinc-900 text-white rounded-xl p-6 flex flex-col justify-between shadow-lg"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div>
              <h3 className="text-xl font-semibold mb-2 text-center leading-tight">
                {item.title}
              </h3>
              <p className="text-yellow-400 font-medium mb-1 text-center">
                ⭐ {item.rating}
              </p>
              <p className="text-gray-400 text-sm text-center mb-4">
                {item.genres.join(", ")}
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-auto">
              {embedUrl ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowTrailer(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label={`Watch trailer for ${item.title}`}
                >
                  <FaPlay className="text-base" />
                  Trailer
                </button>
              ) : (
                <span className="text-gray-600 italic text-sm">No trailer</span>
              )}

              <button
                onClick={handleWatchlistClick}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 transition-colors text-white text-sm font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
                aria-label={`Add ${item.title} to watchlist`}
              >
                <FaPlus className="text-base" />
                Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-md p-6 animate-fadeIn"
          onClick={() => setShowTrailer(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="trailer-title"
        >
          <div
            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden outline-none"
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
            ref={modalRef}
          >
            {/* Close button */}
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-4 right-4 text-white bg-zinc-800 bg-opacity-80 rounded-full p-3 hover:bg-red-600 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 z-10"
              aria-label="Close trailer"
            >
              ×
            </button>

            {/* Trailer iframe */}
            <iframe
              className="w-full h-full"
              src={embedUrl + "?autoplay=1&controls=1&modestbranding=1"}
              title={`${item.title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              frameBorder="0"
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
      `}</style>
    </>
  );
};

export default FlipCard;
