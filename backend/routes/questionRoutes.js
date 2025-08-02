/**
 * @file        questionRoutes.js
 * @description Defines routes for managing individual interview questions.
 */ 


const express = require('express');
const { addQuestionsToSession, deleteQuestionById } = require('../controllers/questionController');
const { protect } = require('../middlewares/authMiddleware');


const router = express.Router();

router.post('/add', protect, addQuestionsToSession);
router.delete('/:id', protect, deleteQuestionById);
/*router.post('/:id/pin', protect, togglePinQuestion);*/
/*router.post('/:id/note', protect, updateQuestionNote);*/


module.exports = router;