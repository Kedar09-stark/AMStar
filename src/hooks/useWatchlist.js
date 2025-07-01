// src/hooks/useWatchlist.js
import { useState, useEffect } from "react";
import { fetchWatchlist } from "../api/watchlist";

export const useWatchlist = (user) => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = await user.getIdToken();
        const movies = await fetchWatchlist(user.uid, token);
        setWatchlist(movies);
      } catch (e) {
        setError(e.message || "Failed to load watchlist");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user]);

  return { watchlist, loading, error, setWatchlist, setError };
};
