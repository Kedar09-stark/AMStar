import React, { useState, useRef, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { movies } from "../data/movies";

import PlayIcon from "../components/icons/PlayIcon";
import PauseIcon from "../components/icons/PauseIcon";
import VolumeMuteIcon from "../components/icons/VolumeMuteIcon";
import VolumeUpIcon from "../components/icons/VolumeUpIcon";

import HeroSearch from "../components/sections/HeroSearch";
import HeroVideo from "../components/sections/HeroVideo";

// Import chatbot
import TestBot from "../chatbot/testbot";

const FeaturedToday = lazy(() => import("../components/sections/FeaturedToday"));
const MostPopularCelebrities = lazy(() => import("../components/sections/MostPopularCelebrities"));
const Top10Trackflix = lazy(() => import("../components/sections/Top10Trackflix"));
const FanFavorites = lazy(() => import("../components/sections/FanFavorites"));
const PopularInterests = lazy(() => import("../components/sections/PopularInterests"));

const Home = () => {
  const [current, setCurrent] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const currentMovie = movies[current] || null;

  const nextSlide = () => {
    setIsPlaying(false);
    setCurrent((prev) => (prev + 1) % movies.length);
  };

  const prevSlide = () => {
    setIsPlaying(false);
    setCurrent((prev) => (prev - 1 + movies.length) % movies.length);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchTerm.trim().toLowerCase();
    if (trimmed) {
      navigate(`/${trimmed}`);
      setSearchTerm("");
    }
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <>
      <Helmet>
        <title>Home | Trackflix</title>
        <meta
          name="description"
          content="Watch trending movies, explore fan favorites, and discover top celebrities only on Trackflix."
        />
        <meta
          name="keywords"
          content="Trackflix, movies, video streaming, celebrities, fan favorites, entertainment"
        />
      </Helmet>

      <main>
        <HeroSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSubmit={handleSubmit}
        />

        {currentMovie ? (
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
        ) : (
          <p className="text-white p-8">No movie data available.</p>
        )}

        <section className="bg-black text-white space-y-20 py-12 px-4 sm:px-12">
          <Suspense fallback={<div className="text-white">Loading sections...</div>}>
            <FeaturedToday />
            <MostPopularCelebrities />
            <Top10Trackflix />
            <FanFavorites />
            <PopularInterests />
          </Suspense>
        </section>

        {/* Floating chatbot in bottom-right */}
        <div className="fixed bottom-5 right-5 z-50 transition-transform duration-300 hover:scale-105">
          <TestBot />
        </div>
      </main>
    </>
  );
};

export default Home;
