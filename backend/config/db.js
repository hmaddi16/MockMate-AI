/**
 * @file        db.js
 * @description Handles MongoDB connection using Mongoose. Invoked at server startup.
 *
 * @notes       Uses environment variable MONGO_URI from .env for secure connection string.
 */


const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log("MongoDB Connected!");
    }
    catch (err) {
        console.error("Error connecting to MongoDB", err);
        process.exit(1);
    }
};

module.exports = connectDB;