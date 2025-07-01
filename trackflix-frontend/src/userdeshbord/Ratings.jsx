import React, { useState, useEffect } from "react";
import RatingMovieCard from "./RatingMovieCard"; // Adjust path if needed
import CenteredMessage from "./CenteredMessage";

const Ratings = ({ user }) => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");

  const fetchRatings = async () => {
    try {
      const token = await user.getIdToken();
      const res = await fetch(`http://localhost:5000/api/watchlist/${user.uid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch watchlist");

      const data = await res.json();
      setRatings(data.movies || []);
    } catch (error) {
      console.error("Error fetching ratings:", error);
      setRatings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, [user]);

  const updateRating = async (movieId, newRating) => {
    try {
      const token = await user.getIdToken();
      const res = await fetch(`http://localhost:5000/api/ratings/${user.uid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ movieId, userRating: newRating }),
      });

      if (!res.ok) {
        throw new Error("Failed to update rating");
      }

      await fetchRatings(); // Refresh ratings after update
    } catch (error) {
      console.error("Error updating rating:", error);
      alert("Failed to update rating. Please try again.");
    }
  };

  const sortedRatings = [...ratings].sort((a, b) => {
    if (sortBy === "highest") return (b.userRating || 0) - (a.userRating || 0);
    if (sortBy === "lowest") return (a.userRating || 0) - (b.userRating || 0);
    return new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt);
  });

  if (loading) return <CenteredMessage message="Loading your ratings..." />;
  if (ratings.length === 0) return <CenteredMessage message="No ratings found." />;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">My Ratings</h2>
        <select
          className="border p-1 rounded"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="highest">Highest Rating</option>
          <option value="lowest">Lowest Rating</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sortedRatings.map((movie, idx) => (
          <RatingMovieCard key={movie.id || idx} movie={movie} onRate={updateRating} />
        ))}
      </div>
    </div>
  );
};

export default Ratings;
