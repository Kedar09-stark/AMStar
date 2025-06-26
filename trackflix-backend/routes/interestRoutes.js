const express = require("express");
const router = express.Router();
const Interest = require("../models/Interests");

router.get("/", async (req, res) => {
  try {
    const data = await Interest.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await Interest.findOne({ id: parseInt(req.params.id) });
    if (!item) return res.status(404).json({ error: "Interest not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newItem = new Interest(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Interest.findOneAndUpdate({ id: parseInt(req.params.id) }, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Interest not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Interest.findOneAndDelete({ id: parseInt(req.params.id) });
    if (!deleted) return res.status(404).json({ error: "Interest not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
