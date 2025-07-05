import React, { useEffect, useState, useCallback } from "react";
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import * as FaIcons from "react-icons/fa";
import { genres } from "../../data/footernewtomovies";

// Icon color mappings
const ICON_COLOR_CLASSES = {
  FaHeart: "text-pink-400",
  FaLaughBeam: "text-yellow-300",
  FaRobot: "text-blue-400",
  FaBomb: "text-red-500",
  FaGhost: "text-white-900",
  FaMagic: "text-purple-500",
  FaBook: "text-green-400",
  FaGlobe: "text-teal-400",
  FaDragon: "text-orange-400",
  FaTheaterMasks: "text-indigo-500",
};
// Motion variants
const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.3, duration: 0.9, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -30, transition: { duration: 0.5 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 130, damping: 15 },
  },
  hover: {
    scale: 1.1,
    color: "#ff79c6",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9, rotateX: 15 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 14,
      repeat: Infinity,
      repeatType: "reverse",
      duration: 3.5,
    },
  },
  hover: {
    scale: 1.4,
    rotate: 20,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

// Parallax Background Component
const ParallaxBackground = ({ imageUrl, scrollY }) => {
  const y = useTransform(scrollY, [0, 800], [0, -100]);
  return (
    <motion.div
      style={{
        y,
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.75)), url(${imageUrl})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="absolute inset-0 z-0"
    />
  );
};

const NewToMovies = () => {
  const scrollY = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  return (
    <div
      className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-gray-100"
      aria-label="Movie genres scroll sections"
    >
      {genres.map((genre) => (
        <AnimatedGenreSection key={genre.title} genre={genre} scrollY={scrollY} />
      ))}
    </div>
  );
};

const AnimatedGenreSection = ({ genre, scrollY }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });
  const [bgLoaded, setBgLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * -20,
    });
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
      setBgLoaded(true);
    } else {
      controls.start("exit");
    }
  }, [controls, inView]);

  const IconComponent = FaIcons[genre.iconName];
  const titleId = `${genre.title.toLowerCase().replace(/\s+/g, "-")}-title`;

  return (
    <motion.section
      ref={ref}
      className="snap-start relative w-screen h-screen flex flex-col items-center justify-center px-6 sm:px-12 md:px-20 lg:px-32 text-center overflow-hidden perspective-1000"
      aria-labelledby={titleId}
      initial="hidden"
      animate={controls}
      exit="exit"
      variants={containerVariants}
    >
      {bgLoaded && <ParallaxBackground imageUrl={genre.bgImage} scrollY={scrollY} />}

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70 z-0 pointer-events-none"></div>

      <motion.div
        aria-hidden="true"
        variants={iconVariants}
        whileHover="hover"
        whileTap="hover"
        style={{
          rotateX: mousePos.y,
          rotateY: mousePos.x,
          transformStyle: "preserve-3d",
          cursor: "pointer",
        }}
        className={`relative z-10 mb-8 ${
          ICON_COLOR_CLASSES[genre.iconName] ?? "text-white"
        } text-8xl sm:text-9xl md:text-[10rem] drop-shadow-xl select-none`}
        onMouseMove={onMouseMove}
        onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      >
        {IconComponent && <IconComponent />}
      </motion.div>

      <motion.h2
        id={titleId}
        variants={titleVariants}
        className="relative z-10 font-extrabold tracking-wide leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl select-text cursor-default"
        style={{
          letterSpacing: "0.1em",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          backgroundImage:
            "linear-gradient(270deg, #ff79c6, #bd93f9, #8be9fd, #ff79c6)",
          backgroundSize: "600% 600%",
          animation: "gradientShift 12s ease infinite",
          perspective: 1000,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ rotateX: 15, rotateY: 10 }}
      >
        {genre.title}
        <motion.svg
          viewBox="0 0 200 10"
          className="block mx-auto mt-4"
          height="10"
          width="200"
        >
          <motion.line
            x1="0"
            y1="5"
            x2="200"
            y2="5"
            stroke="url(#gradient)"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient
              id="gradient"
              gradientTransform="rotate(90)"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop offset="0%" stopColor="#ff79c6" />
              <stop offset="50%" stopColor="#bd93f9" />
              <stop offset="100%" stopColor="#8be9fd" />
            </linearGradient>
          </defs>
        </motion.svg>
      </motion.h2>

      <motion.ul className="relative z-10 mt-10 max-w-xl mx-auto text-white text-lg sm:text-xl space-y-5 list-none leading-relaxed drop-shadow-md">
        {genre.lines.map((line, i) => (
          <motion.li
            key={i}
            variants={itemVariants}
            whileHover="hover"
            transition={{ delay: i * 0.15 }}
            className="select-text cursor-default"
          >
            {line}
          </motion.li>
        ))}
      </motion.ul>

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </motion.section>
  );
};

export default NewToMovies;
