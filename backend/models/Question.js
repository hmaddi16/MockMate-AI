/**
 * @file        Question.js
 * @description Defines the schema for interview questions and answers.
 */


const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema (
    {
        session: { type: mongoose.Schema.Types.ObjectId, ref: "Session"},
        question: String,
        answer: String, 
        note: String, 
    },
    { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);