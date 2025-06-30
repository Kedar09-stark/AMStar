import React, { useState, useRef, useEffect } from "react";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FlipCard from "../sectionExtra/FlipCard";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import useReducedMotionOrSmallScreen from "../../hooks/useReducedMotionOrSmallScreen";

const ITEM_WIDTH = 200; // smaller width for compact display
const GAP = 16;

const FeaturedToday = () => {
  const [flippedCard, setFlippedCard] = useState(null);
  const [featuredItems, setFeaturedItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  const auth = getAuth();
  const shouldReduceMotion = useReducedMotionOrSmallScreen();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    fetch("http://localhost:5000/api/featureditems")
      .then((res) => res.json())
      .then((data) => setFeaturedItems(data))
      .catch((err) => console.error("Failed to fetch featured items:", err));
  }, []);

  const handleFlip = (id) => {
    setFlippedCard((prev) => (prev === id ? null : id));
  };

  const handleAddToWatchlist = async (movie) => {
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
  };

  const scrollByOffset = (offset) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const scrollLeft = () => scrollByOffset(-(ITEM_WIDTH + GAP));
  const scrollRight = () => scrollByOffset(ITEM_WIDTH + GAP);

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

    slider.addEventListener("touchstart", onTouchStart);
    slider.addEventListener("touchmove", onTouchMove);
    slider.addEventListener("touchend", onTouchEnd);

    return () => {
      slider.removeEventListener("touchstart", onTouchStart);
      slider.removeEventListener("touchmove", onTouchMove);
      slider.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <motion.section
      className="bg-zinc-900 text-white px-4 py-4"
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
      animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto">
        <header className="mb-4 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-yellow-400">
            🌟 Featured Today
          </h2>
          <p className="mt-1 text-gray-400 text-xs sm:text-sm">
            Blockbuster picks for you
          </p>
        </header>

        <div className="relative">
          <button
            aria-label="Scroll Left"
            onClick={scrollLeft}
            className="absolute left-1 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-80 text-yellow-400 rounded-full p-1 z-10"
          >
            <FaChevronLeft size={16} />
          </button>

     <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide px-10"
            style={{ scrollPaddingLeft: "40px", scrollPaddingRight: "40px" }}
          >
            {featuredItems.map((item) => (
              <div key={item.id} className="snap-center">
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
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-80 text-yellow-400 rounded-full p-1 z-10"
          >
            <FaChevronRight size={16} />
          </button>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/recommendations")}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-1.5 rounded-full text-sm font-medium flex items-center justify-center gap-1 transition duration-300"
          >
            Get More <FaArrowRight />
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturedToday;
