const mongoose = require('mongoose');

const celebritySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  }
});

const Celebrity = mongoose.model('Celebrity', celebritySchema, 'celebrities');

module.exports = Celebrity;
