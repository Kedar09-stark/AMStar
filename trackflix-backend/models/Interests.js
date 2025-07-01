const mongoose = require('mongoose');

const interestSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  img: { type: String, required: true },
  rating: { type: Number, required: true },
  genres: { type: [String], required: true },
  trailerLink: { type: String, required: true }
});

const Interests = mongoose.model('Interest', interestSchema,'interest');

module.exports = Interests;
