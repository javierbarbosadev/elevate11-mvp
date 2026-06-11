const Question = require('../models/Question');
const UserProfile = require('../models/UserProfile');

// Fetch a set of practice questions filtered by subject
exports.getQuestions = async (req, res) => {
  try {
    const { subject } = req.params;
    const questions = await Question.find({ subject }).limit(10);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
};

// Submit an answer, verify correctness, and update progress/badges
exports.submitAnswer = async (req, res) => {
  try {
    const { userId, questionId, studentAnswer, subject } = req.body;
    
    const question = await Question.findById(questionId);
    const isCorrect = question.correctAnswer.toLowerCase() === studentAnswer.toLowerCase();
    
    const user = await UserProfile.findById(userId);
    let newBadgeUnlocked = null;

    if (isCorrect) {
      // Increment score based on subject
      const scoreKey = `${subject.toLowerCase()}Score`;
      user.progress[scoreKey] += 1;

      // Simple Badge Logic Example: 10 correct answers in Maths
      if (subject === 'Maths' && user.progress.mathsScore === 10) {
        newBadgeUnlocked = {
          badgeId: 'math-wizard-01',
          name: 'Maths Marathoner',
          iconUrl: '/assets/badges/math-wizard.svg'
        };
        user.unlockedBadges.push(newBadgeUnlocked);
      }
    } else {
      // Log incorrect answer for future Spaced Repetition (Phase 2)
      user.incorrectAnswers.push({ questionId: question._id });
    }

    await user.save();

    res.status(200).json({
      isCorrect,
      tutorExplanation: isCorrect ? null : question.tutorExplanation,
      newBadge: newBadgeUnlocked
    });

  } catch (error) {
    res.status(500).json({ error: 'Failed to process answer' });
  }
};