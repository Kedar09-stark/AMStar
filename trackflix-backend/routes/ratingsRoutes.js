const express = require("express");
const router = express.Router();
const Watchlist = require("../models/Watchlist");

// POST /api/ratings/:userId
// Body: { movieId: string, userRating: number }
router.post("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { movieId, userRating } = req.body;

  if (!movieId || typeof userRating !== "number") {
    return res.status(400).json({ message: "movieId and userRating are required and must be valid" });
  }

  try {
    const watchlist = await Watchlist.findOne({ userId });
    if (!watchlist) {
      return res.status(404).json({ message: "Watchlist not found" });
    }

    // Find movie in user's watchlist
    const movie = watchlist.movies.find((m) => m.id === movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found in watchlist" });
    }

    // Update the userRating
    movie.userRating = userRating;

    // Mark movies as modified since it's a nested array
    watchlist.markModified("movies");

    // Save updated watchlist
    await watchlist.save();

    return res.status(200).json({ message: "Rating updated successfully", movie });
  } catch (err) {
    console.error("Error updating user rating:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
