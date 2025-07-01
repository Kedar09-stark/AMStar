const mongoose = require('mongoose');

const tvShowSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  rating: { type: Number, required: true },
  genres: { type: [String], required: true },
  releaseDate: { type: Date, required: true },
  trailer: { type: String, required: true },
  image: { type: String, required: true }
});

// Add transform to format releaseDate as "YYYY-MM-DD" in JSON output
tvShowSchema.set('toJSON', {
  transform: (doc, ret) => {
    if (ret.releaseDate) {
      ret.releaseDate = ret.releaseDate.toISOString().split('T')[0];
    }
    return ret;
  }
});

const All_LiveTVShow = mongoose.model('All_LiveTVShow', tvShowSchema, 'livetvshows');

module.exports = All_LiveTVShow;
