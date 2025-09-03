import React, { useState } from 'react';
import { Volume2, Star } from 'lucide-react';

interface PracticeMatchProps {
  targetLetter: string;
  options: string[];
  targetAudioFile: string;
  onSuccess: () => void;
}

export default function PracticeMatch({ targetLetter, options, targetAudioFile, onSuccess }: PracticeMatchProps) {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const playTargetAudio = () => {
    setIsPlaying(true);
    
    if (targetAudioFile) {
      const audio = new Audio(`/${targetAudioFile}`);
      audio.play()
        .then(() => {
          // Audio started playing successfully
        })
        .catch(e => {
          console.error("Error playing audio:", e);
        })
        .finally(() => {
          setTimeout(() => setIsPlaying(false), 1000);
        });
    } else {
      // Fallback if no audio file
      setTimeout(() => setIsPlaying(false), 1000);
    }
  };

  const handleLetterSelect = (letter: string) => {
    setSelectedLetter(letter);
    const correct = letter === targetLetter;
    setIsCorrect(correct);
    setShowResult(true);
    
    // Only reset if incorrect, let Next button handle success
    if (!correct) {
      setTimeout(() => {
        setShowResult(false);
        setSelectedLetter(null);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="magical-card rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center animate-glow">
        <h2 className="text-3xl font-bold gradient-text mb-6">Listen & Match</h2>
        
        {/* Instruction */}
        <div className="text-lg font-semibold text-gray-700 mb-4">
          Listen carefully and choose the correct letter!
        </div>
        
        {/* Audio Instruction */}
        <div className="bg-gradient-to-r from-purple-200 via-pink-200 to-rose-200 rounded-2xl p-6 mb-8 shadow-lg animate-glow">
          <div className="text-xl font-semibold text-gray-800 mb-4">
            Listen carefully and tap the correct letter!
          </div>
          
          <button
            onClick={playTargetAudio}
            disabled={isPlaying}
            className={`bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 animate-glow ${
              isPlaying ? 'animate-rainbow scale-110' : 'hover:scale-110'
            }`}
          >
            <Volume2 className="inline-block mr-2 h-6 w-6 animate-sparkle" />
            {isPlaying ? 'Playing...' : 'Play Sound'}
          </button>
        </div>
        
        {/* Letter Options */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {options.map((letter, index) => (
            <button
              key={index}
              onClick={() => handleLetterSelect(letter)}
              disabled={showResult}
              className={`text-6xl font-bold py-8 rounded-2xl shadow-xl transition-all duration-300 hover:scale-110 animate-glow ${
                selectedLetter === letter
                  ? isCorrect
                    ? 'bg-gradient-to-r from-green-400 to-teal-500 text-white animate-bounce-gentle animate-sparkle'
                    : 'bg-gradient-to-r from-red-400 to-pink-500 text-white animate-shake'
                  : 'bg-gradient-to-br from-orange-300 to-yellow-300 text-orange-800 hover:from-orange-400 hover:to-yellow-400 shadow-lg'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
        
        {/* Result Display */}
        {showResult && (
          <div className={`animate-fadeIn ${isCorrect ? 'text-green-700' : 'text-red-600'}`}>
            <div className="text-3xl font-bold mb-4">
              {isCorrect ? (
                <div className="flex items-center justify-center">
                  <Star className="h-10 w-10 mr-2 text-yellow-500 animate-sparkle" fill="currentColor" />
                  Excellent! ಅದ್ಭುತ!
                  <Star className="h-10 w-10 ml-2 text-yellow-500 animate-sparkle" fill="currentColor" />
                </div>
              ) : (
                'Try again! ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ!'
              )}
            </div>
            
            {/* Next Button - only show when correct */}
            {isCorrect && (
              <button
                onClick={() => {
                  onSuccess();
                  setShowResult(false);
                  setSelectedLetter(null);
                }}
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-glow"
              >
                Next Question →
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}