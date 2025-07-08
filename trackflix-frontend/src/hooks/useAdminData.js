import { useEffect, useState } from "react";

import { fetchCelebrities } from "../api/celebrityApi";
import { fetchFanFavourites } from "../api/fanfavouriteapi";
import { fetchFullMovieDetails } from "../api/moviedetailsapi";
import { fetchFullMovies } from "../api/movieapi";
import { fetchLiveTVShows } from "../api/livetvapi";
import { fetchLiveTVDetails } from "../api/livetvdetailsapi";
import { fetchFeaturedItems } from "../api/featuredIteamapi";
import { fetchFTRecommendations } from "../api/ftremommedationapi";
import { fetchTopTenMovies } from "../api/top10api";
import { fetchRecommendationCelebrities } from "../api/morecelebrityapi";
import { fetchInterests } from "../api/interestapi";
import { fetchUsers } from "../api/userapi";

const useAdminData = () => {
  const [celebrities, setCelebrities] = useState([]);
  const [fanFavourites, setFanFavourites] = useState([]);
  const [fullMovieDetails, setFullMovieDetails] = useState([]);
  const [fullMovies, setFullMovies] = useState([]);
  const [liveTVShows, setLiveTVShows] = useState([]);
  const [liveTVDetails, setLiveTVDetails] = useState([]);
  const [featuredItems, setFeaturedItems] = useState([]);
  const [ftRecommendations, setFTRecommendations] = useState([]);
  const [topTenMovies, setTopTenMovies] = useState([]);
  const [moreCelebrities, setMoreCelebrities] = useState([]);
  const [interests, setInterests] = useState([]);
  const [users, setUsers] = useState([]);

  const loadCelebrities = async () => {
    try {
      const data = await fetchCelebrities();
      setCelebrities(data);
    } catch (err) {
      console.error("Error loading celebrities:", err);
    }
  };

  const loadFanFavourites = async () => {
    try {
      const data = await fetchFanFavourites();
      setFanFavourites(data);
    } catch (err) {
      console.error("Error loading fan favourites:", err);
    }
  };

  const loadFullMovieDetails = async () => {
    try {
      const data = await fetchFullMovieDetails();
      setFullMovieDetails(data);
    } catch (err) {
      console.error("Error loading full movie details:", err);
    }
  };

  const loadFullMovies = async () => {
    try {
      const data = await fetchFullMovies();
      setFullMovies(data);
    } catch (err) {
      console.error("Error loading full movies:", err);
    }
  };

  const loadLiveTVShows = async () => {
    try {
      const data = await fetchLiveTVShows();
      setLiveTVShows(data);
    } catch (err) {
      console.error("Error loading live TV shows:", err);
    }
  };

  const loadLiveTVDetails = async () => {
    try {
      const data = await fetchLiveTVDetails();
      setLiveTVDetails(data);
    } catch (err) {
      console.error("Error loading live TV details:", err);
    }
  };

  const loadFeaturedItems = async () => {
    try {
      const data = await fetchFeaturedItems();
      setFeaturedItems(data);
    } catch (err) {
      console.error("Error loading featured items:", err);
    }
  };

  const loadFTRecommendations = async () => {
    try {
      const data = await fetchFTRecommendations();
      setFTRecommendations(data);
    } catch (err) {
      console.error("Error loading FT recommendations:", err);
    }
  };

  const loadTopTenMovies = async () => {
    try {
      const data = await fetchTopTenMovies();
      setTopTenMovies(data);
    } catch (err) {
      console.error("Error loading top 10 movies:", err);
    }
  };

  const loadMoreCelebrities = async () => {
    try {
      const data = await fetchRecommendationCelebrities();
      setMoreCelebrities(data);
    } catch (err) {
      console.error("Error loading more celebrities:", err);
    }
  };

  const loadInterests = async () => {
    try {
      const data = await fetchInterests();
      setInterests(data);
    } catch (err) {
      console.error("Error loading interests:", err);
    }
  };

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      console.error("Error loading users:", err);
    }
  };

  useEffect(() => {
    loadCelebrities();
    loadFanFavourites();
    loadFullMovieDetails();
    loadFullMovies();
    loadLiveTVShows();
    loadLiveTVDetails();
    loadFeaturedItems();
    loadFTRecommendations();
    loadTopTenMovies();
    loadMoreCelebrities();
    loadInterests();
    loadUsers();
  }, []);

  return {
    celebrities,
    fanFavourites,
    fullMovieDetails,
    fullMovies,
    liveTVShows,
    liveTVDetails,
    featuredItems,
    ftRecommendations,
    topTenMovies,
    moreCelebrities,
    interests,
    users,
    loadCelebrities,
    loadFanFavourites,
    loadFullMovieDetails,
    loadFullMovies,
    loadLiveTVShows,
    loadLiveTVDetails,
    loadFeaturedItems,
    loadFTRecommendations,
    loadTopTenMovies,
    loadMoreCelebrities,
    loadInterests,
    loadUsers,
  };
};

export default useAdminData;
