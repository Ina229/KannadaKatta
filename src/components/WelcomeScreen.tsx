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