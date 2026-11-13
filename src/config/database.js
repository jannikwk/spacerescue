const mongoose = require('mongoose');

const mongoUri =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/spacerescueDB';

async function connectToDatabase() {
  await mongoose.connect(mongoUri);
  console.log('Connected to mongoDB');
}

module.exports = connectToDatabase;
