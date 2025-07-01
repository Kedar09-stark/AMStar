const express = require("express");
const router = express.Router();
const FullMovie = require("../models/All_FullMovies");

router.get("/", async (req, res) => {
  try {
    const data = await FullMovie.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const movie = await FullMovie.findOne({ id: parseInt(req.params.id) });
    if (!movie) return res.status(404).json({ error: "Movie not found" });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newMovie = new FullMovie(req.body);
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await FullMovie.findOneAndUpdate({ id: parseInt(req.params.id) }, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Movie not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await FullMovie.findOneAndDelete({ id: parseInt(req.params.id) });
    if (!deleted) return res.status(404).json({ error: "Movie not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
