const mongoose = require('mongoose');

const ftRecommendationSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  img: { type: String, required: true },
  rating: { type: Number, required: true },
  genres: { type: [String], required: true },
  trailerLink: { type: String, required: true }
});

// Model name: 'FTrecommendation'
// Collection name: 'ftrecommendations' (third parameter forces this name)
const All_FtRecommendations = mongoose.model('All_FTrecommendation', ftRecommendationSchema, 'ftrecommendations');

module.exports = All_FtRecommendations;
