const mongoose = require("mongoose");
const config = require("config");
const DB = config.get("mongoUri");

const connectDB = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo db connected");
  } catch (error) {
    console.log(error.message);
    //Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
