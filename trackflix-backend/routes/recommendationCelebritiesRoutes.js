const express = require("express");
const router = express.Router();
const RecommendationCelebrities = require("../models/RecommendationCelebritiesMore");

// CREATE
router.post("/", async (req, res) => {
  try {
    const newRecCeleb = new RecommendationCelebrities(req.body);
    await newRecCeleb.save();
    res.status(201).json(newRecCeleb);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all
router.get("/", async (req, res) => {
  try {
    const recCelebs = await RecommendationCelebrities.find();
    res.json(recCelebs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ one by id
router.get("/:id", async (req, res) => {
  try {
    const recCeleb = await RecommendationCelebrities.findOne({ id: parseInt(req.params.id) });
    if (!recCeleb) return res.status(404).json({ error: "Recommendation Celebrity not found" });
    res.json(recCeleb);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await RecommendationCelebrities.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Recommendation Celebrity not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await RecommendationCelebrities.findOneAndDelete({ id: parseInt(req.params.id) });
    if (!deleted) return res.status(404).json({ error: "Recommendation Celebrity not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
