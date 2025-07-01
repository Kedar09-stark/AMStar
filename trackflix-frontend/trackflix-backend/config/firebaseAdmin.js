const admin = require("firebase-admin");
const path = require("path");

// Path to your Firebase service account JSON file
const serviceAccountPath = path.join(__dirname, "..", "serviceAccountKey.json");

const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
