import React, { useState } from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';
import SpeechPracticeModule from './SpeechPracticeModule';

interface LearnLetterProps {
  letter: string;
  englishTranslation: string;
  audioFile: string;
  currentIndex: number;
  totalLetters: number;
  onNavigate: (direction: 'next' | 'previous') => void;
}

const LearnLetter: React.FC<LearnLetterProps> = ({
  letter,
  englishTranslation,
  audioFile,
  currentIndex,
  totalLetters,
  onNavigate,
}) => {
  const handlePronunciationSuccess = () => {
    console.log('Pronunciation success for letter:', letter);
    // Add visual feedback or other success handling here
  };

  const handleNext = () => {
    onNavigate('next');
  };

  const handlePrevious = () => {
    onNavigate('previous');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="magical-card rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center animate-glow">
        <h2 className="text-3xl font-bold gradient-text mb-6 flex items-center justify-center">
          <BookOpen className="h-10 w-10 mr-2 text-blue-500 animate-sparkle" />
          Learn Letter
        </h2>
        
        {/* Progress Indicator */}
        <div className="text-lg font-semibold text-gray-700 mb-4">
          Letter {currentIndex + 1} of {totalLetters}
        </div>
        
        {/* Instruction */}
        <div className="text-lg font-semibold text-gray-700 mb-4">
          Tap the letter to hear its sound!
        </div>
        
        {/* Letter Display */}
        <div className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-2xl p-8 mb-8 shadow-lg animate-glow">
          <div className="text-xl font-semibold text-gray-800 mb-4">
            Learn this beautiful letter:
          </div>
          
          <div className="text-8xl font-bold py-8 px-12 rounded-2xl shadow-xl mb-6 bg-gradient-to-br from-orange-300 to-yellow-300 text-orange-800 shadow-lg">
            {letter}
          </div>
          
          <div className="text-2xl font-bold text-gray-700 mb-4">
            ({englishTranslation})
          </div>
        </div>
        
        {/* Speech Practice Module */}
        <SpeechPracticeModule
          item={{
            english: englishTranslation,
            kannada: letter,
            audio_file: audioFile
          }}
          type="letters"
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
            disabled={currentIndex === totalLetters - 1}
            className={`rounded-full font-bold shadow-lg transition-all duration-300 ${
              currentIndex === totalLetters - 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed px-4 py-2'
                : 'bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 text-white px-6 py-3 shadow-xl hover:shadow-2xl hover:scale-105 animate-glow'
            }`}
          >
            {currentIndex === totalLetters - 1 ? 'Complete' : 'Next'} 
            <ArrowRight className="inline-block ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearnLetter;