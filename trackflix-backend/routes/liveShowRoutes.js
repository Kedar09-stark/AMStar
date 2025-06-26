const express = require("express");
const router = express.Router();
const LiveShow = require("../models/All_LiveShow");

router.get("/", async (req, res) => {
  try {
    const data = await LiveShow.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const show = await LiveShow.findOne({ id: parseInt(req.params.id) });
    if (!show) return res.status(404).json({ error: "Live show not found" });
    res.json(show);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newShow = new LiveShow(req.body);
    await newShow.save();
    res.status(201).json(newShow);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await LiveShow.findOneAndUpdate({ id: parseInt(req.params.id) }, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Live show not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await LiveShow.findOneAndDelete({ id: parseInt(req.params.id) });
    if (!deleted) return res.status(404).json({ error: "Live show not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
