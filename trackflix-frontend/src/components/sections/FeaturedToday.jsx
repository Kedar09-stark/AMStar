import React, { useState, useRef, useEffect } from "react";
import {
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import FlipCard from "../sectionExtra/FlipCard";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";



const ITEM_WIDTH = 256;
const GAP = 24;

const FeaturedToday = () => {
  const [flippedCard, setFlippedCard] = useState(null);
  const [featuredItems, setFeaturedItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    // Listen for auth state changes to update login status
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

  // Scroll handlers for arrows
  const scrollByOffset = (offset) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const scrollLeft = () => scrollByOffset(-(ITEM_WIDTH + GAP));
  const scrollRight = () => scrollByOffset(ITEM_WIDTH + GAP);

  // Touch swipe support
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
    <section className="bg-gradient-to-b from-zinc-900 to-black text-white px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-400">
            🌟 Featured Today
          </h2>
          <p className="mt-2 text-gray-300 text-sm md:text-base">
            Explore hand-picked blockbuster favorites
          </p>
        </header>

        <div className="relative">
          <button
            aria-label="Scroll Left"
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-80 text-yellow-400 rounded-full p-2 z-10"
          >
            <FaChevronLeft size={20} />
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
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-80 text-yellow-400 rounded-full p-2 z-10"
          >
            <FaChevronRight size={20} />
          </button>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/recommendations")}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-full font-medium flex items-center justify-center gap-2 transition duration-300"
          >
            Get More Recommendations <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedToday;
