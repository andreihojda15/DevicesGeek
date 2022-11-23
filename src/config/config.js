const mongoose = require("mongoose");

exports.config = {
  key: "45b954b3d2e8633fa3d0b3cfe6fc37c92deeb69309db6ebab310d50e19429a72",
  mongoURI: "mongodb://localhost:27017/device-shop",
  origin: "http://localhost:4000",
};

exports.connect = async () => {
  await mongoose.connect(this.config.mongoURI);
};
