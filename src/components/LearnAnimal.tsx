import React, { useState } from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import SpeechPracticeModule from './SpeechPracticeModule';

interface LearnAnimalProps {
  animal: string;
  englishTranslation: string;
  audioFile: string;
  currentIndex: number;
  totalAnimals: number;
  onNavigate: (direction: 'next' | 'previous') => void;
}

const LearnAnimal: React.FC<LearnAnimalProps> = ({
  animal,
  englishTranslation,
  audioFile,
  currentIndex,
  totalAnimals,
  onNavigate,
}) => {
  const handlePronunciationSuccess = () => {
    console.log('Pronunciation success for animal:', animal);
    // Add visual feedback or other success handling here
  };

  const handleNext = () => {
    onNavigate('next');
  };

  const handlePrevious = () => {
    onNavigate('previous');
  };

  // Get appropriate emoji for different animals
  const getAnimalEmoji = (english: string): string => {
    const emojiMap: { [key: string]: string } = {
      'dog': '🐕',
      'cat': '🐱',
      'cow': '🐄',
      'tiger': '🐅',
      'elephant': '🐘',
      'horse': '🐎',
      'bird': '🐦',
      'fish': '🐟',
      'monkey': '🐒',
      'rabbit': '🐰',
      'goat': '🐐',
      'buffalo': '🐃',
      'lion': '🦁',
      'bear': '🐻',
      'deer': '🦌',
    };
    return emojiMap[english.toLowerCase()] || '🐾';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="magical-card rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center animate-glow">
        <h2 className="text-3xl font-bold gradient-text mb-6 flex items-center justify-center">
          <Heart className="h-10 w-10 mr-2 text-pink-500 animate-sparkle" />
          Learn Animals
        </h2>
        
        {/* Progress Indicator */}
        <div className="text-lg font-semibold text-gray-700 mb-4">
          Animal {currentIndex + 1} of {totalAnimals}
        </div>
        
        {/* Instruction */}
        <div className="text-lg font-semibold text-gray-700 mb-4">
          Tap the animal to hear its name!
        </div>
        
        {/* Animal Display */}
        <div className="bg-gradient-to-r from-orange-200 via-yellow-200 to-red-200 rounded-2xl p-8 mb-8 shadow-lg animate-glow">
          <div className="text-xl font-semibold text-gray-800 mb-4">
            Learn this amazing animal:
          </div>
          
          {/* Animal Emoji */}
          <div className="text-8xl mb-6 animate-bounce-gentle">
            {getAnimalEmoji(englishTranslation)}
          </div>
          
          {/* English Animal Name */}
          <div className="text-2xl font-bold text-gray-700 mb-6 capitalize">
            {englishTranslation}
          </div>
          
          {/* Kannada Animal Name */}
          <div className="text-4xl sm:text-6xl font-bold py-6 px-8 sm:py-8 sm:px-12 rounded-2xl shadow-xl mb-6 bg-gradient-to-br from-orange-300 to-red-300 text-orange-800 shadow-lg">
            {animal}
          </div>
        </div>
        
        {/* Speech Practice Module */}
        <SpeechPracticeModule
          item={{
            english: englishTranslation,
            kannada: animal,
            audio_file: audioFile
          }}
          type="animals"
          onPronunciationSuccess={handlePronunciationSuccess}
        />
        
        {/* Navigation Controls */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`px-4 py-2 rounded-full font-bold shadow-lg transition-all duration-300 ${
              currentIndex === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:scale-105 animate-glow'
            }`}
          >
            ← Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={currentIndex === totalAnimals - 1}
            className={`rounded-full font-bold shadow-lg transition-all duration-300 ${
              currentIndex === totalAnimals - 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed px-4 py-2'
                : 'bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 text-white px-6 py-3 shadow-xl hover:shadow-2xl hover:scale-105 animate-glow'
            }`}
          >
            {currentIndex === totalAnimals - 1 ? 'Complete' : 'Next'} 
            <ArrowRight className="inline-block ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearnAnimal;