import React, { useState } from 'react';
import { Mail, Lock, ArrowLeft, Sparkles, Eye, EyeOff, LogIn } from 'lucide-react';

interface SignInPageProps {
  onSignInSuccess: () => void;
  onBack: () => void;
}

export default function SignInPage({ onSignInSuccess, onBack }: SignInPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSignInSuccess();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-8 left-8 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-glow flex items-center"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back
      </button>

      {/* Decorative elements */}
      <div className="absolute top-20 left-20 text-6xl animate-float opacity-30">🌟</div>
      <div className="absolute top-32 right-24 text-5xl animate-bounce-gentle opacity-40" style={{animationDelay: '1s'}}>✨</div>
      <div className="absolute bottom-32 left-16 text-7xl animate-float opacity-25" style={{animationDelay: '2s'}}>💫</div>
      <div className="absolute bottom-20 right-20 text-6xl animate-bounce-gentle opacity-35" style={{animationDelay: '3s'}}>⭐</div>

      {/* Main Content */}
      <div className="magical-card rounded-3xl shadow-2xl p-8 max-w-md w-full animate-glow">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <LogIn className="h-12 w-12 text-blue-600 mr-3 animate-sparkle" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-teal-500 to-indigo-600 bg-clip-text text-transparent">
              Welcome Back
            </h1>
          </div>
          <p className="text-lg text-gray-600 font-medium">
            Continue your Kannada learning journey!
          </p>
          <div className="text-2xl mt-2">🌟 ಕನ್ನಡ ಕಟ್ಟ 🌟</div>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                  errors.email 
                    ? 'border-red-400 bg-red-50' 
                    : 'border-gray-300 bg-white hover:border-blue-300'
                }`}
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 font-medium">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                  errors.password 
                    ? 'border-red-400 bg-red-50' 
                    : 'border-gray-300 bg-white hover:border-blue-300'
                }`}
                placeholder="Enter your password"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1 font-medium">{errors.password}</p>
            )}
          </div>

          {/* General Error */}
          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-red-600 text-sm font-medium">{errors.general}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 ${
              isLoading
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 via-teal-500 to-indigo-600 text-white hover:scale-105 animate-glow'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                Signing In...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <LogIn className="h-6 w-6 mr-2 animate-sparkle" />
                Sign In
                <Sparkles className="h-6 w-6 ml-2 animate-sparkle" />
              </div>
            )}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-8 text-center space-y-3">
          <div>
            <button
              onClick={onBack}
              className="text-blue-600 font-semibold hover:text-blue-800 transition-colors underline"
            >
              Don't have an account? Sign up here
            </button>
          </div>
          <div>
            <button
              onClick={onSignInSuccess}
              className="text-gray-600 font-medium hover:text-gray-800 transition-colors underline"
            >
              Continue as Guest
            </button>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="mt-6 text-center">
          <p className="text-base text-gray-600">
            Ready to continue learning? 🚀
          </p>
        </div>
      </div>
    </div>
  );
}