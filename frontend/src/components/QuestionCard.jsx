import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function QuestionCard({ question, onSubmit }) {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSubmit = () => {
    const answer = question.inputType === 'text-input' ? inputValue : selectedOption;
    onSubmit(answer);
  };

  const isSubmitDisabled = question.inputType === 'text-input' 
    ? inputValue.trim() === '' 
    : selectedOption === null;

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 font-comic">
        {question.questionText}
      </h2>

      {question.mediaUrl && (
        <img src={question.mediaUrl} alt="Question visual" className="w-full h-64 object-contain mb-6" />
      )}

      {question.inputType === 'text-input' ? (
        <div className="flex justify-center mb-8">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="text-center text-4xl p-4 w-64 border-4 border-indigo-200 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-8 focus:ring-indigo-200 animate-pulse-light transition-all"
            placeholder="Type here..."
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 mb-8">
          {question.options.map((opt) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={opt.id}
              onClick={() => setSelectedOption(opt.id)}
              className={`p-6 text-2xl font-semibold rounded-2xl border-4 transition-colors ${
                selectedOption === opt.id 
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
            >
              {opt.text}
            </motion.button>
          ))}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
        className={`w-full py-4 text-2xl font-bold text-white rounded-2xl transition-all ${
          isSubmitDisabled 
            ? 'bg-gray-300 cursor-not-allowed' 
            : 'bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl'
        }`}
      >
        Submit Answer
      </button>
    </div>
  );
}