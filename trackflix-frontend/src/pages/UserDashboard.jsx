import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchWatchlist } from "../api/watchlist";

import UserHeader from "../userdeshbord/UserHeader";
import MovieCard from "../userdeshbord/MovieCard";
import CenteredMessage from "../userdeshbord/CenteredMessage";
import Recommendations from "../userdeshbord/Recommendations";
import Ratings from "../userdeshbord/Ratings";
// import Settings from "../userdeshbord/Settings";
import UserTabsNav from "../userdeshbord/UserTabsNav";

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

  const uniqueWatchlist = useMemo(() => {
    const seenTitles = new Set();
    return watchlist.filter((movie) => {
      const title = (movie.title || "").toLowerCase();
      if (seenTitles.has(title)) return false;
      seenTitles.add(title);
      return true;
    });
  }, [watchlist]);

  if (authLoading)
    return <CenteredMessage message="🔄 Authenticating..." size="lg" />;
  if (dataLoading)
    return <CenteredMessage message="⏳ Loading your watchlist..." size="lg" />;
  if (error)
    return <CenteredMessage message={`⚠️ ${error}`} isError size="lg" />;

  return (
    <main className="min-h-screen bg-gradient-to-tr from-gray-50 to-gray-100 pt-28 px-4 sm:px-6 md:px-12 lg:px-16 max-w-screen-xl mx-auto">
      <UserHeader user={user} watchlistCount={uniqueWatchlist.length} />
      <UserTabsNav />

      <Routes>
        <Route
          index
          element={
            uniqueWatchlist.length === 0 ? (
              <section
                aria-live="polite"
                className="flex flex-col items-center justify-center mt-20 space-y-4 text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17v-2a4 4 0 00-4-4H5a4 4 0 014-4v2a4 4 0 004 4h2a4 4 0 01-4 4z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6"
                  />
                </svg>
                <p className="text-xl font-semibold">Your watchlist is empty.</p>
                <button
                  onClick={() => navigate("/movies")}
                  className="mt-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition"
                >
                  Explore Movies
                </button>
              </section>
            ) : (
              <section
                aria-live="polite"
                aria-label="User watchlist movies"
                className="grid grid-cols-4 gap-3 sm:gap-4"
              >
                {uniqueWatchlist.map((movie, index) => (
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
        {/* <Route path="settings" element={<Settings user={user} />} /> */}
        <Route path="recommendations" element={<Recommendations />} />
      </Routes>
    </main>
  );
};

export default UserDashboard;
