const express = require("express");
const router = express.Router();
const admin = require("../config/firebaseAdmin"); // adjust path if needed

// GET /api/users - list Firebase users
router.get("/", async (req, res) => {
  try {
    const listUsersResult = await admin.auth().listUsers(1000);
    const users = listUsersResult.users.map(user => ({
      uid: user.uid,
      email: user.email,
      name: user.displayName || "",
    }));
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;
