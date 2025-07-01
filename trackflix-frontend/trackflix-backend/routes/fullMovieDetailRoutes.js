const express = require("express");
const router = express.Router();
const FullMovieDetail = require("../models/All_FullMovieDetails");

// GET all movie details
router.get("/", async (req, res) => {
  try {
    const data = await FullMovieDetail.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one movie detail by id
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid movie ID" });
  }

  try {
    const movie = await FullMovieDetail.findOne({ id });
    if (!movie) return res.status(404).json({ error: "Detail not found" });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new movie detail
router.post("/", async (req, res) => {
  try {
    const newDetail = new FullMovieDetail(req.body);
    await newDetail.save();
    res.status(201).json(newDetail);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update movie detail by id
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid movie ID" });
  }

  try {
    const updated = await FullMovieDetail.findOneAndUpdate({ id }, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Detail not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE movie detail by id
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid movie ID" });
  }

  try {
    const deleted = await FullMovieDetail.findOneAndDelete({ id });
    if (!deleted) return res.status(404).json({ error: "Detail not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
