const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Initialize Firebase Admin SDK (make sure this file exists and works)
require("./config/firebaseAdmin");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB using Mongoose
async function connectDB() {
  try {
    const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/Our_web_trackflix";
    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit app if cannot connect to DB
  }
}
connectDB();

// -------------------- ROUTES -------------------- //
const usersRoutes = require("./routes/users");
const loginEventsRoutes = require("./routes/loginEvents"); // Make sure filename matches exactly

const celebrityRoutes = require("./routes/celebrityRoutes");
const fanFavouriteRoutes = require("./routes/fanFavouriteRoutes");
const featuredItemRoutes = require("./routes/featuredItemRoutes");
const ftRecommendationRoutes = require("./routes/ftRecommendationRoutes");
const fullMovieRoutes = require("./routes/fullMovieRoutes");
const fullMovieDetailRoutes = require("./routes/fullMovieDetailRoutes");
const interestRoutes = require("./routes/interestRoutes");
const liveShowRoutes = require("./routes/liveShowRoutes");
const liveTVShowRoutes = require("./routes/liveTVShowRoutes");
const recommendationCelebritiesRoutes = require("./routes/recommendationCelebritiesRoutes");
const topTenMovieRoutes = require("./routes/topTenMovieRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");
const ratingsRoutes = require("./routes/ratingsRoutes");

app.use("/api/ratings", ratingsRoutes);



// Mount routes
app.use("/api/users", usersRoutes);
app.use("/api/login-events", loginEventsRoutes);

app.use("/api/celebrities", celebrityRoutes);
app.use("/api/fanfavourites", fanFavouriteRoutes);
app.use("/api/featureditems", featuredItemRoutes);
app.use("/api/ftrecommendations", ftRecommendationRoutes);
app.use("/api/fullmovies", fullMovieRoutes);
app.use("/api/fullmoviedetails", fullMovieDetailRoutes);
app.use("/api/interests", interestRoutes);
app.use("/api/liveshows", liveShowRoutes);
app.use("/api/livetvshows", liveTVShowRoutes);
app.use("/api/recommendationcelebrities", recommendationCelebritiesRoutes);
app.use("/api/toptenmovies", topTenMovieRoutes);
app.use("/api/watchlist", watchlistRoutes);


// Simple home route to test server running
app.get("/", (req, res) => {
  res.send("🎬 Trackflix Backend is running!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
