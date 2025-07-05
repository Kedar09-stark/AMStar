import React, { useRef, useState, useEffect } from "react";
import { FaPlus, FaPlay, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";

const Top10Trackflix = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const auth = getAuth();

  const [top10, setTop10] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);
  const [currentTrailerUrl, setCurrentTrailerUrl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const modalRef = useRef(null);

  // Track user login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, [auth]);

  // Fetch top 10 movies
    useEffect(() => {
    const fetchTop10Movies = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/toptenmovies");
        setTop10(data);
      } catch (err) {
        console.error("Failed to fetch top10:", err);
      }
    };

    fetchTop10Movies();
  }, []);
  // Scroll slider left or right
  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.offsetWidth;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Open trailer modal with embedded YouTube URL
  const openTrailer = (url) => {
    if (!url) return;
    const embedUrl = url.replace("watch?v=", "embed/");
    setCurrentTrailerUrl(embedUrl + "?autoplay=1&controls=1&modestbranding=1");
    setShowTrailer(true);
  };

  // Handle adding movie to watchlist with login check
const handleWatchlistClick = async (e, item) => {
  e.preventDefault();
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
    genres: item.genres || [],
    trailerLink: item.trailer || "",
  };

  try {
    const response = await axios.post("http://localhost:5000/api/watchlist/add", {
      userId: user.uid,
      userEmail: user.email,
      movie: movieData,
    });

    if (response.status === 201) {
      alert(response.data.message || `${item.title} added to your watchlist!`);
      navigate("/dashboard");
    } else {
      alert("Failed to add to watchlist. Please try again.");
    }
  } catch (error) {
    if (error.response?.status === 409) {
      alert(`${item.title} is already in your watchlist!`);
    } else {
      console.error("Failed to add to watchlist:", error);
      alert("Failed to add to watchlist. Please try again.");
    }
  }
};

  // Close trailer modal on Escape key and handle body scroll lock
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

  // Focus modal when it opens
  useEffect(() => {
    if (showTrailer && modalRef.current) {
      modalRef.current.focus();
    }
  }, [showTrailer]);

  return (
    <section
      aria-labelledby="top10-title"
      className="bg-gradient-to-b from-zinc-900 to-black text-white px-4 sm:px-6 py-10 sm:py-14"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <header className="text-center mb-8 sm:mb-10">
          <h2
            id="top10-title"
            className="text-2xl sm:text-4xl font-extrabold text-yellow-400"
          >
            🎬 Top 10 on Trackflix This Week
          </h2>
          <p className="mt-2 text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            The hottest shows and movies everyone's watching
          </p>
        </header>

        {/* Mobile Slider */}
        <div className="sm:hidden relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-zinc-800 bg-opacity-70 hover:bg-opacity-90 text-white rounded-full p-2 z-10"
            aria-label="Scroll left"
          >
            <FaChevronLeft />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide scroll-snap-x mandatory px-2"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {top10.map((item) => (
              <article
                key={item.id}
                className="flex-none w-[75vw] min-w-[160px] max-w-[240px] sm:w-[70%] relative rounded-xl overflow-hidden bg-zinc-800 hover:shadow-xl transition-shadow duration-300 flex flex-col scroll-snap-align-start"
              >
                <div className="aspect-[3/4] sm:aspect-[2/3] bg-black overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="object-cover w-full h-full"
                    onError={(e) => (e.target.src = "/fallback.jpg")}
                  />
                </div>

                <div className="p-3 flex flex-col flex-grow">
                  <h3
                    className="text-sm sm:text-base font-semibold text-white mb-1 truncate"
                    title={item.title}
                  >
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-gray-300 mb-2">
                    <time>{item.year}</time>
                    <span className="bg-yellow-400 text-black font-bold px-2 py-0.5 rounded">
                      ⭐ {item.rating}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-auto text-xs">
                    <button
                      onClick={() => openTrailer(item.trailer)}
                      className="flex-1 flex items-center justify-center gap-1 border border-white px-2 py-1 rounded hover:bg-white hover:text-black transition"
                      aria-label={`Watch trailer for ${item.title}`}
                    >
                      <FaPlay className="text-xs" />
                      Trailer
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleWatchlistClick(e, item)}
                      className="flex-1 flex items-center justify-center gap-1 border border-white px-2 py-1 rounded hover:bg-white hover:text-black transition"
                      aria-label={`Add ${item.title} to watchlist`}
                    >
                      <FaPlus className="text-xs" />
                      Watchlist
                    </button>
                  </div>
                </div>

                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                  #{item.rank}
                </div>
              </article>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-zinc-800 bg-opacity-70 hover:bg-opacity-90 text-white rounded-full p-2 z-10"
            aria-label="Scroll right"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Desktop Grid */}
        <div className="hidden sm:grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {top10.map((item) => (
            <article
              key={item.id}
              className="relative rounded-xl overflow-hidden bg-zinc-800 hover:shadow-2xl transition-shadow duration-300 flex flex-col"
            >
              <div className="w-full aspect-[2/3] bg-black overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="object-cover w-full h-full"
                  onError={(e) => (e.target.src = "/fallback.jpg")}
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3
                  className="text-lg font-semibold text-white mb-1 truncate"
                  title={item.title}
                >
                  {item.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-300 mb-3">
                  <time dateTime={item.year}>{item.year}</time>
                  <span className="bg-yellow-400 text-black font-bold px-2 py-0.5 rounded">
                    ⭐ {item.rating}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 mt-auto text-sm">
                  <button
                    onClick={() => openTrailer(item.trailer)}
                    className="flex items-center justify-center gap-2 border border-white px-3 py-1 rounded hover:bg-white hover:text-black transition"
                    aria-label={`Watch trailer for ${item.title}`}
                  >
                    <FaPlay className="text-xs" />
                    Trailer
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleWatchlistClick(e, item)}
                    className="flex items-center justify-center gap-2 border border-white px-3 py-1 rounded hover:bg-white hover:text-black transition"
                    aria-label={`Add ${item.title} to watchlist`}
                  >
                    <FaPlus className="text-xs" />
                    Watchlist
                  </button>
                </div>
              </div>
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                #{item.rank}
              </div>
            </article>
          ))}
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
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-3 right-3 text-white bg-zinc-800 bg-opacity-70 rounded-full p-2 hover:bg-red-600 transition-colors z-10"
              aria-label="Close trailer"
            >
              ×
            </button>

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

export default Top10Trackflix;
