import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  logoVariant,
  textContainer,
  textItem,
  formVariant,
} from "../../animations/heroAnimations";

// ✅ Custom hook to detect reduced motion or small screen
function useReducedMotionOrSmallScreen() {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce), (max-width: 640px)"
    );
    const handler = () => setShouldReduceMotion(mediaQuery.matches);

    handler(); // Initial check
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return shouldReduceMotion;
}

const HeroSearch = () => {
  const reduceMotion = useReducedMotionOrSmallScreen();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // ✅ Parallax effect using Framer Motion hooks
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = searchTerm.trim();
    if (query !== "") {
      navigate(`/movies?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <motion.section
      className="relative overflow-hidden flex items-center justify-center text-white text-center px-4 py-12 sm:py-16 md:py-20 lg:py-24 min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] xl:min-h-screen"
    >
      {/* Background Image with Parallax Effect */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/images/he4.jpg')",
          y: y,
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/90 z-10" />

      {/* Blur Overlay */}
      <div className="absolute inset-0 backdrop-blur-sm z-20" />

      {/* Main Content */}
      <motion.div
        className="relative z-30 w-full max-w-4xl"
        initial="hidden"
        animate="visible"
        variants={textContainer}
      >
        {/* Logo */}
        <motion.img
          src="/images/lo-removebg-preview2.png"
          alt="TrackFlix Logo"
          className="w-[200px] sm:w-[260px] md:w-[320px] lg:w-[400px] xl:w-[460px] object-contain mx-auto drop-shadow-lg mb-1"
          variants={logoVariant}
          animate={
            reduceMotion
              ? { opacity: 1, y: 0 }
              : {
                  y: [0, -10, 0],
                  opacity: [0.9, 1, 0.9],
                }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 3, repeat: Infinity },
                }
          }
        />

        {/* Hero Text */}
        <motion.div className="space-y-4">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight -mt-3"
            variants={textItem}
          >
            Keep your movie diary.
          </motion.h1>

          <motion.h2
            className="text-xl sm:text-2xl md:text-3xl font-semibold leading-snug"
            variants={textItem}
          >
            Craft your watchlist.
          </motion.h2>

          <motion.h3
            className="text-lg sm:text-xl md:text-2xl text-gray-200"
            variants={textItem}
          >
            Be the critic your friends trust.
          </motion.h3>
        </motion.div>

        {/* Search Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 px-2 mt-6 w-full max-w-2xl mx-auto"
          variants={formVariant}
        >
          <motion.input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search a movie"
            className="px-4 py-3 rounded-md text-black w-full sm:w-72 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
            whileFocus={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <motion.button
            type="submit"
            className="px-6 py-3 bg-red-600 hover:bg-red-700 transition-all rounded-md font-semibold shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Search
          </motion.button>
        </motion.form>
      </motion.div>
    </motion.section>
  );
};

export default HeroSearch;
