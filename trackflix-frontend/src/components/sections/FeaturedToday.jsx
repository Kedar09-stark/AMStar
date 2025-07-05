import React, { useState, useRef, useEffect, useCallback } from "react";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FlipCard from "../sectionExtra/FlipCard";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import useReducedMotionOrSmallScreen from "../../hooks/useReducedMotionOrSmallScreen";
import axios from "axios";
const ITEM_WIDTH = 200; // card width + gap is managed separately below
const GAP = 16;

const FeaturedToday = () => {
  const [flippedCard, setFlippedCard] = useState(null);
  const [featuredItems, setFeaturedItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  const auth = getAuth();
  const shouldReduceMotion = useReducedMotionOrSmallScreen();

  // Listen for auth state changes once
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return unsubscribe;
  }, [auth]);

  // Fetch featured items on mount
 useEffect(() => {
  const fetchFeaturedItems = async () => {
    try {
      const response = await axios.get("https://fourloopers-9.onrender.com/api/featureditems");
      setFeaturedItems(response.data);
    } catch (error) {
      console.error("Failed to fetch featured items:", error);
    }
  };
  fetchFeaturedItems();
}, []);

  const handleFlip = useCallback(
    (id) => {
      setFlippedCard((prev) => (prev === id ? null : id));
    },
    [setFlippedCard]
  );

  const handleAddToWatchlist = useCallback(
    async (movie) => {
      if (!auth.currentUser) {
        navigate("/login");
        return;
      }
      try {
        await addDoc(collection(db, "watchlists"), {
          userEmail: auth.currentUser.email,
          movie,
        });
        alert("Added to watchlist!");
      } catch (error) {
        console.error("Error adding to watchlist:", error);
      }
    },
    [auth.currentUser, navigate]
  );

  const scrollByOffset = useCallback((offset) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  }, []);

  const scrollLeft = useCallback(() => scrollByOffset(-(ITEM_WIDTH + GAP)), [scrollByOffset]);
  const scrollRight = useCallback(() => scrollByOffset(ITEM_WIDTH + GAP), [scrollByOffset]);

  // Touch/swipe handling for slider
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    const onTouchStart = (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    };

    const onTouchMove = (e) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
    };

    const onTouchEnd = () => {
      if (!isDragging) return;
      const diff = startX - currentX;
      if (diff > 30) scrollRight();
      else if (diff < -30) scrollLeft();
      isDragging = false;
    };

    slider.addEventListener("touchstart", onTouchStart, { passive: true });
    slider.addEventListener("touchmove", onTouchMove, { passive: true });
    slider.addEventListener("touchend", onTouchEnd);

    return () => {
      slider.removeEventListener("touchstart", onTouchStart);
      slider.removeEventListener("touchmove", onTouchMove);
      slider.removeEventListener("touchend", onTouchEnd);
    };
  }, [scrollLeft, scrollRight]);

  return (
    <motion.section
      className="bg-zinc-900 text-white px-4 py-4"
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
      animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      aria-label="Featured Today section"
    >
      <div className="max-w-7xl mx-auto">
        <header className="mb-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-yellow-400" tabIndex={0}>
            🌟 Featured Today
          </h2>
          <p className="mt-2 text-gray-300 text-sm sm:text-base" tabIndex={0}>
            Blockbuster picks for you
          </p>
        </header>

        <div className="relative">
          <button
            aria-label="Scroll Left"
            onClick={scrollLeft}
            className="absolute left-1 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-80 text-yellow-400 rounded-full p-2 z-10 focus:outline-yellow-300 focus:ring-2"
          >
            <FaChevronLeft size={20} />
          </button>

          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide px-10"
            style={{ scrollPaddingLeft: "40px", scrollPaddingRight: "40px" }}
            role="list"
            tabIndex={0}
            aria-label="Featured items carousel"
          >
            {featuredItems.map((item) => (
              <div key={item.id} className="snap-center" role="listitem">
                <FlipCard
                  item={item}
                  isFlipped={flippedCard === item.id}
                  onFlip={handleFlip}
                  isLoggedIn={isLoggedIn}
                  onAddToWatchlist={handleAddToWatchlist}
                />
              </div>
            ))}
          </div>

          <button
            aria-label="Scroll Right"
            onClick={scrollRight}
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-80 text-yellow-400 rounded-full p-2 z-10 focus:outline-yellow-300 focus:ring-2"
          >
            <FaChevronRight size={20} />
          </button>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/recommendations")}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-5 py-2 rounded-full text-sm font-medium flex items-center justify-center gap-2 transition duration-300 focus:outline-yellow-300 focus:ring-2"
          >
            Get More <FaArrowRight />
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturedToday;
