const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const URI = process.env.MONGO_URI || 'mongodb://localhost:27017/Our_web_trackflix';
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
