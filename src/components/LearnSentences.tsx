import React, { useState } from 'react';
import { Volume2, MessageSquare, ArrowRight } from 'lucide-react';
import SpeechPracticeModule from './SpeechPracticeModule';

interface SentenceData {
  english: string;
  kannada: string;
  audio_file: string;
}

interface LearnSentencesProps {
  sentences: SentenceData[];
  currentIndex: number;
  totalSentences: number;
  onNavigate: (direction: 'next' | 'previous') => void;
}

const LearnSentences: React.FC<LearnSentencesProps> = ({
  sentences,
  currentIndex,
  totalSentences,
  onNavigate,
}) => {
  const currentSentence = sentences[currentIndex];

  const handlePronunciationSuccess = () => {
    console.log('Pronunciation success for sentence:', currentSentence.kannada);
    // Add visual feedback or other success handling here
  };

  const handleNext = () => {
    onNavigate('next');
  };

  const handlePrevious = () => {
    onNavigate('previous');
  };

  // Get appropriate emoji for different sentence types
  const getSentenceEmoji = (english: string): string => {
    const emojiMap: { [key: string]: string } = {
      'What is your name?': '👤',
      'My name is...': '🙋',
      'Where are you going?': '🚶',
      'I am going to school': '🏫',
      'What time is it?': '⏰',
      'I am hungry': '🍽️',
      'I am thirsty': '🥤',
      'Where is the bathroom?': '🚻',
      'How much does this cost?': '💰',
      'I don\'t understand': '🤔',
      'Can you help me?': '🤝',
      'I need help': '🆘',
      'Where do you live?': '🏠',
      'I live in Bangalore': '🏙️',
      'See you later': '👋',
    };
    return emojiMap[english] || '💬';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="magical-card rounded-3xl shadow-2xl p-8 max-w-3xl w-full text-center animate-glow">
        <h2 className="text-3xl font-bold gradient-text mb-6 flex items-center justify-center">
          <MessageSquare className="h-10 w-10 mr-2 text-purple-500 animate-sparkle" />
          Learn Sentences
        </h2>
        
        {/* Progress Indicator */}
        <div className="text-lg font-semibold text-gray-700 mb-4">
          Sentence {currentIndex + 1} of {totalSentences}
        </div>
        
        {/* Instruction */}
        <div className="text-lg font-semibold text-gray-700 mb-4">
          Learn useful daily conversations!
        </div>
        
        {/* Sentence Display */}
        <div className="bg-gradient-to-r from-purple-200 via-pink-200 to-indigo-200 rounded-2xl p-8 mb-8 shadow-lg animate-glow">
          <div className="text-xl font-semibold text-gray-800 mb-4">
            Practice this useful sentence:
          </div>
          
          {/* Sentence Emoji */}
          <div className="text-6xl mb-6 animate-bounce-gentle">
            {getSentenceEmoji(currentSentence.english)}
          </div>
          
          {/* English Sentence */}
          <div className="text-xl md:text-2xl font-bold text-gray-700 mb-6 bg-white/50 rounded-xl p-4 shadow-md">
            "{currentSentence.english}"
          </div>
          
          {/* Kannada Sentence */}
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold py-6 px-8 sm:py-8 sm:px-12 rounded-2xl shadow-xl mb-6 bg-gradient-to-br from-purple-300 to-pink-300 text-purple-800">
            {currentSentence.kannada}
          </div>
        </div>
        
        {/* Speech Practice Module */}
        <SpeechPracticeModule
          item={currentSentence}
          type="sentences"
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
            disabled={currentIndex === totalSentences - 1}
            className={`rounded-full font-bold shadow-lg transition-all duration-300 ${
              currentIndex === totalSentences - 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed px-4 py-2'
                : 'bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 text-white px-6 py-3 shadow-xl hover:shadow-2xl hover:scale-105 animate-glow'
            }`}
          >
            {currentIndex === totalSentences - 1 ? 'Complete' : 'Next'} 
            <ArrowRight className="inline-block ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearnSentences;