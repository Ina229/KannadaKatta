import React, { useState } from 'react';
import { Palette, ArrowRight } from 'lucide-react';
import SpeechPracticeModule from './SpeechPracticeModule';

interface LearnColorProps {
  color: string;
  englishTranslation: string;
  audioFile: string;
  currentIndex: number;
  totalColors: number;
  onNavigate: (direction: 'next' | 'previous') => void;
}

const LearnColor: React.FC<LearnColorProps> = ({
  color,
  englishTranslation,
  audioFile,
  currentIndex,
  totalColors,
  onNavigate,
}) => {
  const handlePronunciationSuccess = () => {
    console.log('Pronunciation success for color:', color);
    // Add visual feedback or other success handling here
  };

  const handleNext = () => {
    onNavigate('next');
  };

  const handlePrevious = () => {
    onNavigate('previous');
  };

  // Get color value for visual display
  const getColorValue = (englishName: string): string => {
    const colorMap: { [key: string]: string } = {
      'red': '#ef4444',
      'blue': '#3b82f6',
      'green': '#22c55e',
      'yellow': '#eab308',
      'orange': '#f97316',
      'purple': '#a855f7',
      'pink': '#ec4899',
      'black': '#000000',
      'white': '#ffffff',
      'brown': '#a3a3a3',
      'gray': '#6b7280',
      'grey': '#6b7280',
    };
    return colorMap[englishName.toLowerCase()] || '#6b7280';
  };

  const colorValue = getColorValue(englishTranslation);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="magical-card rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center animate-glow">
        <h2 className="text-3xl font-bold gradient-text mb-6 flex items-center justify-center">
          <Palette className="h-10 w-10 mr-2 text-pink-500 animate-sparkle" />
          Learn Colors
        </h2>
        
        {/* Progress Indicator */}
        <div className="text-lg font-semibold text-gray-700 mb-4">
          Color {currentIndex + 1} of {totalColors}
        </div>
        
        {/* Instruction */}
        <div className="text-lg font-semibold text-gray-700 mb-4">
          Tap the color to hear its name!
        </div>
        
        {/* Color Display */}
        <div className="bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 rounded-2xl p-8 mb-8 shadow-lg animate-glow">
          <div className="text-xl font-semibold text-gray-800 mb-4">
            Learn this beautiful color:
          </div>
          
          {/* Color Circle */}
          <div className="flex justify-center mb-6">
            <div 
              className="w-32 h-32 rounded-full shadow-2xl border-4 border-white animate-bounce-gentle"
              style={{ backgroundColor: colorValue, boxShadow: `0 0 30px ${colorValue}40` }}
            ></div>
          </div>
          
          {/* Kannada Color Name */}
          <div className="text-6xl sm:text-8xl font-bold py-6 px-8 sm:py-8 sm:px-12 rounded-2xl shadow-xl mb-6 bg-gradient-to-br from-pink-300 to-purple-300 text-purple-800 shadow-lg">
            {color}
          </div>
          
          {/* English Translation */}
          <div className="text-2xl font-bold text-gray-700 mb-4 capitalize">
            ({englishTranslation})
          </div>
        </div>
        
        {/* Speech Practice Module */}
        <SpeechPracticeModule
          item={{
            english: englishTranslation,
            kannada: color,
            audio_file: audioFile
          }}
          type="colors"
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
            disabled={currentIndex === totalColors - 1}
            className={`rounded-full font-bold shadow-lg transition-all duration-300 ${
              currentIndex === totalColors - 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed px-4 py-2'
                : 'bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 text-white px-6 py-3 shadow-xl hover:shadow-2xl hover:scale-105 animate-glow'
            }`}
          >
            {currentIndex === totalColors - 1 ? 'Complete' : 'Next'} 
            <ArrowRight className="inline-block ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearnColor;