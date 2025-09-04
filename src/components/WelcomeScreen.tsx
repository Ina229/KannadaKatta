import React from 'react';
import { BookOpen, Gamepad2, Sparkles, Heart, GraduationCap } from 'lucide-react';

interface WelcomeScreenProps {
  onModeSelect: (mode: string) => void;
}

export default function WelcomeScreen({ onModeSelect }: WelcomeScreenProps) {
  const mainOptions = [
    {
      id: 'learn',
      title: 'Learn',
      subtitle: 'Educational Mode',
      description: 'Master new concepts with guided lessons',
      emoji: '📚',
      icon: BookOpen,
      color: 'from-blue-500 to-purple-600',
      hoverColor: 'hover:from-blue-600 hover:to-purple-700'
    },
    {
      id: 'play',
      title: 'Play',
      subtitle: 'Game Mode',
      description: 'Have fun while learning through games',
      emoji: '🎮',
      icon: Gamepad2,
      color: 'from-green-500 to-teal-600',
      hoverColor: 'hover:from-green-600 hover:to-teal-700'
    },
    {
      id: 'practice',
      title: 'Practice',
      subtitle: 'Skills Mode',
      description: 'Strengthen your abilities with exercises',
      emoji: '💪',
      icon: GraduationCap,
      color: 'from-orange-500 to-red-600',
      hoverColor: 'hover:from-orange-600 hover:to-red-700'
    },
    {
      id: 'explore',
      title: 'Explore',
      subtitle: 'Discovery Mode',
      description: 'Discover new topics and interests',
      emoji: '🔍',
      icon: Heart,
      color: 'from-pink-500 to-rose-600',
      hoverColor: 'hover:from-pink-600 hover:to-rose-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-800 mb-6 animate-fade-in">
            Welcome to Learning Hub
          </h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose your adventure and embark on an exciting journey of discovery and growth
          </p>
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