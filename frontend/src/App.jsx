import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import TutorModal from './components/TutorModal';
import BadgeBook from './components/BadgeBook';

function App() {
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'practice', 'trophies'
  const [isTutorModalOpen, setIsTutorModalOpen] = useState(false);

  // Mock data for MVP testing without a backend connected yet
  const mockQuestion = {
    inputType: 'multiple-choice',
    questionText: "If 3 apples cost 90p, how much does 1 apple cost?",
    options: [
      { id: 'A', text: '20p' },
      { id: 'B', text: '30p' },
      { id: 'C', text: '40p' }
    ]
  };

  const handleAnswerSubmit = (answer) => {
    // Hardcoded logic for testing: B is correct
    if (answer === 'B') {
      alert("Correct! Great job!");
      setCurrentView('trophies'); // Move to trophies to see rewards
    } else {
      setIsTutorModalOpen(true); // Open tutor modal on incorrect
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 font-sans text-gray-800">
      {/* Simple Navigation */}
      <nav className="p-4 flex justify-between items-center bg-white shadow-sm mb-8">
        <h1 className="text-2xl font-bold font-comic text-indigo-600">Elevate11</h1>
        <div className="space-x-4">
          <button onClick={() => setCurrentView('dashboard')} className="font-semibold text-gray-600 hover:text-indigo-600">Home</button>
          <button onClick={() => setCurrentView('trophies')} className="font-semibold text-gray-600 hover:text-indigo-600">My Trophies</button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="px-4">
        {currentView === 'dashboard' && (
          <div className="max-w-4xl mx-auto text-center mt-20">
            <h2 className="text-5xl font-comic font-bold mb-8 text-indigo-700">What are we learning today?</h2>
            <div className="flex justify-center gap-6">
              {['Maths', 'Verbal', 'Non-Verbal'].map(subject => (
                <button 
                  key={subject}
                  onClick={() => setCurrentView('practice')}
                  className="px-8 py-6 bg-white rounded-3xl shadow-lg border-4 border-transparent hover:border-indigo-400 hover:scale-105 transition-all text-2xl font-bold"
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentView === 'practice' && (
          <QuestionCard question={mockQuestion} onSubmit={handleAnswerSubmit} />
        )}

        {currentView === 'trophies' && (
          <BadgeBook 
            allAvailableBadges={[{ id: 'math-1', name: 'Maths Starter', iconUrl: '⭐' }]} 
            unlockedBadges={[{ badgeId: 'math-1', name: 'Maths Starter' }]} 
          />
        )}
      </main>

      {/* Global Modals */}
      <TutorModal 
        isOpen={isTutorModalOpen} 
        onClose={() => setIsTutorModalOpen(false)} 
        explanation={{ text: "Let's think about division! If 3 apples are 90p, we need to share that 90p equally between the 3 apples. 90 divided by 3 is..." }}
      />
    </div>
  );
}

export default App;