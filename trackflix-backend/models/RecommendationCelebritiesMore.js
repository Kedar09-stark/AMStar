const mongoose = require('mongoose');

const recommendationCelebritySchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  img: { type: String, required: true }
});

const RecommendationCelebritiesMore= mongoose.model('RecommendationCelebritiesMore', recommendationCelebritySchema,'recommendationcelebritiesmore');

module.exports = RecommendationCelebritiesMore;
