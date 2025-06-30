import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { movies } from "../data/movies";

// Icon components (used inside HeroVideo)
import PlayIcon from "../components/icons/PlayIcon";
import PauseIcon from "../components/icons/PauseIcon";
import VolumeMuteIcon from "../components/icons/VolumeMuteIcon";
import VolumeUpIcon from "../components/icons/VolumeUpIcon";

// Section components
import HeroSearch from "../components/sections/HeroSearch";
import HeroVideo from "../components/sections/HeroVideo";
import FeaturedToday from "../components/sections/FeaturedToday";
import MostPopularCelebrities from "../components/sections/MostPopularCelebrities";
import Top10Trackflix from "../components/sections/Top10Trackflix";
import FanFavorites from "../components/sections/FanFavorites";
import PopularInterests from "../components/sections/PopularInterests";


const Home = () => {
  const [current, setCurrent] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const currentMovie = movies[current];

  const nextSlide = () => setCurrent((current + 1) % movies.length);
  const prevSlide = () => setCurrent((current - 1 + movies.length) % movies.length);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/${searchTerm.trim().toLowerCase()}`);
      setSearchTerm("");
    }
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      {/* Hero Text & Search */}
      <HeroSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSubmit={handleSubmit}
      />

      {/* Hero Video Slideshow */}
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

      {/* Movie Sections */}
      <div className="bg-black text-white space-y-20 py-12 px-4 sm:px-12">
        <FeaturedToday />
        <MostPopularCelebrities />
        <Top10Trackflix />
        <FanFavorites />
        <PopularInterests />
      </div>
    </>
  );
};

export default Home;
