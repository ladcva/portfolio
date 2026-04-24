const mongoose = require("mongoose");
const env = require("../config/env");

async function connectDatabase() {
  if (!env.mongoUri) {
    console.warn("MONGODB_URI is not configured. API will run without database connectivity.");
    return null;
  }

  mongoose.set("strictQuery", true);
  mongoose.set("bufferCommands", false);
  await mongoose.connect(env.mongoUri, {
    serverSelectionTimeoutMS: 5000,
  });
  console.log("MongoDB connection successful");
  return mongoose.connection;
}

module.exports = connectDatabase;
