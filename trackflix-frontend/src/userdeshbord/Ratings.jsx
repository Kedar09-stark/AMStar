import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import RatingMovieCard from "./RatingMovieCard";
import CenteredMessage from "./CenteredMessage";

const Ratings = ({ user }) => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");

  const fetchRatings = async () => {
    try {
      const token = await user.getIdToken();
      const { data } = await axios.get(
        `https://fourloopers-9.onrender.com/api/watchlist/${user.uid}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRatings(data.movies || []);
    } catch (error) {
      console.error("Error fetching ratings:", error);
      setRatings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchRatings();
  }, [user]);

  const updateRating = async (movieId, newRating) => {
    try {
      const token = await user.getIdToken();
      await axios.post(
        `https://fourloopers-9.onrender.com/api/ratings/${user.uid}`,
        { movieId, userRating: newRating },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchRatings(); // Refresh ratings
    } catch (error) {
      console.error("Error updating rating:", error);
      alert("Failed to update rating. Please try again.");
    }
  };

  const sortedRatings = useMemo(() => {
    return [...ratings].sort((a, b) => {
      if (sortBy === "highest") return (b.userRating || 0) - (a.userRating || 0);
      if (sortBy === "lowest") return (a.userRating || 0) - (b.userRating || 0);
      return new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt);
    });
  }, [ratings, sortBy]);

  if (loading) return <CenteredMessage message="Loading your ratings..." />;
  if (ratings.length === 0) return <CenteredMessage message="No ratings found." />;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-extrabold text-yellow-700 drop-shadow-sm">
          My Ratings
        </h2>

        <div className="w-full max-w-xs">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="block appearance-none w-full bg-yellow-50 border border-yellow-400 text-yellow-700 font-semibold py-2.5 pl-4 pr-10 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:border-yellow-500 hover:bg-yellow-100 hover:shadow-md cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 justify-items-center">
  {sortedRatings.map((movie, idx) => (
    <RatingMovieCard key={movie.id || idx} movie={movie} onRate={updateRating} />
  ))}
</div>
    </div>
  );
};

export default Ratings;
