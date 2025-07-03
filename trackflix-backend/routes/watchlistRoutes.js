const express = require("express");
const router = express.Router();
const Watchlist = require("../models/Watchlist");

// Add movie to watchlist (existing)
router.post("/add", async (req, res) => {
  const { userId, userEmail, movie } = req.body;

  if (!userId || !userEmail || !movie) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const normalizedMovie = {
    id: movie.id ? movie.id.toString() : null,
    title: movie.title || "Untitled",
    type: movie.type || "movie",
    image: movie.image || movie.img || movie.poster || "",
    rating: typeof movie.rating === "number" ? movie.rating : 0,
    genres: Array.isArray(movie.genres) ? movie.genres : [],
    releaseDate: movie.releaseDate ? movie.releaseDate.toString() : "",
    trailerLink: movie.trailerLink || movie.trailer || "",
  };

  if (!normalizedMovie.id) {
    return res.status(400).json({ message: "Movie ID is required" });
  }
  if (!normalizedMovie.image) {
    return res.status(400).json({ message: "Movie image is required" });
  }
  if (!normalizedMovie.type) {
    return res.status(400).json({ message: "Movie type is required" });
  }

  try {
    let watchlist = await Watchlist.findOne({ userId });

    if (!watchlist) {
      watchlist = new Watchlist({
        userId,
        userEmail,
        movies: [normalizedMovie],
      });
    } else {
      if (!watchlist.movies) watchlist.movies = [];
      // Commented out duplicate check to allow duplicates
      // const exists = watchlist.movies.some((m) => m.id === normalizedMovie.id);
      // if (exists) {
      //   return res.status(409).json({ message: "Movie already in watchlist" });
      // }

      watchlist.movies.push(normalizedMovie);

      if (watchlist.userEmail !== userEmail) {
        watchlist.userEmail = userEmail;
      }
    }

    await watchlist.save();

    return res.status(201).json({ message: "Movie added to watchlist", watchlist });
  } catch (err) {
    console.error("Watchlist POST /add error:", err.message, err.stack);
    return res.status(500).json({ message: "Server error" });
  }
});

// Get watchlist by userId (existing)
router.get("/:userId", async (req, res) => {
  try {
    const watchlist = await Watchlist.findOne({ userId: req.params.userId });

    if (!watchlist) {
      return res.status(404).json({ message: "Watchlist not found" });
    }

    return res.json(watchlist);
  } catch (err) {
    console.error("Watchlist GET /:userId error:", err.message, err.stack);
    return res.status(500).json({ message: "Server error" });
  }
});

// ----------- NEW: Update movie rating in watchlist -----------
router.post("/ratings/:userId", async (req, res) => {
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

    const movie = watchlist.movies.find((m) => m.id === movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found in watchlist" });
    }

    movie.userRating = userRating;

    watchlist.markModified("movies");
    await watchlist.save();

    return res.status(200).json({ message: "Rating updated successfully", movie });
  } catch (err) {
    console.error("Error updating user rating:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
