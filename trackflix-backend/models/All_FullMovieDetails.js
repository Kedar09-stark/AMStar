const mongoose = require('mongoose');

const awardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  result: { type: String, required: true },
  year: { type: Number, required: true }
});

const fullMovieDetailSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  overview: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  rating: { type: Number, required: true },
  genres: { type: [String], required: true },
  runtime: { type: Number, required: true },
  language: { type: String, required: true },
  country: { type: String, required: true },
  budget: { type: Number, required: true },
  boxOffice: { type: Number, required: true },
  productionCompanies: { type: [String], required: true },
  ageRating: { type: String, required: true },
  director: { type: [String], required: true },
  writers: { type: [String], required: true },
  cast: { type: [String], required: true },
  trailer: { type: String, required: true },
  image: { type: String, required: true },
  awards: { type: [awardSchema], default: [] },
  similarMovies: { type: [Number], default: [] }
});

fullMovieDetailSchema.set('toJSON', {
  transform: (doc, ret) => {
    if (ret.releaseDate) {
      ret.releaseDate = ret.releaseDate.toISOString().split('T')[0];
    }
    return ret;
  }
});

const All_FullMovieDetails = mongoose.model('All_FullMovieDetails', fullMovieDetailSchema, 'fullmoviedetails');

module.exports = All_FullMovieDetails;
