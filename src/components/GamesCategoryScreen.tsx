import React from 'react';
import { Target, Building2, Gamepad2, ArrowLeft, Sparkles } from 'lucide-react';

interface GamesCategoryScreenProps {
  onModeSelect: (mode: string) => void;
  onBack: () => void;
}

export default function GamesCategoryScreen({ onModeSelect, onBack }: GamesCategoryScreenProps) {
  const gameOptions = [
    {
      id: 'practice',
      title: 'Practice Match',
      description: 'Match sounds with the correct letters',
      icon: Target,
      color: 'from-green-500 to-emerald-600',
      hoverColor: 'hover:from-green-600 hover:to-emerald-700',
      emoji: '🎯'
    },
    {
      id: 'game',
      title: 'Fun Games',
      description: 'Play interactive word, color & number matching games',
      icon: Gamepad2,
      color: 'from-orange-500 to-red-600',
      hoverColor: 'hover:from-orange-600 hover:to-red-700',
      emoji: '🎮'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-8 left-8 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-glow flex items-center"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Home
      </button>

      {/* Decorative elements */}
      <div className="absolute top-20 left-20 text-6xl animate-float opacity-30">🎯</div>
      <div className="absolute top-32 right-24 text-5xl animate-bounce-gentle opacity-40" style={{animationDelay: '1s'}}>🏗️</div>
      <div className="absolute bottom-32 left-16 text-7xl animate-float opacity-25" style={{animationDelay: '2s'}}>🎮</div>
      <div className="absolute bottom-20 right-20 text-6xl animate-bounce-gentle opacity-35" style={{animationDelay: '3s'}}>⭐</div>
      
      {/* Main Content */}
      <div className="text-center mb-12 max-w-4xl">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent animate-pulse-slow">
              Games Center
            </span>
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
            Practice your skills through fun games!
          </p>
        </div>

        {/* Game Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {gameOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => onModeSelect(option.id)}
                className={`magical-card p-8 rounded-3xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl animate-glow bg-gradient-to-br ${option.color} ${option.hoverColor} text-white group`}
              >
                <div className="text-center">
                  {/* Icon and Emoji */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="text-6xl mr-4 group-hover:animate-bounce-gentle">
                      {option.emoji}
                    </div>
                    <IconComponent className="h-16 w-16 group-hover:animate-sparkle" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-3xl font-bold mb-4 group-hover:text-yellow-200 transition-colors">
                    {option.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-lg opacity-90 group-hover:opacity-100 transition-opacity">
                    {option.description}
                  </p>
                  
                  {/* Hover indicator */}
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="inline-flex items-center text-yellow-200 font-semibold">
                      <span>Start Playing</span>
                      <Sparkles className="h-5 w-5 ml-2 animate-sparkle" />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Message */}
        <div className="mt-12 text-center">
          <p className="text-xl font-medium text-gray-700">
            🎮 Learn through play and have fun! 🎮
          </p>
        </div>
      </div>
    </div>
  );
}