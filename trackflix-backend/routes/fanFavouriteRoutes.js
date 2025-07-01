const express = require("express");
const router = express.Router();
const FanFavourite = require("../models/FanFavourite");

// CREATE
router.post("/", async (req, res) => {
  try {
    const newItem = new FanFavourite(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all
router.get("/", async (req, res) => {
  try {
    const data = await FanFavourite.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ one by id
router.get("/:id", async (req, res) => {
  try {
    const data = await FanFavourite.findOne({ id: parseInt(req.params.id) });
    if (!data) return res.status(404).json({ error: "Not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await FanFavourite.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await FanFavourite.findOneAndDelete({ id: parseInt(req.params.id) });
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
