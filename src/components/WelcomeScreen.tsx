import React from 'react';
import { BookOpen, Gamepad2, Sparkles, Heart, GraduationCap } from 'lucide-react';

interface WelcomeScreenProps {
  onModeSelect: (mode: string) => void;
}

export default function WelcomeScreen({ onModeSelect }: WelcomeScreenProps) {
  const mainOptions = [
    {
      id: 'learning-category',
      title: 'Learning',
      description: 'Learn letters, colors, greetings, and numbers',
      icon: BookOpen,
      color: 'from-blue-500 to-indigo-600',
      hoverColor: 'hover:from-blue-600 hover:to-indigo-700',
      emoji: '📚',
      subtitle: 'Master the Basics'
    },
    {
      id: 'games-category',
      title: 'Games',
      description: 'Practice through fun interactive games and challenges',
      icon: Gamepad2,
      color: 'from-orange-500 to-red-600',
      hoverColor: 'hover:from-orange-600 hover:to-red-700',
      emoji: '🎮',
      subtitle: 'Practice & Play'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 text-6xl animate-float opacity-30">📚</div>
      <div className="absolute top-32 right-24 text-5xl animate-bounce-gentle opacity-40" style={{animationDelay: '1s'}}>🎮</div>
      <div className="absolute bottom-32 left-16 text-7xl animate-float opacity-25" style={{animationDelay: '2s'}}>🌟</div>
      <div className="absolute bottom-20 right-20 text-6xl animate-bounce-gentle opacity-35" style={{animationDelay: '3s'}}>✨</div>
      
      {/* Main Content */}
      <div className="text-center mb-12 max-w-4xl">
        {/* Welcome Message */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-pulse-slow">
              ಕನ್ನಡ ಕಟ್ಟ
            </span>
          </h1>
          <div className="flex items-center justify-center mb-6">
            <Heart className="h-8 w-8 text-red-500 mr-3 animate-sparkle" fill="currentColor" />
            <p className="text-2xl md:text-3xl font-semibold text-gray-800">
              Welcome to your Kannada learning journey!
            </p>
            <Heart className="h-8 w-8 text-red-500 ml-3 animate-sparkle" fill="currentColor" />
          </div>
        </div>

        {/* Main Categories Description */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-6">
            <GraduationCap className="h-12 w-12 text-purple-600 mr-4 animate-sparkle" />
            <p className="text-2xl font-bold text-gray-800">
              Choose your learning path
            </p>
            <GraduationCap className="h-12 w-12 text-purple-600 ml-4 animate-sparkle" />
          </div>
        </div>

        {/* Main Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {mainOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => onModeSelect(option.id)}
                className={`magical-card p-12 rounded-3xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl animate-glow bg-gradient-to-br ${option.color} ${option.hoverColor} text-white group`}
              >
                <div className="text-center">
                  {/* Icon and Emoji */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="text-8xl mr-6 group-hover:animate-bounce-gentle">
                      {option.emoji}
                    </div>
                    <IconComponent className="h-20 w-20 group-hover:animate-sparkle" />
                  </div>
                  
                  {/* Subtitle */}
                  <div className="text-lg font-semibold text-yellow-200 mb-2 opacity-90">
                    {option.subtitle}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-4xl font-bold mb-6 group-hover:text-yellow-100 transition-colors">
                    {option.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-xl opacity-90 group-hover:opacity-100 transition-opacity mb-6">
                    {option.description}
                  </p>
                  
                  {/* Hover indicator */}
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="inline-flex items-center text-yellow-200 font-semibold">
                      <span className="text-lg">Get Started</span>
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
            🌟 Every expert was once a beginner. Start your journey today! 🌟
          </p>
        </div>
      </div>
    </div>
  );
}