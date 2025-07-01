const fs = require('fs');
const path = require('path');
const connectDB = require('./config/db');


// Import your models
const Celebrity = require('./models/Celebrity');
const FanFavourite = require('./models/FanFavourite');
const FeaturedItem = require('./models/FeaturedItems');
const FtRecommendations = require('./models/All_FtRecommendations');
const All_FullMovies = require('./models/All_FullMovies');
const All_FullMovieDetail = require('./models/All_FullMovieDetails');
const Interest = require('./models/Interests');
const All_LiveShow = require('./models/All_LiveShow');
const All_LiveTVShow = require('./models/All_LiveTVShow');
const RecommendationCelebritiesMore = require('./models/RecommendationCelebritiesMore');
const All_TopTenMovies = require('./models/All_TopTenMovies');

const collections = [
  { model: Celebrity, file: 'Celebrities.json' },
  { model: FanFavourite, file: 'fanFavourites.json' },
  { model: FeaturedItem, file: 'featuredItem.json' },
  { model: FtRecommendations, file: 'ftrecommendations.json' },
  { model: All_FullMovies, file: 'fullmovies.json' },
  { model: All_FullMovieDetail, file: 'fullmoviesDetails.json' },
  { model: Interest, file: 'interest.json' },
  { model: All_LiveShow, file: 'lived.json' },
  { model: All_LiveTVShow, file: 'tvshow.json' },
  { model: RecommendationCelebritiesMore, file: 'recomendationcelebrities.json' },
  { model: All_TopTenMovies, file: 'top10Movies.json' },
];

async function importAll() {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('Connected to MongoDB!');

    for (const { model, file } of collections) {
      console.log(`\nStarting import for: ${file}`);

      const filePath = path.join(__dirname, 'data', file);

      if (!fs.existsSync(filePath)) {
        console.warn(`Warning: File not found: ${file}, skipping this collection.`);
        continue;
      }

      const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      console.log(`Clearing existing data in collection: ${model.collection.name}`);
      await model.deleteMany({});

      if (Array.isArray(jsonData)) {
        await model.insertMany(jsonData);
        console.log(`Inserted ${jsonData.length} documents into ${model.collection.name}`);
      } else {
        await model.create(jsonData);
        console.log(`Inserted 1 document into ${model.collection.name}`);
      }
    }

    console.log('\nAll collections imported successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error during import:', err);
    process.exit(1);
  }
}

importAll();
