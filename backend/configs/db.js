const dotenv = require("dotenv");
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_PORT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connection SUCCESS");
  } catch (error) {
    console.log(error);
    console.log(process.env.MONGODB_PORT)
    console.error("MongoDB connection FAIL");
    process.exit(1);
  }
};
module.exports = connectDB;