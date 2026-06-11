import React from 'react';
import { motion } from 'framer-motion';

export default function BadgeBook({ allAvailableBadges, unlockedBadges }) {
  // Check if a badge is unlocked by comparing IDs
  const isUnlocked = (badgeId) => unlockedBadges.some(b => b.badgeId === badgeId);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-5xl font-bold text-center text-indigo-600 mb-12 font-comic drop-shadow-sm">
        🏆 My Trophies 🏆
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {allAvailableBadges.map((badge) => {
          const unlocked = isUnlocked(badge.id);

          return (
            <motion.div
              key={badge.id}
              whileHover={unlocked ? { scale: 1.1, rotate: 5 } : {}}
              className="flex flex-col items-center group cursor-default"
            >
              <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                unlocked ? 'bg-gradient-to-tr from-yellow-300 to-yellow-500 shadow-xl' : 'bg-gray-200 shadow-inner'
              }`}>
                <img 
                  src={badge.iconUrl} 
                  alt={badge.name}
                  className={`w-20 h-20 transition-all ${unlocked ? 'opacity-100 drop-shadow-md' : 'opacity-20 grayscale'}`}
                />
              </div>
              
              <h3 className={`text-center font-bold text-lg ${unlocked ? 'text-gray-800' : 'text-gray-400'}`}>
                {unlocked ? badge.name : '???'}
              </h3>
              
              {unlocked && (
                <span className="text-xs text-indigo-500 font-semibold mt-1">
                  Unlocked!
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}