import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import PlayIcon from "../icons/PlayIcon";
import PauseIcon from "../icons/PauseIcon";
import VolumeMuteIcon from "../icons/VolumeMuteIcon";
import VolumeUpIcon from "../icons/VolumeUpIcon";

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

  const playPauseLabel = isPlaying ? "Pause video" : "Play video";
  const muteLabel = isMuted ? "Unmute video" : "Mute video";

  useEffect(() => {
    return () => {
      if (videoRef?.current) {
        videoRef.current.pause();
      }
    };
  }, [videoRef]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!videoRef?.current) return;

      if (document.hidden) {
        videoRef.current.pause();
      } else if (isPlaying) {
        videoRef.current.play().catch(() => {});
      }
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

    return () => {
      observer.disconnect();
    };
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

  const handleKeyDownPrev = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        prevSlide();
      }
    },
    [prevSlide]
  );

  const handleKeyDownNext = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        nextSlide();
      }
    },
    [nextSlide]
  );

  const handleKeyDownTogglePlayPause = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        togglePlayPause();
      }
    },
    [togglePlayPause]
  );

  const handleKeyDownToggleMute = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleMute();
      }
    },
    [toggleMute]
  );

  return (
    <section
      aria-label={`Featured movie trailer for ${currentMovie.title}`}
      className="relative w-full h-[70vh] sm:h-[80vh] md:h-[90vh] lg:h-screen overflow-hidden"
    >
      {/* Background Video */}
      <motion.div className="absolute inset-0 w-full h-full z-0">
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
          loading="lazy"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40 pointer-events-none"
        />
        {isBuffering && (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </motion.div>

      {/* Controls */}
      <div
        aria-label="Video playback controls"
        role="group"
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-30 flex space-x-6 items-center"
      >
        <button
          onClick={togglePlayPause}
          onKeyDown={handleKeyDownTogglePlayPause}
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center text-white bg-black/40 hover:bg-black/60 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600 transition"
          aria-label={playPauseLabel}
          title={playPauseLabel}
          type="button"
          tabIndex={0}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>

        <button
          onClick={toggleMute}
          onKeyDown={handleKeyDownToggleMute}
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center text-white bg-black/40 hover:bg-black/60 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600 transition"
          aria-label={muteLabel}
          title={muteLabel}
          type="button"
          tabIndex={0}
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

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        onKeyDown={handleKeyDownPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-white p-3 sm:p-4 rounded-full bg-black/40 hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-red-600 z-30 transition"
        aria-label="Previous movie"
        type="button"
        tabIndex={0}
      >
        <span aria-hidden="true" className="text-xl sm:text-2xl md:text-3xl">
          &#10094;
        </span>
      </button>

      <button
        onClick={nextSlide}
        onKeyDown={handleKeyDownNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white p-3 sm:p-4 rounded-full bg-black/40 hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-red-600 z-30 transition"
        aria-label="Next movie"
        type="button"
        tabIndex={0}
      >
        <span aria-hidden="true" className="text-xl sm:text-2xl md:text-3xl">
          &#10095;
        </span>
      </button>
    </section>
  );
};

export default HeroVideo;
