const mongoose = require('mongoose');

const fullMovieSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  rating: { type: Number, required: true },
  genres: { type: [String], required: true },
  releaseDate: { type: Date, required: true },
  trailer: { type: String, required: true },
  image: { type: String, required: true }
});

// Add transform to format releaseDate as "YYYY-MM-DD" in JSON output
fullMovieSchema.set('toJSON', {
  transform: (doc, ret) => {
    if (ret.releaseDate) {
      ret.releaseDate = ret.releaseDate.toISOString().split('T')[0];
    }
    return ret;
  }
});

const All_FullMovies = mongoose.model('All_FullMovies', fullMovieSchema, 'fullmovies');

module.exports = All_FullMovies;
