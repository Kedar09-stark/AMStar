import React, { useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PlayIcon from "../icons/PlayIcon";
import PauseIcon from "../icons/PauseIcon";
import VolumeMuteIcon from "../icons/VolumeMuteIcon";
import VolumeUpIcon from "../icons/VolumeUpIcon";

function useReducedMotionOrSmallScreen() {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce), (max-width: 640px)"
    );
    const handler = () => setShouldReduceMotion(mediaQuery.matches);

    handler();
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return shouldReduceMotion;
}

const HeroVideo = ({
  videoRef,
  currentMovie,
  isMuted,
  isPlaying,
  togglePlayPause,
  toggleMute,
  nextSlide,
  prevSlide,
}) => {
  const [isBuffering, setIsBuffering] = useState(false);
  const reduceMotion = useReducedMotionOrSmallScreen();

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);

  useEffect(() => {
    return () => {
      if (videoRef?.current) videoRef.current.pause();
    };
  }, [videoRef]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!videoRef?.current) return;
      if (document.hidden) videoRef.current.pause();
      else if (isPlaying) videoRef.current.play().catch(() => {});
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [videoRef, isPlaying]);

  useEffect(() => {
    if (!videoRef?.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && isPlaying) {
          videoRef.current.pause();
        } else if (entry.isIntersecting && isPlaying) {
          videoRef.current.play().catch(() => {});
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [videoRef, isPlaying]);

  useEffect(() => {
    if (!videoRef?.current) return;
    const video = videoRef.current;

    const onWaiting = () => setIsBuffering(true);
    const onPlaying = () => setIsBuffering(false);
    const onCanPlay = () => setIsBuffering(false);

    video.addEventListener("waiting", onWaiting);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("canplay", onCanPlay);

    return () => {
      video.removeEventListener("waiting", onWaiting);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("canplay", onCanPlay);
    };
  }, [videoRef]);

  const handleKeyDown = (actionFn) => (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      actionFn();
    }
  };

  return (
    <motion.section className="relative w-full overflow-hidden min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] xl:min-h-screen">
      {/* ✅ Video with Parallax */}
      <motion.div
        className="absolute inset-0 w-full h-full z-0 overflow-hidden"
        style={reduceMotion ? {} : { y }}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover pointer-events-none"
          src={currentMovie.video}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          preload="auto"
          poster={currentMovie.poster}
          aria-label={`Trailer video for ${currentMovie.title}`}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40 pointer-events-none" />
        {isBuffering && (
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </motion.div>

      {/* ✅ Controls Positioned Properly */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex gap-6">
        <button
          onClick={togglePlayPause}
          onKeyDown={handleKeyDown(togglePlayPause)}
          className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-white bg-black/40 hover:bg-black/60 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button
          onClick={toggleMute}
          onKeyDown={handleKeyDown(toggleMute)}
          className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-white bg-black/40 hover:bg-black/60 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <VolumeMuteIcon /> : <VolumeUpIcon />}
        </button>
      </div>
 {/* Info Box */}
      <div className="absolute bottom-6 left-4 z-30 w-[90%] sm:left-6 sm:max-w-sm md:max-w-md lg:max-w-lg">
        <h1
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-white mb-3"
          tabIndex={0}
        >
          {currentMovie.title}
        </h1>
        <a
          href={currentMovie.netflixLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-red-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-700 transition"
          aria-label={`Watch ${currentMovie.title} on Netflix`}
        >
          Watch
        </a>
      </div>
      {/* ✅ Navigation Buttons */}
      <button
        onClick={prevSlide}
        onKeyDown={handleKeyDown(prevSlide)}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600 z-20"
        aria-label="Previous movie"
      >
        <span className="text-xl">&#10094;</span>
      </button>

      <button
        onClick={nextSlide}
        onKeyDown={handleKeyDown(nextSlide)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600 z-20"
        aria-label="Next movie"
      >
        <span className="text-xl">&#10095;</span>
      </button>
    </motion.section>
  );
};

export default HeroVideo;
