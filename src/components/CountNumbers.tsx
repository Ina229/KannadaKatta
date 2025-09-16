import React, { useState } from 'react';
import { Hash, ArrowRight } from 'lucide-react';
import SpeechPracticeModule from './SpeechPracticeModule';

interface NumberData {
  english: string;
  kannada: string;
  audio_file: string;
}

interface CountNumbersProps {
  numbers: NumberData[];
  onComplete: () => void;
}

export default function CountNumbers({ numbers, onComplete }: CountNumbersProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentNumber = numbers[currentIndex];

  const handlePronunciationSuccess = () => {
    console.log('Pronunciation success for number:', currentNumber.kannada);
    // Add visual feedback or other success handling here
  };

  const handleNext = () => {
    if (currentIndex < numbers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // All numbers completed
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="magical-card rounded-3xl shadow-2xl p-8 max-w-4xl w-full text-center animate-glow">
        <h2 className="text-3xl font-bold gradient-text mb-6 flex items-center justify-center">
          <Hash className="h-10 w-10 mr-2 text-indigo-500 animate-sparkle" />
          Learn Numbers
        </h2>
        
        {/* Progress Indicator */}
        <div className="text-lg font-semibold text-gray-700 mb-4">
          Number {currentIndex + 1} of {numbers.length}
        </div>
        
        {/* Number Display */}
        <div className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 rounded-2xl p-8 mb-8 shadow-lg animate-glow">
          <div className="text-xl font-semibold text-gray-800 mb-4">
            Learn this number:
          </div>
          
          {/* English Number */}
          <div className="text-4xl font-bold text-gray-700 mb-4 capitalize">
            {currentNumber.english}
          </div>
          
          {/* Kannada Number */}
          <div className="text-3xl sm:text-5xl md:text-7xl font-bold py-4 px-4 sm:py-6 sm:px-8 md:py-8 md:px-12 rounded-2xl bg-gradient-to-br from-orange-300 to-yellow-300 text-orange-800 shadow-lg mb-6">
            {currentNumber.kannada}
          </div>
        </div>
        
        {/* Speech Practice Module */}
        <SpeechPracticeModule
          item={currentNumber}
          type="numbers"
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
            disabled={currentIndex === numbers.length - 1}
            className={`rounded-full font-bold shadow-lg transition-all duration-300 ${
              currentIndex === numbers.length - 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed px-4 py-2'
                : 'bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 text-white px-6 py-3 shadow-xl hover:shadow-2xl hover:scale-105 animate-glow'
            }`}
          >
            {currentIndex === numbers.length - 1 ? 'Complete' : 'Next'} 
            <ArrowRight className="inline-block ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}