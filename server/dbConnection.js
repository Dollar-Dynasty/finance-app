const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
      await mongoose.connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zxm8btb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
        );
      console.log('MongoDB Connected: ' + mongoose.connection.host);
    } catch (err) {
      console.error('MongoDB Connection Error: ' + err.message);
      console.error(err.stack);
      process.exit(1);
    }
  };
  
  connectDB();

  module.exports = connectDB;