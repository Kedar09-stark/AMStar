const mongoose = require('mongoose');

const featuredItemSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  img: { type: String, required: true },
  rating: { type: Number, required: true },
  genres: { type: [String], required: true },
  trailerLink: { type: String, required: true }
});

// Model name: 'FeaturedItem'
// Collection name: explicitly set to 'featuredItem' or 'featuredItems'
const FeaturedItems = mongoose.model('FeaturedItems', featuredItemSchema, 'featuredItem');

module.exports = FeaturedItems;
