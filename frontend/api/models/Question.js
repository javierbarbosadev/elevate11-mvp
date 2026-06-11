const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  subject: {
    type: String,
    enum: ['Maths', 'Verbal', 'Non-Verbal'],
    required: true
  },
  questionText: {
    type: String,
    required: true
  },
  mediaUrl: {
    type: String,
    default: null // Used for Non-Verbal SVGs or Math diagrams
  },
  inputType: {
    type: String,
    enum: ['multiple-choice', 'text-input'],
    required: true
  },
  options: [{
    id: String,
    text: String,
    mediaUrl: String
  }],
  correctAnswer: {
    type: String, // Matches option id or exact string for text-input
    required: true
  },
  tutorExplanation: {
    text: { type: String, required: true },
    audioUrl: { type: String, default: null },
    videoUrl: { type: String, default: null }
  }
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);