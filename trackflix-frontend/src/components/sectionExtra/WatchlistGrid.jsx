// src/components/watchlist/WatchlistGrid.jsx
import React, { useState } from "react";
import FlipCard from "./FlipCard";
import { addMovieToWatchlist } from "../../api/watchlist";
import { getAuth } from "firebase/auth";

const WatchlistGrid = ({ watchlist, isLoggedIn }) => {
  const [flippedId, setFlippedId] = useState(null);
  const auth = getAuth();

  const onFlip = (id) => {
    setFlippedId((prev) => (prev === id ? null : id));
  };

  const onAddToWatchlist = async (movie) => {
    if (!isLoggedIn) {
      alert("Please login first.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("User not authenticated.");
      return;
    }

    try {
      const res = await addMovieToWatchlist(user.uid, user.email, movie);
      alert(res.message || `"${movie.title}" added to your watchlist!`);
    } catch (error) {
      alert(error.message || "Failed to add to watchlist");
    }
  };

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {watchlist.map((item) => (
        <FlipCard
          key={item.id ?? item.title}
          item={item}
          isFlipped={flippedId === item.id}
          onFlip={onFlip}
          onAddToWatchlist={onAddToWatchlist}
          isLoggedIn={isLoggedIn}
        />
      ))}
    </div>
  );
};

export default WatchlistGrid;
