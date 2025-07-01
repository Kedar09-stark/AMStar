const express = require("express");
const router = express.Router();
const LiveTVShow = require("../models/All_LiveTVShow");

// CREATE
router.post("/", async (req, res) => {
  try {
    const newShow = new LiveTVShow(req.body);
    await newShow.save();
    res.status(201).json(newShow);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all
router.get("/", async (req, res) => {
  try {
    const shows = await LiveTVShow.find();
    res.json(shows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ one by id
router.get("/:id", async (req, res) => {
  try {
    const show = await LiveTVShow.findOne({ id: parseInt(req.params.id) });
    if (!show) return res.status(404).json({ error: "Live TV Show not found" });
    res.json(show);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await LiveTVShow.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Live TV Show not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await LiveTVShow.findOneAndDelete({ id: parseInt(req.params.id) });
    if (!deleted) return res.status(404).json({ error: "Live TV Show not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
