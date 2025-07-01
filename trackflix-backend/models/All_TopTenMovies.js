const mongoose = require('mongoose');

const top10MovieSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  img: { type: String, required: true },
  rank: { type: Number, required: true },
  rating: { type: Number, required: true },
  year: { type: Number, required: true },
  trailer: { type: String, required: true }
});

const All_TopTenMovies = mongoose.model('	All_TopTenMovies', top10MovieSchema,'toptenmovies');

module.exports = All_TopTenMovies;
