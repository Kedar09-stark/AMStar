import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchWatchlist } from "../api/watchlist";

import UserHeader from "../userdeshbord/UserHeader";
import MovieCard from "../userdeshbord/MovieCard";
import CenteredMessage from "../userdeshbord/CenteredMessage";
import Recommendations from "../userdeshbord/Recommendations";
import Ratings from "../userdeshbord/Ratings";
import Settings from "../userdeshbord/Settings";

import { motion } from "framer-motion";

// ---------------------- Tabs Navigation Component ----------------------
const UserTabsNav = () => {
  const tabs = [
    { key: "", label: "Watchlist" },
    { key: "ratings", label: "My Ratings" },
    { key: "recommendations", label: "Recommendations" },
    { key: "settings", label: "Account Settings" },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const tabsRef = useRef([]);
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const pathParts = location.pathname.split("/");
    const currentTab = pathParts[2] || "";
    setActiveTab(currentTab);
  }, [location.pathname]);

  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });

  useEffect(() => {
    const activeIndex = tabs.findIndex((t) => t.key === activeTab);
    const node = tabsRef.current[activeIndex];
    if (node) {
      setUnderlineStyle({
        width: node.offsetWidth,
        left: node.offsetLeft,
      });
    }
  }, [activeTab]);

  const handleTabClick = (key) => {
    setActiveTab(key);
    navigate(`/dashboard${key ? `/${key}` : ""}`);
  };

  return (
    <div className="w-full px-4 py-6 bg-gray-100 rounded-xl shadow relative z-10 mb-6">
      {/* Desktop Tabs */}
      <div className="hidden md:flex space-x-6 relative pb-4 border-b border-gray-300">
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.key;
          return (
            <motion.button
              key={tab.key || "watchlist"}
              ref={(el) => (tabsRef.current[index] = el)}
              onClick={() => handleTabClick(tab.key)}
              whileHover={{ scale: 1.1, textShadow: "0 0 8px #2563EB" }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-4 py-2 font-semibold text-md rounded-md transition ${
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              }`}
            >
              {tab.label}
            </motion.button>
          );
        })}

        {/* Underline */}
        <motion.span
          className="absolute bottom-0 h-1 bg-blue-600 rounded-full"
          animate={{
            width: underlineStyle.width,
            left: underlineStyle.left,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </div>

      {/* Mobile Tabs */}
      <div className="flex md:hidden justify-between items-center relative">
        <button
          className="relative px-6 py-2 rounded-md font-semibold text-md bg-blue-600 text-white w-full"
          onClick={() => handleTabClick(activeTab)}
        >
          {tabs.find((t) => t.key === activeTab)?.label || "Select"}
        </button>
      </div>
    </div>
  );
};

// ---------------------- User Dashboard Main ----------------------
const UserDashboard = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [authLoading, setAuthLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setError(null);
      } else {
        navigate("/login", { replace: true });
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  useEffect(() => {
    if (!user) return;

    const loadWatchlist = async () => {
      setDataLoading(true);
      setError(null);

      try {
        const token = await user.getIdToken();
        const watchlistData = await fetchWatchlist(user.uid, token);

        if (!watchlistData || !Array.isArray(watchlistData.movies)) {
          throw new Error("Invalid watchlist format");
        }

        setWatchlist(watchlistData.movies);
      } catch (err) {
        console.error("Error fetching watchlist:", err);
        setError("Failed to load your watchlist. Please try again later.");
      } finally {
        setDataLoading(false);
      }
    };

    loadWatchlist();
  }, [user]);

  if (authLoading) return <CenteredMessage message="Authenticating..." />;
  if (dataLoading) return <CenteredMessage message="Loading your watchlist..." />;
  if (error) return <CenteredMessage message={error} isError />;

  return (
    <main className="min-h-screen bg-gray-50 pt-24 sm:pt-28 p-4 sm:p-6 md:p-10 lg:p-12 xl:p-16 max-w-screen-xl mx-auto">
      <UserHeader user={user} watchlistCount={watchlist.length} />

      {/* Navigation Tabs */}
      <UserTabsNav />

      {/* Nested Routing */}
      <Routes>
        <Route
          index
          element={
            watchlist.length === 0 ? (
              <p className="text-center text-gray-700 text-lg mt-10">
                Your watchlist is empty.
              </p>
            ) : (
              <section
                aria-live="polite"
                aria-label="User watchlist movies"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {watchlist.map((movie, index) => (
                  <MovieCard
                    key={movie.id ? `${movie.id}-${index}` : `${movie.title}-${index}`}
                    movie={movie}
                  />
                ))}
              </section>
            )
          }
        />
        <Route path="ratings" element={<Ratings user={user} />} />
        <Route path="settings" element={<Settings user={user} />} />
        <Route path="recommendations" element={<Recommendations />} />
      </Routes>
    </main>
  );
};

export default UserDashboard;
