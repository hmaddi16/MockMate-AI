/**
 * @file        questionController.js
 * @description Manages operations for individual questions.
 *
 * @notes       Handles adding AI-generated questions to a session and deleting questions.
 *              Routes: POST /api/questions/add-to-session, DELETE /api/questions/:id
 */


const Question = require("../models/Question");
const Session = require("../models/Session");



// @desc        Add additional questions to an existing session
// @route       POST /api/questions/add
// @access      Private
exports.addQuestionsToSession = async (req, res) => {
    try {
        const { sessionId, questions } = req.body;

        if (!sessionId || !questions || !Array.isArray(questions)) {
            return res.status(400).json({ message: "Invalid Input Data" });
        }

        const session = await Session.findById(sessionId);

        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        // Create new questions 
        const createdQuestions = await Question.insertMany(
            questions.map((q) => ({
                session: sessionId, 
                question: q.question,
                answer: q.answer,
            }))
        );

        // Update session to include new question IDs
        session.questions.push(...createdQuestions.map((q) => q._id));
        await session.save();

        res.status(201).json(createdQuestions);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error "});
    }
}



// @desc        Delete a question by ID
// @route       DELETE /api/questions/:id
// @access      Private
exports.deleteQuestionById = async (req, res) => {
    try {
        const { id } = req.params;

        const question = await Question.findById(id);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        // Remove from session.questions array
        await Session.updateOne(
            { _id: question.session },
            { $pull: { questions: id } }
        );

        await question.deleteOne();
        res.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};




/* @desc        Update a note for a question
// @route       POST /api/questions/:id/note
// @access      Private
exports.updateQuestionNote = async (req, res) => {
    try {
        const { note } = req.body;
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res
                .status(404)
                .json({ success: false, message: "Question not found." });
        }

        question.note = note || "";
        await question.save();

        res.status(200).json({ success: true, question });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error "});
    }
} */



/* @desc        Pin or unpin a question
// @route       POST /api/questions/:id/pin
// @access      Private
exports.togglePinQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res
                .status(404)
                .json({ success: false, message: "Question not found" });
        }

        question.isPinned = !question.isPinned;
        await question.save();

        res.status(200).json({ success: true, question });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error "});
    }
} */