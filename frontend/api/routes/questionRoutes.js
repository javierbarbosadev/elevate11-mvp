const express = require('express');
const router = express.Router();
const { getQuestions, submitAnswer } = require('../controllers/questionController');

// Route to fetch questions by subject
router.get('/:subject', getQuestions);

// Route to submit an answer and evaluate
router.post('/submit', submitAnswer);

module.exports = router;