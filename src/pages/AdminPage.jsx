// AdminPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { ToastContainer, toast } from "react-toastify";

import TabsNav from "../components/AdminTabs/TabsNav";
import CelebritiesTab from "../components/AdminTabs/CelebritiesTab";
import FanFavouritesTab from "../components/AdminTabs/FanFavouritesTab";
import FullMovieDetailsTab from "../components/AdminTabs/FullMovieDetailsTab";
import FullMoviesTab from "../components/AdminTabs/FullMoviesTab";
import LiveTVShowsTab from "../components/AdminTabs/LiveTVShowsTab";
import FeaturedItemsTab from "../components/AdminTabs/FeaturedItemsTab";
import FTRecommendationsTab from "../components/AdminTabs/FTRecommendationsTab";
import TopTenMoviesTab from "../components/AdminTabs/TopTenMoviesTab";
import MoreCelebrityTab from "../components/AdminTabs/MoreCelebrityTab";
import LiveTVDetailsTab from "../components/AdminTabs/LiveTVDetailsTab";
import InterestsTab from "../components/AdminTabs/InterestsTab";
import UsersTab from "../components/AdminTabs/UsersTab";
//import MoreCelebrityForm from "../components/Extraadmin/MoreCelebrityForm";

import UserList from "../components/Extraadmin/UserList";


import { fetchInterests } from "../api/interestapi";
import { fetchFTRecommendations } from "../api/ftremommedationapi";
import { fetchLiveTVShows } from "../api/livetvapi";
import { fetchCelebrities } from "../api/celebrityApi";
import { fetchFanFavourites } from "../api/fanfavouriteapi";
import { fetchFullMovieDetails } from "../api/moviedetailsapi";
import { fetchFullMovies } from "../api/movieapi";
import { fetchFeaturedItems } from "../api/featuredIteamapi";
import { fetchTopTenMovies } from "../api/top10api";
import { fetchRecommendationCelebrities } from "../api/morecelebrityapi";
import { fetchLiveTVDetails } from "../api/livetvdetailsapi";
import { fetchUsers } from "../api/userapi";


const AdminPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("celebrities");

  const [form, setForm] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [celebrities, setCelebrities] = useState([]);
  const [fanFavourites, setFanFavourites] = useState([]);
  const [fullMovieDetails, setFullMovieDetails] = useState([]);
  const [fullMovies, setFullMovies] = useState([]);
  const [liveTVShows, setLiveTVShows] = useState([]);
  const [featuredItems, setFeaturedItems] = useState([]);
  const [ftRecommendations, setFTRecommendations] = useState([]);
  const [topTenMovies, setTopTenMovies] = useState([]);
  const [moreCelebrities, setMoreCelebrities] = useState([]);
  const [interests, setInterests] = useState([]);
  const [liveTVDetails, setLiveTVDetails] = useState([]);
  const [users, setUsers] = useState([]);
const [dailyStats, setDailyStats] = useState([]);

  // Load functions
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



  // Load all data on mount
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

  // ✅ Updated logout function
  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    try {
      await signOut(auth);
      localStorage.clear();
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed. Please try again.");
    }
  };
return (

  
      <div className="min-h-screen bg-gray-100 p-6">
  

    <TabsNav
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      className="mt-6"
    />


    {activeTab === "celebrities" && (
      <CelebritiesTab
        form={form}
        setForm={setForm}
        editingId={editingId}
        setEditingId={setEditingId}
        submitting={submitting}
        setSubmitting={setSubmitting}
        celebrities={celebrities}
        loadCelebrities={loadCelebrities}
      />
    )}

    {activeTab === "fanfavourites" && (
      <FanFavouritesTab
        form={form}
        setForm={setForm}
        editingId={editingId}
        setEditingId={setEditingId}
        submitting={submitting}
        setSubmitting={setSubmitting}
        fanFavourites={fanFavourites}
        loadFanFavourites={loadFanFavourites}
      />
    )}

    {activeTab === "fullmoviedetails" && (
      <FullMovieDetailsTab
        form={form}
        setForm={setForm}
        editingId={editingId}
        setEditingId={setEditingId}
        submitting={submitting}
        setSubmitting={setSubmitting}
        fullMovieDetails={fullMovieDetails}
        loadFullMovieDetails={loadFullMovieDetails}
      />
    )}

    {activeTab === "fullmovies" && (
      <FullMoviesTab
        form={form}
        setForm={setForm}
        editingId={editingId}
        setEditingId={setEditingId}
        submitting={submitting}
        setSubmitting={setSubmitting}
        fullMovies={fullMovies}
        loadFullMovies={loadFullMovies}
      />
    )}

    {activeTab === "livetvshows" && (
      <LiveTVShowsTab
        form={form}
        setForm={setForm}
        editingId={editingId}
        setEditingId={setEditingId}
        submitting={submitting}
        setSubmitting={setSubmitting}
        liveTVShows={liveTVShows}
        loadLiveTVShows={loadLiveTVShows}
      />
    )}

    {activeTab === "livetvdetails" && (
      <LiveTVDetailsTab
        form={form}
        setForm={setForm}
        editingId={editingId}
        setEditingId={setEditingId}
        submitting={submitting}
        setSubmitting={setSubmitting}
        liveTVDetails={liveTVDetails}
        loadLiveTVDetails={loadLiveTVDetails}
      />
    )}

    {activeTab === "featureditems" && (
      <FeaturedItemsTab
        form={form}
        setForm={setForm}
        editingId={editingId}
        setEditingId={setEditingId}
        submitting={submitting}
        setSubmitting={setSubmitting}
        featuredItems={featuredItems}
        loadFeaturedItems={loadFeaturedItems}
      />
    )}

    {activeTab === "ftrecommendations" && (
      <FTRecommendationsTab
        form={form}
        setForm={setForm}
        editingId={editingId}
        setEditingId={setEditingId}
        submitting={submitting}
        setSubmitting={setSubmitting}
        ftRecommendations={ftRecommendations}
        loadFTRecommendations={loadFTRecommendations}
      />
    )}

    {activeTab === "interests" && (
      <InterestsTab
        form={form}
        setForm={setForm}
        editingId={editingId}
        setEditingId={setEditingId}
        submitting={submitting}
        setSubmitting={setSubmitting}
        interests={interests}
        loadInterests={loadInterests}
      />
    )}

    {activeTab === "toptenmovies" && (
      <TopTenMoviesTab
        form={form}
        setForm={setForm}
        editingId={editingId}
        setEditingId={setEditingId}
        submitting={submitting}
        setSubmitting={setSubmitting}
        topTenMovies={topTenMovies}
        loadTopTenMovies={loadTopTenMovies}
      />
    )}

    {activeTab === "morecelebrity" && (
      <MoreCelebrityTab
        form={form}
        setForm={setForm}
        editingId={editingId}
        setEditingId={setEditingId}
        submitting={submitting}
        setSubmitting={setSubmitting}
        moreCelebrities={moreCelebrities}
        loadMoreCelebrities={loadMoreCelebrities}
      />
    )}

    {activeTab === "users" && <UsersTab users={users} />}

   
  </div>
);

};

export default AdminPage;
