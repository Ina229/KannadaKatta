import React, { useState } from 'react';
import { Volume2, MessageCircle, ArrowRight } from 'lucide-react';

interface GreetingData {
  english: string;
  kannada: string;
  audio_file: string;
}

interface LearnGreetingsProps {
  greetings: GreetingData[];
  currentIndex: number;
  totalGreetings: number;
  onNavigate: (direction: 'next' | 'previous') => void;
}

const LearnGreetings: React.FC<LearnGreetingsProps> = ({
  greetings,
  currentIndex,
  totalGreetings,
  onNavigate,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const currentGreeting = greetings[currentIndex];

  const handleGreetingClick = () => {
    setIsPlaying(true);
    
    if (currentGreeting.audio_file) {
      const audio = new Audio(`/${currentGreeting.audio_file}`);
      audio.play()
        .then(() => {
          console.log('Greeting audio started playing successfully');
        })
        .catch(error => {
          console.error('Error playing greeting audio:', error);
        })
        .finally(() => {
          setTimeout(() => setIsPlaying(false), 1500);
        });
    } else {
      setTimeout(() => setIsPlaying(false), 1500);
    }
  };

  const handleNext = () => {
    onNavigate('next');
  };

  const handlePrevious = () => {
    onNavigate('previous');
  };

  // Get appropriate emoji for different greetings
  const getGreetingEmoji = (english: string): string => {
    const emojiMap: { [key: string]: string } = {
      'Good Morning': '🌅',
      'Good Afternoon': '☀️',
      'Good Evening': '🌆',
      'Good Night': '🌙',
      'Hello': '👋',
      'How are you?': '🤔',
      'I am fine': '😊',
      'Thank you': '🙏',
      'Please': '🤲',
      'Sorry': '😔',
      'Excuse me': '🙋',
      'Yes': '✅',
      'No': '❌',
      'Welcome': '🤗',
      'Goodbye': '👋',
    };
    return emojiMap[english] || '💬';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="magical-card rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center animate-glow">
        <h2 className="text-3xl font-bold gradient-text mb-6 flex items-center justify-center">
          <MessageCircle className="h-10 w-10 mr-2 text-green-500 animate-sparkle" />
          Learn Greetings
        </h2>
        
        {/* Progress Indicator */}
        <div className="text-lg font-semibold text-gray-700 mb-4">
          Greeting {currentIndex + 1} of {totalGreetings}
        </div>
        
        {/* Instruction */}
        <div className="text-lg font-semibold text-gray-700 mb-4">
          Tap the greeting to hear how to say it!
        </div>
        
        {/* Greeting Display */}
        <div className="bg-gradient-to-r from-green-200 via-teal-200 to-blue-200 rounded-2xl p-8 mb-8 shadow-lg animate-glow">
          <div className="text-xl font-semibold text-gray-800 mb-4">
            Learn this useful greeting:
          </div>
          
          {/* Greeting Emoji */}
          <div className="text-6xl mb-6 animate-bounce-gentle">
            {getGreetingEmoji(currentGreeting.english)}
          </div>
          
          {/* English Greeting */}
          <div className="text-2xl font-bold text-gray-700 mb-6">
            {currentGreeting.english}
          </div>
          
          {/* Kannada Greeting */}
          <button
            onClick={handleGreetingClick}
            disabled={isPlaying}
            className={`text-4xl sm:text-6xl font-bold py-6 px-8 sm:py-8 sm:px-12 rounded-2xl shadow-xl transition-all duration-300 hover:scale-110 animate-glow mb-6 ${
              isPlaying
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white animate-bounce-gentle animate-sparkle'
                : 'bg-gradient-to-br from-green-300 to-teal-300 text-green-800 hover:from-green-400 hover:to-teal-400 shadow-lg'
            }`}
          >
            {currentGreeting.kannada}
          </button>
          
          {/* Play Sound Button */}
          <button
            onClick={handleGreetingClick}
            disabled={isPlaying}
            className={`bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 animate-glow ${
              isPlaying ? 'animate-rainbow scale-110' : 'hover:scale-110'
            }`}
          >
            <Volume2 className="inline-block mr-2 h-6 w-6 animate-sparkle" />
            {isPlaying ? 'Playing...' : 'Play Sound'}
          </button>
        </div>
        
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
            disabled={currentIndex === totalGreetings - 1}
            className={`rounded-full font-bold shadow-lg transition-all duration-300 ${
              currentIndex === totalGreetings - 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed px-4 py-2'
                : 'bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 text-white px-6 py-3 shadow-xl hover:shadow-2xl hover:scale-105 animate-glow'
            }`}
          >
            {currentIndex === totalGreetings - 1 ? 'Complete' : 'Next'} 
            <ArrowRight className="inline-block ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearnGreetings;