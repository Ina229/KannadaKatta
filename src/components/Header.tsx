import React from 'react';
import { Star, Award, LogOut } from 'lucide-react';

interface HeaderProps {
  stars: number;
  badges: string[];
  onSignOut?: () => void;
  isAuthenticated?: boolean;
}

export default function Header({ stars, badges, onSignOut, isAuthenticated }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white p-6 rounded-b-3xl shadow-2xl border-b-4 border-yellow-300 animate-glow">
      <div className="flex flex-col sm:flex-row justify-between items-center max-w-4xl mx-auto gap-4">
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 text-center sm:text-left">
          <div className="flex flex-col items-start">
            <div className="text-2xl sm:text-4xl font-bold text-white animate-pulse-slow drop-shadow-lg">ಕನ್ನಡ ಕಟ್ಟ</div>
            <div className="text-sm sm:text-lg font-semibold text-yellow-100 animate-bounce-gentle">Kannada Katta</div>
          </div>
          <div className="flex flex-col items-center sm:items-start sm:ml-4">
            <div className="text-lg sm:text-xl font-bold text-white drop-shadow-lg">Learn Kannada!</div>
            <div className="text-sm sm:text-lg font-semibold text-yellow-100 animate-bounce-gentle">ಕನ್ನಡ ಕಲಿಯಿರಿ!</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="flex items-center space-x-1 sm:space-x-2 bg-white/30 px-3 sm:px-5 py-2 sm:py-3 rounded-full shadow-xl backdrop-blur-sm border-2 border-white/30 animate-glow">
            <Star className="h-5 w-5 sm:h-7 sm:w-7 text-yellow-300 animate-sparkle" fill="currentColor" />
            <span className="font-bold text-lg sm:text-xl">{stars}</span>
          </div>
          
          <div className="flex flex-wrap gap-1 sm:space-x-1">
            {badges.map((badge, index) => (
              <div key={index} className="bg-gradient-to-r from-yellow-400 to-orange-400 text-orange-900 px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold flex items-center shadow-xl transform hover:scale-110 transition-all duration-300 animate-bounce-gentle">
                <Award className="h-3 w-3 sm:h-5 sm:w-5 mr-1 animate-sparkle" />
                {badge}
              </div>
            ))}
          </div>
          
          {isAuthenticated && onSignOut && (
            <button
              onClick={onSignOut}
              className="bg-white/30 px-3 sm:px-4 py-2 sm:py-3 rounded-full shadow-xl backdrop-blur-sm border-2 border-white/30 hover:bg-white/40 transition-all duration-300 hover:scale-105 animate-glow flex items-center"
            >
              <LogOut className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              <span className="ml-1 sm:ml-2 font-bold text-sm sm:text-base hidden sm:inline">Sign Out</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}