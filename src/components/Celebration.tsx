import React from 'react';
import { Star, Award, Sparkles } from 'lucide-react';

interface CelebrationProps {
  type: 'star' | 'badge';
  message: string;
  onClose: () => void;
}

export default function Celebration({ type, message, onClose }: CelebrationProps) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fadeIn backdrop-blur-sm">
      <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 rounded-3xl p-10 text-center max-w-sm mx-4 animate-bounce-gentle shadow-2xl animate-rainbow">
        <div className="text-7xl mb-6">
          {type === 'star' ? (
            <Star className="h-20 w-20 mx-auto text-white animate-sparkle" fill="currentColor" />
          ) : (
            <Award className="h-20 w-20 mx-auto text-white animate-sparkle" />
          )}
        </div>
        
        <h3 className="text-3xl font-bold text-white mb-4 animate-bounce-gentle">
          {type === 'star' ? 'Star Earned!' : 'Badge Unlocked!'}
        </h3>
        
        <p className="text-white text-xl font-bold mb-6">{message}</p>
        
        <div className="flex justify-center space-x-3">
          <Sparkles className="h-8 w-8 text-white animate-sparkle" />
          <Sparkles className="h-8 w-8 text-white animate-sparkle delay-75" />
          <Sparkles className="h-8 w-8 text-white animate-sparkle delay-150" />
        </div>
      </div>
    </div>
  );
}