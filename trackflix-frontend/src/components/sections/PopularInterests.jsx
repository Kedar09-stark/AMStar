import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 5;

const PopularInterests = ({ isLoggedIn }) => {
  const [interests, setInterests] = useState([]);
  const [page, setPage] = useState(0);
  const [showTrailer, setShowTrailer] = useState(false);
  const [currentTrailerUrl, setCurrentTrailerUrl] = useState(null);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/interest")
      .then((res) => res.json())
      .then((data) => setInterests(data))
      .catch((err) => console.error("Error fetching interests:", err));
  }, []);

  const totalPages = Math.ceil(interests.length / ITEMS_PER_PAGE);
  const startIndex = page * ITEMS_PER_PAGE;
  const currentItems = interests.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const nextPage = () => {
    setPage((p) => (p + 1) % totalPages);
  };

  const prevPage = () => {
    setPage((p) => (p - 1 + totalPages) % totalPages);
  };

  const openTrailer = (url) => {
    if (!url) return;
    const embedUrl = url.replace("watch?v=", "embed/");
    setCurrentTrailerUrl(embedUrl + "?autoplay=1&controls=1&modestbranding=1");
    setShowTrailer(true);
  };

  const handleWatchlistClick = (e, title) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      alert(`Added "${title}" to your watchlist!`);
    }
  };

  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape" && showTrailer) {
        setShowTrailer(false);
      }
    };
    window.addEventListener("keydown", onEsc);
    if (showTrailer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      window.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "auto";
    };
  }, [showTrailer]);

  return (
    <section className="bg-gradient-to-br from-black-150 to-black-800 text-cyan-400 px-6 py-12 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-10 text-center">
        <h2 className="text-5xl font-bold tracking-wide drop-shadow-lg text-purple-600 animate-pulse">Upcoming...</h2>



          <p className="mt-3 text-cyan-300 text-lg max-w-xl mx-auto">
            Discover trending favorites with rich details and smooth experience.
          </p>
        </header>

        {/* MOBILE: Horizontal slider */}
        <div className="sm:hidden overflow-x-auto scrollbar-hide -mx-6 px-6">
          <div className="flex gap-4">
            {currentItems.map((item) => (
              <div
                key={item.id}
                className="flex-none w-[70vw] max-w-xs relative group bg-black rounded-lg overflow-hidden shadow-xl border border-gray-700 cursor-pointer transition-transform duration-300 hover:scale-105"
              >
                <div className="w-full h-[330px] overflow-hidden rounded">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover object-top transition-all duration-300 ease-in-out group-hover:brightness-75 group-hover:scale-105"
                    onError={(e) => (e.target.src = "/fallback.jpg")}
                  />
                </div>

                <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center p-4 text-center space-y-2">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-yellow-400 font-medium text-sm">⭐ {item.rating}</p>
                  <p className="italic text-xs text-cyan-200">{item.genres.join(", ")}</p>
                  <div className="flex flex-col gap-2 w-full max-w-[180px] mt-3">
                    <button
                      onClick={() => openTrailer(item.trailerLink)}
                      className="inline-flex justify-center items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-black rounded-md py-1.5 font-semibold text-sm transition"
                      aria-label={`Watch trailer for ${item.title}`}
                    >
                      <FaPlay /> Watch Trailer
                    </button>
                    <button
                      type="button"
                      className="bg-transparent border border-cyan-400 hover:bg-cyan-400 hover:text-black rounded-md py-1.5 font-semibold text-sm transition"
                      onClick={(e) => handleWatchlistClick(e, item.title)}
                    >
                      Add to Watchlist
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP: Grid */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8 justify-items-center">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="relative group bg-black rounded-lg overflow-hidden shadow-xl border border-gray-700 cursor-pointer transition duration-300 hover:scale-105 max-w-[220px] w-full"
            >
              <div className="w-full h-[330px] overflow-hidden rounded">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover object-top transition-all duration-300 ease-in-out group-hover:brightness-75 group-hover:scale-105"
                  onError={(e) => (e.target.src = "/fallback.jpg")}
                />
              </div>

              <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center p-4 text-center space-y-2">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-yellow-400 font-medium text-sm">⭐ {item.rating}</p>
                <p className="italic text-xs text-cyan-200">{item.genres.join(", ")}</p>
                <div className="flex flex-col gap-2 w-full max-w-[180px] mt-3">
                  <button
                    onClick={() => openTrailer(item.trailerLink)}
                    className="inline-flex justify-center items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-black rounded-md py-1.5 font-semibold text-sm transition"
                    aria-label={`Watch trailer for ${item.title}`}
                  >
                    <FaPlay /> Watch Trailer
                  </button>
                  <button
                    type="button"
                    className="bg-transparent border border-cyan-400 hover:bg-cyan-400 hover:text-black rounded-md py-1.5 font-semibold text-sm transition"
                    onClick={(e) => handleWatchlistClick(e, item.title)}
                  >
                    Add to Watchlist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-6 mt-12">
          <button
            onClick={prevPage}
            className="px-5 py-2 border border-cyan-400 text-cyan-400 rounded-md hover:bg-cyan-400 hover:text-black transition"
          >
            Previous
          </button>
          <span className="text-cyan-300 font-semibold">
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            className="px-5 py-2 border border-cyan-400 text-cyan-400 rounded-md hover:bg-cyan-400 hover:text-black transition"
          >
            Next
          </button>
        </div>

        
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm p-6 animate-fadeIn"
          onClick={() => setShowTrailer(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="trailer-title"
        >
          <div
            className="relative w-full max-w-5xl aspect-video bg-black rounded-xl shadow-2xl overflow-hidden outline-none"
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
            ref={modalRef}
          >
            {/* Close button */}
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-3 right-3 text-white bg-cyan-800 bg-opacity-70 rounded-full p-2 hover:bg-red-600 transition-colors z-10"
              aria-label="Close trailer"
            >
              ×
            </button>

            {/* Trailer iframe */}
            <iframe
              className="w-full h-full"
              src={currentTrailerUrl}
              title="Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              frameBorder="0"
            />
          </div>
        </div>
      )}

      {/* Animation Keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
      `}</style>
    </section>
  );
};

export default PopularInterests;
