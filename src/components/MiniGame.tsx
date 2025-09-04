import React, { useState } from 'react';
import { Volume2, Trophy } from 'lucide-react';

interface GameItem {
  word: string;
  englishTranslation: string;
  audioFile: string;
}

interface MiniGameQuestion {
  type: 'word' | 'color' | 'number';
  target: GameItem;
  options: GameItem[];
}

interface MiniGameProps {
  question: MiniGameQuestion;
  onSuccess: () => void;
}

export default function MiniGame({ question, onSuccess }: MiniGameProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isPlayingTargetAudio, setIsPlayingTargetAudio] = useState(false);
  const [isPlayingOptionAudio, setIsPlayingOptionAudio] = useState<number | null>(null);

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

  const playTargetAudio = () => {
    setIsPlayingTargetAudio(true);
    
    if (question.target.audioFile) {
      const audio = new Audio(`/${question.target.audioFile}`);
      audio.play()
        .then(() => {
          console.log('Target audio started playing successfully');
        })
        .catch(error => {
          console.error('Error playing target audio:', error);
        })
        .finally(() => {
          setTimeout(() => setIsPlayingTargetAudio(false), 1200);
        });
    } else {
      setTimeout(() => setIsPlayingTargetAudio(false), 1200);
    }
  };

  const playOptionAudio = (audioFile: string, optionIndex: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlayingOptionAudio(optionIndex);
    
    if (audioFile) {
      const audio = new Audio(`/${audioFile}`);
      audio.play()
        .then(() => {
          console.log('Option audio started playing successfully');
        })
        .catch(error => {
          console.error('Error playing option audio:', error);
        })
        .finally(() => {
          setTimeout(() => setIsPlayingOptionAudio(null), 1000);
        });
    } else {
      setTimeout(() => setIsPlayingOptionAudio(null), 1000);
    }
  };

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    const correct = question.options[index].word === question.target.word;
    setIsCorrect(correct);
    setShowResult(true);
  };

  const handleTryAgain = () => {
    setShowResult(false);
    setSelectedOption(null);
    setIsCorrect(false);
  };

  const handleNextQuestion = () => {
    onSuccess();
    setShowResult(false);
    setSelectedOption(null);
    setIsCorrect(false);
  };

  const getGameTitle = () => {
    switch (question.type) {
      case 'word': return 'Word Match Game';
      case 'color': return 'Color Match Game';
      case 'number': return 'Number Match Game';
      default: return 'Match Game';
    }
  };

  const getInstruction = () => {
    switch (question.type) {
      case 'word': return 'Listen to the word and choose the correct translation!';
      case 'color': return 'Listen to the color and choose the correct one!';
      case 'number': return 'Listen to the number and choose the correct one!';
      default: return 'Listen and choose the correct answer!';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="magical-card rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center animate-glow">
        <h2 className="text-3xl font-bold gradient-text mb-6 flex items-center justify-center">
          <Trophy className="h-10 w-10 mr-2 text-yellow-500 animate-sparkle" />
          {getGameTitle()}
        </h2>
        
        {/* Instruction */}
        <div className="text-lg font-semibold text-gray-700 mb-4">
          You can do it! 🎮
        </div>
        
        {/* Audio Instruction */}
        <div className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 rounded-2xl p-6 mb-8 shadow-lg animate-glow">
          <div className="text-xl font-bold text-gray-800 mb-4">
            {getInstruction()}
          </div>
          
          <div className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 animate-bounce-gentle">
            {question.target.word}
          </div>
          
          {/* Show color swatch for color questions */}
          {question.type === 'color' && (
            <div className="flex justify-center mb-4">
              <div 
                className="w-16 h-16 rounded-full shadow-lg border-4 border-white"
                style={{ 
                  backgroundColor: getColorValue(question.target.englishTranslation),
                  boxShadow: `0 0 20px ${getColorValue(question.target.englishTranslation)}40`
                }}
              ></div>
            </div>
          )}
          
          <button
            onClick={playTargetAudio}
            disabled={isPlayingTargetAudio}
            className={`bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-10 py-5 rounded-full text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 animate-glow ${
              isPlayingTargetAudio ? 'animate-rainbow scale-110' : 'hover:scale-110'
            }`}
          >
            <Volume2 className="inline-block mr-2 h-7 w-7 animate-sparkle" />
            {isPlayingTargetAudio ? 'Playing...' : 'Hear the Word'}
          </button>
        </div>
        
        {/* Options */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              disabled={showResult}
              className={`p-4 sm:p-6 rounded-2xl shadow-xl transition-all duration-300 hover:scale-110 animate-glow ${
                selectedOption === index
                  ? isCorrect
                    ? 'bg-gradient-to-r from-green-400 to-teal-500 text-white animate-bounce-gentle animate-sparkle'
                    : 'bg-gradient-to-r from-red-400 to-pink-500 text-white animate-shake'
                  : 'bg-gradient-to-br from-blue-200 to-teal-200 hover:from-blue-300 hover:to-teal-300'
              }`}
            >
              {/* Show color swatch for color options */}
              {question.type === 'color' && (
                <div className="flex justify-center mb-2">
                  <div 
                    className="w-8 h-8 rounded-full shadow-md border-2 border-white"
                    style={{ backgroundColor: getColorValue(option.englishTranslation) }}
                  ></div>
                </div>
              )}
              
              {/* Show animal emoji for animal options */}
              {question.type === 'animal' && (
                <div className="flex justify-center mb-2">
                  <div className="text-4xl">
                    {getAnimalEmoji(option.englishTranslation)}
                  </div>
                </div>
              )}
              
              {/* Kannada Word */}
              <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                {option.word}
              </div>
              
              {/* English Translation */}
              <div className="text-base sm:text-lg font-semibold text-gray-600 mb-4">
                ({option.englishTranslation})
              </div>
              
              {/* Audio Button */}
              <button
                onClick={(e) => playOptionAudio(option.audioFile, index, e)}
                disabled={isPlayingOptionAudio === index}
                className={`bg-gradient-to-r from-orange-400 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300 ${
                  isPlayingOptionAudio === index ? 'animate-rainbow scale-110' : 'hover:scale-105'
                }`}
              >
                <Volume2 className="inline-block mr-1 h-4 w-4" />
                {isPlayingOptionAudio === index ? 'Playing...' : 'Hear'}
              </button>
            </button>
          ))}
        </div>
        
        {/* Result Display */}
        {showResult && (
          <div className={`animate-fadeIn ${isCorrect ? 'text-green-700' : 'text-red-600'}`}>
            <div className="text-3xl font-bold mb-2">
              {isCorrect ? (
                <div className="flex items-center justify-center">
                  <Trophy className="h-10 w-10 mr-2 text-yellow-500 animate-sparkle" />
                  Outstanding! ಅದ್ಭುತ!
                  <Trophy className="h-10 w-10 ml-2 text-yellow-500 animate-sparkle" />
                </div>
              ) : (
                'Good try! Keep going! ಮುಂದುವರಿಯಿರಿ!'
              )}
            </div>
            
            <div className="mt-4">
              {isCorrect ? (
                <button
                  onClick={handleNextQuestion}
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-glow"
                >
                  Next Question →
                </button>
              ) : (
                <button
                  onClick={handleTryAgain}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-glow"
                >
                  Try Again
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}