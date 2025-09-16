import React, { useState, useEffect } from 'react';
import { Volume2, Mic, MicOff, Play, RotateCcw } from 'lucide-react';

interface SentenceData {
  english: string;
  kannada: string;
  audio_file: string;
}

interface ColorData {
  english: string;
  kannada: string;
  audio_file: string;
}

interface NumberData {
  english: string;
  kannada: string;
  audio_file: string;
}

interface GreetingData {
  english: string;
  kannada: string;
  audio_file: string;
}

interface BodyPartData {
  english: string;
  kannada: string;
  audio_file: string;
}

interface AnimalData {
  english: string;
  kannada: string;
  audio_file: string;
}

type ItemData = SentenceData | ColorData | NumberData | GreetingData | BodyPartData | AnimalData;

interface SpeechPracticeModuleProps {
  item: ItemData;
  type: 'sentences' | 'colors' | 'numbers' | 'greetings' | 'bodyparts' | 'animals';
  onPronunciationSuccess?: () => void;
}

// Speech recognition interface
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

const SpeechPracticeModule: React.FC<SpeechPracticeModuleProps> = ({
  item,
  type,
  onPronunciationSuccess,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error' | 'neutral' | null;
    message: string;
  }>({ type: null, message: '' });
  const [attempts, setAttempts] = useState(0);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [userAudio, setUserAudio] = useState<Blob | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = 'kn-IN'; // Kannada locale
        
        recognitionInstance.onstart = () => {
          setIsListening(true);
          setFeedback({ type: 'neutral', message: 'Listening... Speak now!' });
        };

        recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = event.results[0][0].transcript;
          setRecognizedText(transcript);
          checkPronunciation(transcript);
        };

        recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          setFeedback({ 
            type: 'error', 
            message: 'Could not hear you clearly. Please try again!' 
          });
        };

        recognitionInstance.onend = () => {
          setIsListening(false);
        };

        setRecognition(recognitionInstance);
        setIsSupported(true);
      } else {
        setIsSupported(false);
        setFeedback({ 
          type: 'error', 
          message: 'Speech recognition is not supported in this browser.' 
        });
      }
    }
  }, []);

  // Initialize media recorder for recording user's voice
  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          const recorder = new MediaRecorder(stream);
          setMediaRecorder(recorder);
        })
        .catch(err => {
          console.error('Error accessing microphone:', err);
        });
    }
  }, []);

  // Reset state when item changes
  useEffect(() => {
    setRecognizedText('');
    setFeedback({ type: null, message: '' });
    setAttempts(0);
    setUserAudio(null);
  }, [item]);

  const playAudio = () => {
    setIsPlaying(true);
    
    if (item.audio_file) {
      const audio = new Audio(`/${item.audio_file}`);
      audio.play()
        .then(() => {
          console.log('Audio started playing successfully');
        })
        .catch(error => {
          console.warn('Audio file not available:', item.audio_file);
        })
        .finally(() => {
          setTimeout(() => setIsPlaying(false), type === 'sentences' ? 2000 : 1500);
        });
    } else {
      setTimeout(() => setIsPlaying(false), type === 'sentences' ? 2000 : 1500);
    }
  };

  const startListening = () => {
    if (!recognition || !isSupported) {
      setFeedback({ 
        type: 'error', 
        message: 'Speech recognition is not available.' 
      });
      return;
    }

    setRecognizedText('');
    setFeedback({ type: 'neutral', message: 'Get ready to speak...' });
    
    // Start recording user's voice
    if (mediaRecorder && mediaRecorder.state === 'inactive') {
      const audioChunks: BlobPart[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        setUserAudio(audioBlob);
      };
      
      mediaRecorder.start();
    }

    try {
      recognition.start();
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setFeedback({ 
        type: 'error', 
        message: 'Could not start listening. Please try again!' 
      });
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
    }
    setIsListening(false);
  };

  const checkPronunciation = (spokenText: string) => {
    const targetText = item.kannada.toLowerCase().trim();
    const spokenTextLower = spokenText.toLowerCase().trim();
    
    setAttempts(prev => prev + 1);

    // Simple similarity check
    const similarity = calculateSimilarity(targetText, spokenTextLower);
    
    if (similarity > 0.7) { // 70% similarity threshold
      setFeedback({ 
        type: 'success', 
        message: getSuccessMessage() 
      });
      if (onPronunciationSuccess) {
        onPronunciationSuccess();
      }
    } else if (similarity > 0.4) { // 40% similarity - close but not quite
      setFeedback({ 
        type: 'neutral', 
        message: 'Almost there! Try speaking a bit clearer.' 
      });
    } else {
      setFeedback({ 
        type: 'error', 
        message: getEncouragementMessage() 
      });
    }

    // Stop recording
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
    }
  };

  const calculateSimilarity = (target: string, spoken: string): number => {
    const maxLength = Math.max(target.length, spoken.length);
    if (maxLength === 0) return 1;
    
    const distance = levenshteinDistance(target, spoken);
    return 1 - (distance / maxLength);
  };

  const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
    
    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
    
    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }
    
    return matrix[str2.length][str1.length];
  };

  const getSuccessMessage = (): string => {
    const messages = [
      '✅ Excellent pronunciation! ಅದ್ಭುತ!',
      '✅ Perfect! You nailed it! 🎉',
      '✅ Great job! Keep it up! 🌟',
      '✅ Wonderful! You sound great! 👏',
      '✅ Outstanding! ಚೆನ್ನಾಗಿದೆ! 🎊'
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getEncouragementMessage = (): string => {
    const messages = [
      '⚡ Try again! Listen carefully first.',
      '⚡ Keep practicing! You\'re getting better!',
      '⚡ Don\'t give up! Try speaking slower.',
      '⚡ Almost there! Listen and repeat.',
      '⚡ Practice makes perfect! Try once more.'
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const playUserAudio = () => {
    if (userAudio) {
      const audioUrl = URL.createObjectURL(userAudio);
      const audio = new Audio(audioUrl);
      audio.play()
        .then(() => {
          console.log('User audio played successfully');
        })
        .catch(error => {
          console.error('Error playing user audio:', error);
        });
    }
  };

  const resetAttempt = () => {
    setRecognizedText('');
    setFeedback({ type: null, message: '' });
    setUserAudio(null);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 rounded-2xl p-6 shadow-lg animate-glow">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center">
          <Mic className="h-6 w-6 mr-2 text-red-500 animate-sparkle" />
          Practice Speaking
        </h3>
        
        {/* Audio Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button
            onClick={playAudio}
            disabled={isPlaying}
            className={`bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white px-6 py-3 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 animate-glow ${
              isPlaying ? 'animate-rainbow scale-110' : 'hover:scale-110'
            }`}
          >
            <Volume2 className="inline-block mr-2 h-5 w-5 animate-sparkle" />
            {isPlaying ? 'Playing...' : 'Listen'}
          </button>
          
          {/* Speech Recognition Button */}
          {isSupported && (
            <button
              onClick={isListening ? stopListening : startListening}
              disabled={!isSupported}
              className={`px-6 py-3 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 animate-glow ${
                isListening
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse scale-110'
                  : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:scale-110'
              }`}
            >
              {isListening ? (
                <>
                  <MicOff className="inline-block mr-2 h-5 w-5 animate-sparkle" />
                  Stop Speaking
                </>
              ) : (
                <>
                  <Mic className="inline-block mr-2 h-5 w-5 animate-sparkle" />
                  🎤 Speak Now
                </>
              )}
            </button>
          )}
          
          {/* Reset Button */}
          {(recognizedText || feedback.message) && (
            <button
              onClick={resetAttempt}
              className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-glow"
            >
              <RotateCcw className="inline-block mr-2 h-4 w-4" />
              Reset
            </button>
          )}
        </div>
        
        {/* Recognition Results */}
        {recognizedText && (
          <div className="bg-white/80 rounded-2xl p-4 mb-4 shadow-lg">
            <div className="text-lg font-semibold text-gray-800 mb-2">
              What you said:
            </div>
            <div className="text-xl font-bold text-blue-600 mb-4">
              "{recognizedText}"
            </div>
            
            {/* Play User Audio Button */}
            {userAudio && (
              <button
                onClick={playUserAudio}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Play className="inline-block mr-2 h-4 w-4" />
                Play My Voice
              </button>
            )}
          </div>
        )}
        
        {/* Feedback Display */}
        {feedback.message && (
          <div className={`animate-fadeIn mb-4 p-4 rounded-2xl shadow-lg ${
            feedback.type === 'success' 
              ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' 
              : feedback.type === 'error'
              ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white'
              : 'bg-gradient-to-r from-blue-400 to-indigo-500 text-white'
          }`}>
            <div className="text-xl font-bold mb-2">
              {feedback.message}
            </div>
            {attempts > 0 && (
              <div className="text-lg opacity-90">
                Attempts: {attempts}
              </div>
            )}
          </div>
        )}
        
        {/* Browser Support Warning */}
        {!isSupported && (
          <div className="bg-yellow-100 border border-yellow-400 rounded-xl p-4 mb-4">
            <div className="text-yellow-800 font-semibold">
              ⚠️ Speech recognition is not supported in this browser.
            </div>
            <div className="text-yellow-700 text-sm mt-2">
              Please use Chrome, Edge, or Safari for the best experience.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeechPracticeModule;