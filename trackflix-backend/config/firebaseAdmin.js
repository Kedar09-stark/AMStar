//const admin = require("firebase-admin");
//const path = require("path");

// Path to your Firebase service account JSON file
//const serviceAccountPath = path.join(__dirname, "..", "serviceAccountKey.json");

//const serviceAccount = require(serviceAccountPath);

//admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
//});

//module.exports = admin;

const admin = require("firebase-admin");

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  serviceAccount = require("../serviceAccountKey.json");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;

