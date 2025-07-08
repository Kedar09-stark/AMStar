import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

import { auth } from "../firebase/firebase-config";
import TabsNav from "../components/AdminTabs/TabsNav";
import {
  CelebritiesTab,
  FanFavouritesTab,
  FullMovieDetailsTab,
  FullMoviesTab,
  LiveTVShowsTab,
  LiveTVDetailsTab,
  FeaturedItemsTab,
  FTRecommendationsTab,
  TopTenMoviesTab,
  MoreCelebrityTab,
  InterestsTab,
  UsersTab,
} from "../components/AdminTabs";

import useAdminData from "../hooks/useAdminData";

const AdminPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("celebrities");
  const [form, setForm] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const {
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
  } = useAdminData();

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
      <TabsNav activeTab={activeTab} setActiveTab={setActiveTab} className="mt-6" />

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

      {activeTab === "users" && <UsersTab users={users} />}
    </div>
  );
};

export default AdminPage;
