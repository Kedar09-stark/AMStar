import React, { useState, useRef, useEffect, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { movies } from "../data/movies";

// Icon components
import PlayIcon from "../components/icons/PlayIcon";
import PauseIcon from "../components/icons/PauseIcon";
import VolumeMuteIcon from "../components/icons/VolumeMuteIcon";
import VolumeUpIcon from "../components/icons/VolumeUpIcon";

// Core section components
import HeroSearch from "../components/sections/HeroSearch";
import HeroVideo from "../components/sections/HeroVideo";

// Lazy-loaded components for performance
const FeaturedToday = lazy(() => import("../components/sections/FeaturedToday"));
const MostPopularCelebrities = lazy(() => import("../components/sections/MostPopularCelebrities"));
const Top10Trackflix = lazy(() => import("../components/sections/Top10Trackflix"));
const FanFavorites = lazy(() => import("../components/sections/FanFavorites"));
const PopularInterests = lazy(() => import("../components/sections/PopularInterests"));

const Home = () => {
  const [current, setCurrent] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const currentMovie = movies[current];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % movies.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % movies.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + movies.length) % movies.length);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchTerm.trim().toLowerCase();
    if (trimmed) {
      navigate(`/${trimmed}`);
      setSearchTerm("");
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
      setIsPlaying((prev) => !prev);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted((prev) => !prev);
    }
  };

  return (
    <>
      <Helmet>
        <title>Home | Trackflix</title>
        <meta name="description" content="Watch trending movies, explore fan favorites, and discover top celebrities only on Trackflix." />
        <meta name="keywords" content="Trackflix, movies, video streaming, celebrities, fan favorites, entertainment" />
      </Helmet>

      <main>
        <HeroSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSubmit={handleSubmit}
        />

        <HeroVideo
          videoRef={videoRef}
          currentMovie={currentMovie}
          isMuted={isMuted}
          isPlaying={isPlaying}
          togglePlayPause={togglePlayPause}
          toggleMute={toggleMute}
          nextSlide={nextSlide}
          prevSlide={prevSlide}
          PlayIcon={PlayIcon}
          PauseIcon={PauseIcon}
          VolumeMuteIcon={VolumeMuteIcon}
          VolumeUpIcon={VolumeUpIcon}
        />

        <section className="bg-black text-white space-y-20 py-12 px-4 sm:px-12">
          <Suspense fallback={<div className="text-white">Loading sections...</div>}>
            <FeaturedToday />
            <MostPopularCelebrities />
            <Top10Trackflix />
            <FanFavorites />
            <PopularInterests />
          </Suspense>
        </section>
      </main>
    </>
  );
};

export default Home;
