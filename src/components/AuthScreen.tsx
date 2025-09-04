import React from 'react';
import { BookOpen, UserPlus, LogIn, Sparkles, Heart, GraduationCap } from 'lucide-react';

interface AuthScreenProps {
  onSignUp: () => void;
  onSignIn: () => void;
}

export default function AuthScreen({ onSignUp, onSignIn }: AuthScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 text-6xl animate-float opacity-30">📚</div>
      <div className="absolute top-32 right-24 text-5xl animate-bounce-gentle opacity-40" style={{animationDelay: '1s'}}>✨</div>
      <div className="absolute bottom-32 left-16 text-7xl animate-float opacity-25" style={{animationDelay: '2s'}}>🌟</div>
      <div className="absolute bottom-20 right-20 text-6xl animate-bounce-gentle opacity-35" style={{animationDelay: '3s'}}>💫</div>
      
      {/* Main Content */}
      <div className="text-center mb-12 max-w-4xl">
        {/* App Title */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="h-16 w-16 text-purple-600 mr-4 animate-sparkle" />
            <div className="text-center">
              <h1 className="text-6xl md:text-7xl font-bold mb-2">
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent animate-pulse-slow">
                  ಕನ್ನಡ ಕಟ್ಟ
                </span>
              </h1>
              <div className="text-2xl font-semibold text-gray-700">Kannada Katta</div>
            </div>
            <BookOpen className="h-16 w-16 text-purple-600 ml-4 animate-sparkle" />
          </div>
          
          <div className="flex items-center justify-center mb-6">
            <Heart className="h-8 w-8 text-red-500 mr-3 animate-sparkle" fill="currentColor" />
            <p className="text-2xl md:text-3xl font-semibold text-gray-800">
              Learn Kannada with Joy!
            </p>
            <Heart className="h-8 w-8 text-red-500 ml-3 animate-sparkle" fill="currentColor" />
          </div>
          
          <p className="text-xl text-gray-600 mb-8">
            Master the beautiful Kannada language through interactive lessons, games, and fun activities
          </p>
        </div>

        {/* Features Preview */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-6">
            <GraduationCap className="h-12 w-12 text-purple-600 mr-4 animate-sparkle" />
            <p className="text-2xl font-bold text-gray-800">
              What you'll learn
            </p>
            <GraduationCap className="h-12 w-12 text-purple-600 ml-4 animate-sparkle" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="magical-card p-6 rounded-2xl shadow-xl animate-glow">
              <div className="text-4xl mb-3">📝</div>
              <div className="font-bold text-gray-800">Letters</div>
              <div className="text-sm text-gray-600">Kannada script</div>
            </div>
            <div className="magical-card p-6 rounded-2xl shadow-xl animate-glow">
              <div className="text-4xl mb-3">🎨</div>
              <div className="font-bold text-gray-800">Colors</div>
              <div className="text-sm text-gray-600">Visual learning</div>
            </div>
            <div className="magical-card p-6 rounded-2xl shadow-xl animate-glow">
              <div className="text-4xl mb-3">👋</div>
              <div className="font-bold text-gray-800">Greetings</div>
              <div className="text-sm text-gray-600">Daily phrases</div>
            </div>
            <div className="magical-card p-6 rounded-2xl shadow-xl animate-glow">
              <div className="text-4xl mb-3">🎮</div>
              <div className="font-bold text-gray-800">Games</div>
              <div className="text-sm text-gray-600">Fun practice</div>
            </div>
          </div>
        </div>

        {/* Authentication Options */}
        <div className="magical-card rounded-3xl shadow-2xl p-8 max-w-md mx-auto animate-glow">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Get Started
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands learning Kannada!
            </p>
          </div>

          <div className="space-y-4">
            {/* Sign Up Button */}
            <button
              onClick={onSignUp}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-glow"
            >
              <div className="flex items-center justify-center">
                <UserPlus className="h-6 w-6 mr-3 animate-sparkle" />
                Create New Account
                <Sparkles className="h-6 w-6 ml-3 animate-sparkle" />
              </div>
            </button>

            {/* Sign In Button */}
            <button
              onClick={onSignIn}
              className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-glow"
            >
              <div className="flex items-center justify-center">
                <LogIn className="h-6 w-6 mr-3 animate-sparkle" />
                Sign In to Continue
                <Sparkles className="h-6 w-6 ml-3 animate-sparkle" />
              </div>
            </button>

          </div>
        </div>

        {/* Bottom Message */}
        <div className="mt-12 text-center">
          <p className="text-xl font-medium text-gray-700">
            🌟 Start your Kannada journey today! 🌟
          </p>
          <p className="text-base text-gray-600 mt-2">
            ಇಂದೇ ನಿಮ್ಮ ಕನ್ನಡ ಪ್ರಯಾಣವನ್ನು ಪ್ರಾರಂಭಿಸಿ!
          </p>
        </div>
      </div>
    </div>
  );
}