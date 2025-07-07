import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";

import Top10Card from "../Top10TrackflixExtra/Top10Card";
import TrailerModal from "../Top10TrackflixExtra/TrailerModal";

const Top10Trackflix = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const auth = getAuth();

  const [top10, setTop10] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);
  const [currentTrailerUrl, setCurrentTrailerUrl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const fetchTop10Movies = async () => {
      try {
        const { data } = await axios.get(
          "https://fourloopers-9.onrender.com/api/toptenmovies"
        );
        setTop10(data);
      } catch (err) {
        console.error("Failed to fetch top10:", err);
      }
    };

    fetchTop10Movies();
  }, []);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.offsetWidth * 0.9;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const openTrailer = (url) => {
    if (!url) return;
    const embedUrl = url.replace("watch?v=", "embed/");
    setCurrentTrailerUrl(embedUrl + "?autoplay=1&controls=1&modestbranding=1");
    setShowTrailer(true);
  };

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
      const response = await axios.post(
        "https://fourloopers-9.onrender.com/api/watchlist/add",
        {
          userId: user.uid,
          userEmail: user.email,
          movie: movieData,
        }
      );

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

  return (
    <section
      aria-labelledby="top10-title"
      className="bg-gradient-to-b from-zinc-900 to-black text-white px-2 sm:px-6 py-6 sm:py-14 overflow-x-hidden"
      style={{ overflowX: "hidden" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <header className="text-center mb-6 sm:mb-10 px-2">
          <h2
            id="top10-title"
            className="text-xl sm:text-3xl font-extrabold text-yellow-400 whitespace-normal max-w-full mx-auto"
          >
            🎬 Top 10 on Trackflix This Week
          </h2>
          <p className="mt-1 text-gray-400 text-xs sm:text-base max-w-full sm:max-w-xl mx-auto">
            The hottest shows and movies everyone's watching
          </p>
        </header>

        {/* Mobile Horizontal Scroll */}
       <div className="sm:hidden relative">
  {/* Mobile horizontal scroll container */}
<div
  ref={scrollRef}
  className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-2 py-2"
  style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
>
  {top10.map((item) => (
    <div
      key={item.id}
      className="flex-none w-[38vw] min-w-[160px] max-w-[220px] relative rounded-xl overflow-hidden bg-zinc-800 hover:shadow-xl transition-shadow duration-300 snap-start flex flex-col"
      style={{ minHeight: "300px" }}  // height reduced as before
    >
      {/* Image container with smaller fixed height */}
      <div className="w-full h-36 overflow-hidden rounded-t-xl">
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info section */}
      <div className="p-2 flex flex-col flex-grow text-white">
        <h3 className="font-semibold text-lg truncate">{item.title}</h3>
        <p className="text-sm text-gray-400 mt-1 truncate">
          {item.year || "N/A"} • {item.genres?.join(", ")}
        </p>
        <p className="text-yellow-400 font-bold mt-2 text-base flex items-center gap-1">
          <span>⭐</span> {item.rating || "N/A"}
        </p>

        <div className="mt-auto flex gap-3">
          <button
            onClick={() => openTrailer(item.trailer)}
            className="flex-grow bg-yellow-500 text-black font-semibold py-1 rounded hover:bg-yellow-600 transition"
          >
            Trailer
          </button>
          <button
            onClick={(e) => handleWatchlistClick(e, item)}
            className="flex-grow bg-zinc-700 text-white font-semibold py-1 rounded hover:bg-zinc-600 transition"
          >
            Watchlist
          </button>
        </div>
      </div>

      {/* Rank badge */}
      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
        #{item.rank}
      </div>
    </div>
  ))}
</div>

</div>


        {/* Desktop Grid */}
        <div className="hidden sm:grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {top10.map((item) => (
            <Top10Card
              key={item.id}
              item={item}
              onTrailerOpen={openTrailer}
              onWatchlistAdd={handleWatchlistClick}
            />
          ))}
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <TrailerModal
          url={currentTrailerUrl}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </section>
  );
};

export default Top10Trackflix;
