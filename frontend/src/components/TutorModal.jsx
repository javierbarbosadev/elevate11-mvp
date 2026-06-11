import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TutorModal({ isOpen, explanation, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Darkened Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          
          {/* Modal Content Sliding in from the Right */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.3 }}
            className="fixed top-10 right-10 bottom-10 w-96 bg-white rounded-3xl shadow-2xl z-50 p-6 flex flex-col"
          >
            {/* Tutor Avatar */}
            <img 
              src="/assets/tutor-avatar.svg" 
              alt="Friendly Tutor" 
              className="w-32 h-32 rounded-full mx-auto border-4 border-indigo-400 mb-4 bg-indigo-50"
            />
            
            <div className="bg-indigo-50 rounded-2xl p-6 relative flex-grow">
              {/* Speech bubble pointer */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-indigo-50"></div>
              
              <h3 className="text-xl font-bold text-indigo-800 mb-2 font-comic">Let's look at this together!</h3>
              <p className="text-lg text-gray-700 leading-relaxed font-comic">
                {explanation.text}
              </p>

              {/* Mock Audio Button for MVP */}
              {explanation.audioUrl && (
                <button className="mt-6 flex items-center justify-center w-full bg-indigo-200 text-indigo-800 py-3 rounded-xl hover:bg-indigo-300 transition-colors font-bold">
                  <span className="mr-2">🔊</span> Play Explanation
                </button>
              )}
            </div>

            <button 
              onClick={onClose}
              className="mt-6 w-full py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xl rounded-xl shadow-md transition-colors"
            >
              Got It!
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}