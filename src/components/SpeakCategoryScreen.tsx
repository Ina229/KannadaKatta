import React from 'react';
import { Mic, Palette, Hash, MessageCircle, Hand, MessageSquare, ArrowLeft, Sparkles } from 'lucide-react';

interface SpeakCategoryScreenProps {
  onModeSelect: (mode: string) => void;
  onBack: () => void;
}

export default function SpeakCategoryScreen({ onModeSelect, onBack }: SpeakCategoryScreenProps) {
  const speakOptions = [
    {
      id: 'speak-colors',
      title: 'Speak Colors',
      description: 'Practice pronouncing colors in Kannada',
      icon: Palette,
      color: 'from-pink-500 to-rose-600',
      hoverColor: 'hover:from-pink-600 hover:to-rose-700',
      emoji: '🎨'
    },
    {
      id: 'speak-numbers',
      title: 'Speak Numbers',
      description: 'Practice counting from 1 to 20 in Kannada',
      icon: Hash,
      color: 'from-teal-500 to-cyan-600',
      hoverColor: 'hover:from-teal-600 hover:to-cyan-700',
      emoji: '🔢'
    },
    {
      id: 'speak-greetings',
      title: 'Speak Greetings',
      description: 'Practice essential greetings and polite expressions',
      icon: MessageCircle,
      color: 'from-green-500 to-emerald-600',
      hoverColor: 'hover:from-green-600 hover:to-emerald-700',
      emoji: '👋'
    },
    {
      id: 'speak-bodyparts',
      title: 'Speak Body Parts',
      description: 'Practice pronouncing body parts in Kannada',
      icon: Hand,
      color: 'from-cyan-500 to-blue-600',
      hoverColor: 'hover:from-cyan-600 hover:to-blue-700',
      emoji: '🖐️'
    },
    {
      id: 'speak-sentences',
      title: 'Speak Sentences',
      description: 'Practice daily conversations and phrases',
      icon: MessageSquare,
      color: 'from-violet-500 to-purple-600',
      hoverColor: 'hover:from-violet-600 hover:to-purple-700',
      emoji: '💬'
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
        Back to Learning
      </button>

      {/* Decorative elements */}
      <div className="absolute top-20 left-20 text-6xl animate-float opacity-30">🎤</div>
      <div className="absolute top-32 right-24 text-5xl animate-bounce-gentle opacity-40" style={{animationDelay: '1s'}}>🎨</div>
      <div className="absolute bottom-32 left-16 text-7xl animate-float opacity-25" style={{animationDelay: '2s'}}>👋</div>
      <div className="absolute bottom-20 right-20 text-6xl animate-bounce-gentle opacity-35" style={{animationDelay: '3s'}}>🔢</div>
      
      {/* Main Content */}
      <div className="text-center mb-12 max-w-4xl">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-pulse-slow">
              Speaking Practice
            </span>
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
            Choose what you'd like to practice speaking!
          </p>
        </div>

        {/* Speaking Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {speakOptions.map((option) => {
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
                      <span>Start Speaking</span>
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
            🎤 Practice makes perfect! Start speaking Kannada today! 🎤
          </p>
        </div>
      </div>
    </div>
  );
}