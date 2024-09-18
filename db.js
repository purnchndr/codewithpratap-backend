const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('DB Connected');
  } catch (e) {
    console.log('DB Connection Error', e.message);
  }
}

module.exports = connectDB;
