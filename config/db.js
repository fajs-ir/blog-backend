const dotenv = require('dotenv'),
  mongoose = require("mongoose"),
  server = require('../helper/language/server.json');

dotenv.config();

const db = process.env.MONGOURL;
const connectDb = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(server.success.mongodbConnected);
  } catch (err) {
    console.error(server.error.mongodbConnectionError);
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDb;