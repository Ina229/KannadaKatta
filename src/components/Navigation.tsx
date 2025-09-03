import React from 'react';
import { BookOpen, Gamepad2, Home, UserPlus } from 'lucide-react';

interface NavigationProps {
  currentMode: string;
  onModeChange: (mode: string) => void;
}

export default function Navigation({ currentMode, onModeChange }: NavigationProps) {
  const modes = [
    { id: 'welcome', label: 'Home', icon: Home, color: 'from-pink-500 to-rose-500' },
    { id: 'learning-category', label: 'Learning', icon: BookOpen, color: 'from-blue-500 to-indigo-500' },
    { id: 'games-category', label: 'Games', icon: Gamepad2, color: 'from-orange-500 to-red-500' },
  ];

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50">
      <div className="magical-card rounded-2xl shadow-2xl p-4 max-w-md mx-auto animate-glow">
        <div className="grid grid-cols-3 gap-4">
          {modes.map((mode) => {
            const IconComponent = mode.icon;
            const isActive = currentMode === mode.id || 
              (mode.id === 'learning-category' && ['learn', 'colors', 'greetings', 'count'].includes(currentMode)) ||
              (mode.id === 'games-category' && ['practice', 'words', 'game'].includes(currentMode)) ||
              (mode.id === 'signup' && ['signup', 'landing'].includes(currentMode));
            
            return (
              <button
                key={mode.id}
                onClick={() => onModeChange(mode.id)}
                className={`p-4 rounded-xl transition-all duration-300 shadow-lg ${
                  isActive
                    ? `bg-gradient-to-r ${mode.color} text-white scale-110 shadow-xl animate-glow`
                    : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 hover:scale-105'
                }`}
              >
                <IconComponent className={`h-6 w-6 mx-auto mb-1 ${isActive ? 'animate-sparkle' : ''}`} />
                <div className="text-xs font-bold leading-tight">{mode.label}</div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}