const express = require("express");
const router = express.Router();
const TopTenMovie = require("../models/All_TopTenMovies");

// CREATE
router.post("/", async (req, res) => {
  try {
    const newTopTen = new TopTenMovie(req.body);
    await newTopTen.save();
    res.status(201).json(newTopTen);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all
router.get("/", async (req, res) => {
  try {
    const topTens = await TopTenMovie.find();
    res.json(topTens);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ one by id
router.get("/:id", async (req, res) => {
  try {
    const topTen = await TopTenMovie.findOne({ id: parseInt(req.params.id) });
    if (!topTen) return res.status(404).json({ error: "Top Ten Movie not found" });
    res.json(topTen);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await TopTenMovie.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Top Ten Movie not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await TopTenMovie.findOneAndDelete({ id: parseInt(req.params.id) });
    if (!deleted) return res.status(404).json({ error: "Top Ten Movie not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
