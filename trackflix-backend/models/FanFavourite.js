const mongoose = require('mongoose');

const fanFavouriteSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  img: { type: String, required: true },
  rating: { type: Number, required: true },
  genres: { type: [String], required: true },
  trailerLink: { type: String, required: true }
});
const FanFavourite = mongoose.model('FanFavourite', fanFavouriteSchema, 'fanFavourites');


module.exports = FanFavourite;
