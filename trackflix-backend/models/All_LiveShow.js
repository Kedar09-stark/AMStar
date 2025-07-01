const mongoose = require('mongoose');

const livedSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  overview: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  status: { type: String, required: true }, // e.g., "Running", "Ended"
  rating: { type: Number, required: true },
  genres: { type: [String], required: true },
  episodeRuntime: {
    type: [Number],  // <-- array of numbers
    required: true
  }, // in minutes
  seasons: { type: Number, required: true },
  episodes: { type: Number, required: true },
  language: {
    type: [String],  // <-- array of strings
    required: true
  },
  country: { type: String, required: true },
  networks: { type: [String], required: true },
  creators: { type: [String], required: true },
  cast: { type: [String], required: true },
  trailer: { type: String, required: true },
  image: { type: String, required: true },
  awards: { type: [String], default: [] }
});

// Format releaseDate as "YYYY-MM-DD" in JSON output
livedSchema.set('toJSON', {
  transform: (doc, ret) => {
    if (ret.releaseDate) {
      ret.releaseDate = ret.releaseDate.toISOString().split('T')[0];
    }
    return ret;
  }
});

const All_LiveShow = mongoose.model('All_LiveShow', livedSchema, 'liveshows');

module.exports = All_LiveShow;
