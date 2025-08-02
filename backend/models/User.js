/**
 * @file        User.js
 * @description Defines the schema for users in the application.
 */


const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema (
    {
        name: { type: String, required: true}, 
        email: { type: String, required: true, unique: true}, 
        password: { type: String, required: true},         
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);