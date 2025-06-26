// routes/celebrityRoutes.js
const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity");

// CREATE - Add a new celebrity
router.post("/", async (req, res) => {
  try {
    const newCelebrity = new Celebrity(req.body);
    await newCelebrity.save();
    res.status(201).json(newCelebrity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all celebrities
router.get("/", async (req, res) => {
  try {
    const data = await Celebrity.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ one celebrity by id
router.get("/:id", async (req, res) => {
  try {
    const data = await Celebrity.findOne({ id: parseInt(req.params.id) });
    if (!data) return res.status(404).json({ error: "Not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a celebrity by id
router.put("/:id", async (req, res) => {
  try {
    const updated = await Celebrity.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a celebrity by id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Celebrity.findOneAndDelete({ id: parseInt(req.params.id) });
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
