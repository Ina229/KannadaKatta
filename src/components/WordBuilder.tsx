import React, { useState } from 'react';
import { Volume2, Play, ArrowRight } from 'lucide-react';

interface WordBuilderProps {
  word: string;
  letters: string[];
  meaning: string;
  audioFile: string;
  letterAudioData: { letter: string; englishTranslation: string; audio: string; }[];
  onWordComplete: () => void;
  currentIndex: number;
  totalWords: number;
  onNavigate: (direction: 'next' | 'previous') => void;
}

export default function WordBuilder({ word, letters, meaning, audioFile, letterAudioData, onWordComplete, currentIndex, totalWords, onNavigate }: WordBuilderProps) {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(-1);
  const [isPlayingWord, setIsPlayingWord] = useState(false);
  const [completedLetters, setCompletedLetters] = useState<number[]>([]);
  const [hasPlayedFullWord, setHasPlayedFullWord] = useState(false);

  // Reset state when word changes
  React.useEffect(() => {
    setCompletedLetters([]);
    setCurrentLetterIndex(-1);
    setIsPlayingWord(false);
    setHasPlayedFullWord(false);
  }, [word]);

  const playFullWord = () => {
    console.log('Playing full word audio:', audioFile);
    console.log('Full audio path:', `/${audioFile}`);
    
    setIsPlayingWord(true);
    setCurrentLetterIndex(-1);
    
    if (audioFile) {
      const audio = new Audio(`/${audioFile}`);
      audio.play()
        .then(() => {
          console.log('Audio started playing successfully');
        })
        .catch(error => {
          console.error('Error playing full word audio:', error);
        })
        .finally(() => {
          setTimeout(() => {
            setIsPlayingWord(false);
            setHasPlayedFullWord(true);
          }, 1500);
        });
    } else {
      console.warn('No audio file provided for word:', word);
      setTimeout(() => {
        setIsPlayingWord(false);
        setHasPlayedFullWord(true);
      }, 1500);
    }
  };

  const playLetter = (index: number) => {
    setCurrentLetterIndex(index);
    
    // Find audio file for the letter
    const letter = letters[index];
    const audioData = letterAudioData.find(data => data.letter === letter);
    
    if (audioData && audioData.audio) {
      const audio = new Audio(`/${audioData.audio}`);
      audio.play().catch(e => console.error("Error playing audio:", e));
    } else {
      console.error(`No audio mapping found for letter: ${letter}`);
    }
    
    if (!completedLetters.includes(index)) {
      setCompletedLetters(prev => [...prev, index]);
    }
    
    setTimeout(() => {
      setCurrentLetterIndex(-1);
      if (completedLetters.length + 1 === letters.length) {
        setTimeout(() => onWordComplete(), 1000);
      }
    }, 800);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="magical-card rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center animate-glow">
        <h2 className="text-3xl font-bold gradient-text mb-6">Word Builder</h2>
        
 
        
        {/* Instruction */}
        <div className="text-lg font-semibold text-gray-700 mb-4">
          Let's build words together!
        </div>
        
        {/* Word Meaning */}
        <div className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-2xl p-6 mb-6 shadow-lg animate-glow">
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{meaning}</div>
        </div>
        
        {/* Full Word Display */}
        <div className="mb-6">
          <div className="text-6xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-4 animate-bounce-gentle">{word}</div>
          <button
            onClick={playFullWord}
            disabled={isPlayingWord}
            className={`bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-500 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 animate-glow ${
              isPlayingWord ? 'animate-rainbow scale-110' : 'hover:scale-110'
            }`}
          >
            <Play className="inline-block mr-2 h-6 w-6 animate-sparkle" />
            {isPlayingWord ? 'Playing Word...' : 'Play Full Word'}
          </button>
        </div>
        
     
        {/* Progress Indicator */}
     
        
        {/* Completion Message */}
        {hasPlayedFullWord && (
          <div className="bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 text-white p-6 rounded-2xl animate-fadeIn animate-rainbow mb-4">
            <div className="text-2xl font-bold animate-bounce-gentle mb-4">🎉 Perfect! You learned the word! 🎉</div>
          </div>
        )}
        
        {/* Navigation Controls */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => onNavigate('previous')}
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
            onClick={() => onNavigate('next')}
            disabled={!hasPlayedFullWord}
            className={`rounded-full font-bold shadow-lg transition-all duration-300 ${
              !hasPlayedFullWord
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed px-4 py-2'
                : currentIndex === totalWords - 1
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 shadow-xl hover:shadow-2xl hover:scale-105 animate-glow'
                : 'bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 text-white px-6 py-3 shadow-xl hover:shadow-2xl hover:scale-105 animate-glow'
            }`}
          >
            {currentIndex === totalWords - 1 ? 'Complete' : 'Next'} 
            <ArrowRight className="inline-block ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}