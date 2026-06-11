const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  parentEmail: {
    type: String,
    required: true,
    unique: true
  },
  childName: {
    type: String,
    required: true
  },
  currentSubject: {
    type: String,
    default: 'Maths'
  },
  progress: {
    mathsScore: { type: Number, default: 0 },
    verbalScore: { type: Number, default: 0 },
    nonVerbalScore: { type: Number, default: 0 }
  },
  unlockedBadges: [{
    badgeId: String,
    name: String,
    unlockedAt: { type: Date, default: Date.now },
    iconUrl: String
  }],
  incorrectAnswers: [{
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    date: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('UserProfile', userProfileSchema);