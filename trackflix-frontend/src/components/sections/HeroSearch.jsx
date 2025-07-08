import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  logoVariant,
  textContainer,
  textItem,
  formVariant,
} from "../../animations/heroAnimations";

// import MatrixLetter from "../sectionExtra/MatrixLetter";  // COMMENTED OUT

const heading = "Keep your movie diary.";

// Custom hook for reduced motion or small screen
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
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);

  // Clear input handler for UX
  const clearSearch = () => setSearchTerm("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = searchTerm.trim();
    if (query !== "") {
      navigate(`/movies?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <motion.section
      className="relative overflow-hidden flex flex-col items-center justify-center text-white text-center px-4 py-12 sm:py-16 md:py-20 lg:py-24 min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] xl:min-h-screen"
      aria-label="Hero search section"
    >
      {/* Background Image with Parallax Effect */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/images/he4.jpg')",
          y: y,
          willChange: "transform",
        }}
        aria-hidden="true"
        loading="lazy"
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/90 z-10"
        aria-hidden="true"
      />

      {/* Blur Overlay */}
      <div
        className="absolute inset-0 backdrop-blur-sm z-20"
        aria-hidden="true"
      />

      {/* Main Content */}
      <motion.div
        className="relative z-30 w-full max-w-4xl px-4"
        initial="hidden"
        animate="visible"
        variants={textContainer}
      >
        {/* Logo */}
        <motion.img
          src="/images/lo-removebg-preview2.png"
          alt="TrackFlix Logo"
          className="
            w-[200px]
            sm:w-[260px]
            md:w-[320px]
            lg:w-[400px]
            xl:w-[460px]
            object-contain
            mx-auto
            drop-shadow-lg
            cursor-pointer
            hover:scale-105
            transition-transform
            duration-300
            mb-1
            mt-10
            sm:mt-0
          "
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
          aria-hidden="true"
        />

        {/* Hero Text */}
        <motion.div className="space-y-4" variants={textItem}>
          {/* Matrix Animated Heading */}
          {/* 
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight -mt-3 flex flex-wrap justify-center"
            aria-label={heading}
          >
            {heading.split("").map((char, i) => (
              <MatrixLetter key={i} targetChar={char} delay={i * 100} />
            ))}
          </motion.h1> 
          */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight -mt-3 flex flex-wrap justify-center"
            aria-label={heading}
          >
            {heading}
          </motion.h1>

          {/* Neon Glitch Subheading */}
        <motion.h2
  className="text-xl sm:text-2xl md:text-3xl font-semibold leading-snug neon-float"
  //style={{ color: "#1abc9c" }} // turquoise color
  style={{ color: "#e67e22" }} // orange
//style={{ color: "#9b59b6" }} // purple
//style={{ color: "#3498db" }} // bright blue
//style={{ color: "#e74c3c" }} // red
//style={{ color: "#f39c12" }} // amber/yellow
//style={{ color: "#2ecc71" }} // green

>
  Craft your watchlist.
</motion.h2>

          {/* Typewriter Subheading */}
          <motion.h3
            className="glitch-text text-lg sm:text-xl md:text-2xl font-bold text-white relative inline-block"
            aria-label="Be the critic your friends trust."
          >
            Be the critic your friends trust.
            <span aria-hidden="true" className="glitch-text__copy">
              Be the critic your friends trust.
            </span>
            <span aria-hidden="true" className="glitch-text__copy">
              Be the critic your friends trust.
            </span>
          </motion.h3>
        </motion.div>

        {/* Search Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 px-2 mt-6 w-full max-w-2xl mx-auto"
          variants={formVariant}
          role="search"
          aria-label="Movie search form"
        >
          <div className="relative w-full sm:w-72">
            <motion.input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search a movie"
              className="px-4 py-3 rounded-md text-black w-full shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
              whileFocus={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              aria-label="Search movies"
              autoComplete="off"
              spellCheck="false"
            />
            {/* Clear Button */}
            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-600 transition-colors"
              >
                &#10005;
              </button>
            )}
          </div>

          <motion.button
            type="submit"
            className="px-6 py-3 bg-red-600 hover:bg-red-700 transition-all rounded-md font-semibold shadow-md focus:ring-4 focus:ring-red-400 focus:outline-none"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            aria-label="Search"
          >
            Search
          </motion.button>
        </motion.form>
      </motion.div>
    </motion.section>
  );
};

export default HeroSearch;
