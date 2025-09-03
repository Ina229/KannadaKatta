import React from 'react';
import { CheckCircle, Sparkles, BookOpen, Gamepad2, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onGoHome: () => void;
}

export default function LandingPage({ onGoHome }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 text-6xl animate-float opacity-30">🎉</div>
      <div className="absolute top-32 right-24 text-5xl animate-bounce-gentle opacity-40" style={{animationDelay: '1s'}}>✨</div>
      <div className="absolute bottom-32 left-16 text-7xl animate-float opacity-25" style={{animationDelay: '2s'}}>🌟</div>
      <div className="absolute bottom-20 right-20 text-6xl animate-bounce-gentle opacity-35" style={{animationDelay: '3s'}}>🚀</div>

      {/* Main Content */}
      <div className="magical-card rounded-3xl shadow-2xl p-12 max-w-2xl w-full text-center animate-glow">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-full p-6 shadow-2xl animate-bounce-gentle">
            <CheckCircle className="h-16 w-16 text-white animate-sparkle" />
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 bg-clip-text text-transparent animate-pulse-slow">
              Welcome!
            </span>
          </h1>
          <div className="text-3xl font-bold text-gray-800 mb-4">
            ಸ್ವಾಗತ! 🎉
          </div>
          <p className="text-xl md:text-2xl font-semibold text-gray-700 mb-6">
            Your account has been created successfully!
          </p>
        </div>

        {/* Success Message */}
        <div className="bg-gradient-to-r from-green-100 via-teal-100 to-blue-100 rounded-2xl p-8 mb-8 shadow-lg animate-glow">
          <div className="text-2xl font-bold text-gray-800 mb-4">
            🎊 You're all set to start learning! 🎊
          </div>
          <p className="text-lg text-gray-700 mb-6">
            Get ready to explore the beautiful world of Kannada language through interactive lessons and fun games.
          </p>
          
          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/50 rounded-xl p-4 shadow-md">
              <BookOpen className="h-8 w-8 text-blue-500 mx-auto mb-2 animate-sparkle" />
              <div className="font-bold text-gray-800">Learn Letters & Words</div>
              <div className="text-sm text-gray-600">Master Kannada script</div>
            </div>
            <div className="bg-white/50 rounded-xl p-4 shadow-md">
              <Gamepad2 className="h-8 w-8 text-orange-500 mx-auto mb-2 animate-sparkle" />
              <div className="font-bold text-gray-800">Interactive Games</div>
              <div className="text-sm text-gray-600">Practice through play</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <button
          onClick={onGoHome}
          className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 text-white px-12 py-5 rounded-full text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-glow"
        >
          <div className="flex items-center justify-center">
            <Sparkles className="h-6 w-6 mr-3 animate-sparkle" />
            Start Learning Kannada
            <ArrowRight className="h-6 w-6 ml-3" />
          </div>
        </button>

        {/* Motivational Message */}
        <div className="mt-8">
          <p className="text-lg font-medium text-gray-700">
            🌟 Every expert was once a beginner! 🌟
          </p>
          <p className="text-base text-gray-600 mt-2">
            ಪ್ರತಿ ಪಂಡಿತನೂ ಒಮ್ಮೆ ಹೊಸಬನಾಗಿದ್ದನು!
          </p>
        </div>
      </div>
    </div>
  );
}