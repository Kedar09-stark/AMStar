const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 5000;

app.use(cors());

// Helper to read JSON files
const readJSON = (filename) => {
  const data = fs.readFileSync(`./data/${filename}`, "utf8");
  return JSON.parse(data);
};

// Routes matching your data files
app.get("/top10", (req, res) => {
  res.json(readJSON("top10Movies.json"));
});

app.get("/fan-favorites", (req, res) => {
  res.json(readJSON("fanFavourites.json"));
});

app.get("/featured-today", (req, res) => {
  res.json(readJSON("featuredItem.json"));
});

app.get("/celebrities", (req, res) => {
  res.json(readJSON("Celebrities.json"));
});

app.get("/movies", (req, res) => {
  res.json(readJSON("movies.json"));
});

app.get("/interest", (req, res) => {
  res.json(readJSON("interest.json"));
});

app.get("/fullmovies", (req, res) => {
  res.json(readJSON("fullmovies.json"));
});

app.get("/liveshows", (req, res) => {
  res.json(readJSON("liveshows.json"));
});
app.get("/live", (req, res) => {
  res.json(readJSON("live.json"));
});
app.get("/ftrecommendations", (req, res) => {
  res.json(readJSON("ftrecommendations.json"));
});
app.get("/recomendationcelebrities", (req, res) => {
  res.json(readJSON("recomendationcelebrities.json"));
});
app.get("/tvshow", (req, res) => {
  res.json(readJSON("tvshow.json"));
});



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

