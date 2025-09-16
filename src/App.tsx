import React, { useState, useEffect } from 'react';
import kannadaAudioMap from '../public/Kannada_Audio_Mapping.json';
import kannadaNumbers from '../public/Kannada_Numbers_Audio.json';
import kannadaColors from '../public/Kannada_Colors_Audio.json';
import kannadaGreetings from '../public/Kannada_Greetings_Audio.json';
import kannadaAnimals from '../public/Kannada_Animals_Audio.json';
import kannadaSentences from '../public/Kannada_Sentences_Audio.json';
import kannadaBodyParts from '../public/Kannada_BodyParts_Audio.json';
import Header from './components/Header';
import Navigation from './components/Navigation';
import WelcomeScreen from './components/WelcomeScreen';
import LearningCategoryScreen from './components/LearningCategoryScreen';
import GamesCategoryScreen from './components/GamesCategoryScreen';
import LearnLetter from './components/LearnLetter';
import LearnColor from './components/LearnColor';
import LearnGreetings from './components/LearnGreetings';
import LearnAnimal from './components/LearnAnimal';
import PracticeMatch from './components/PracticeMatch';
import WordBuilder from './components/WordBuilder';
import MiniGame from './components/MiniGame';
import LandingPage from './components/LandingPage';
import AuthScreen from './components/AuthScreen';
import SignInPage from './components/SignInPage';
import CountNumbers from './components/CountNumbers';
import SignUpPage from './components/SignUpPage';
import Celebration from './components/Celebration';
import LearnSentences from './components/LearnSentences';
import LearnBodyPart from './components/LearnBodyPart';
import Speak from './components/Speak';

// Convert JSON object to application format
const allLetters = Object.entries(kannadaAudioMap).map(([english, data]) => ({
  letter: data.kannada,
  englishTranslation: english,
  audio: data.audioFile,
}));

// Convert colors JSON to application format
const allColors = kannadaColors.map((colorData) => ({
  color: colorData.kannada,
  englishTranslation: colorData.english,
  audio: colorData.audio_file,
}));

// Convert animals JSON to application format
const allAnimals = kannadaAnimals.map((animalData) => ({
  animal: animalData.kannada,
  englishTranslation: animalData.english,
  audio: animalData.audio_file,
}));

// Convert body parts JSON to application format
const allBodyParts = kannadaBodyParts.map((bodyPartData) => ({
  bodyPart: bodyPartData.kannada,
  englishTranslation: bodyPartData.english,
  audio: bodyPartData.audio_file,
}));

const practiceQuestions = [
  {
    targetLetter: 'ಅ',
    options: ['ಅ', 'ಆ', 'ಇ', 'ಈ'],
  },
  {
    targetLetter: 'ಆ',
    options: ['ಅ', 'ಆ', 'ಉ', 'ಊ'],
  },
  {
    targetLetter: 'ಇ',
    options: ['ಇ', 'ಈ', 'ಎ', 'ಏ'],
  },
  {
    targetLetter: 'ಈ',
    options: ['ಅ', 'ಇ', 'ಈ', 'ಐ'],
  },
  {
    targetLetter: 'ಉ',
    options: ['ಉ', 'ಊ', 'ಋ', 'ಎ'],
  },
  {
    targetLetter: 'ಊ',
    options: ['ಉ', 'ಊ', 'ಓ', 'ಔ'],
  },
  {
    targetLetter: 'ಎ',
    options: ['ಎ', 'ಏ', 'ಐ', 'ಒ'],
  },
  {
    targetLetter: 'ಏ',
    options: ['ಎ', 'ಏ', 'ಐ', 'ಔ'],
  },
];

const allWordData = [
  {
    word: 'ಅಮ್ಮ',
    letters: ['ಅ', 'ಮ'],
    meaning: 'Mother',
    audioFile: 'amma.mp3'
  },
  {
    word: 'ಅಪ್ಪ',
    letters: ['ಅ', 'ಪ'],
    meaning: 'Father',
    audioFile: 'appa.mp3'
  },
  {
    word: 'ಅಜ್ಜಿ',
    letters: ['ಅ', 'ಜ'],
    meaning: 'Grandmother',
    audioFile: 'ajji.mp3'
  },
  {
    word: 'ಅಣ್ಣ',
    letters: ['ಅ', 'ಣ'],
    meaning: 'Elder Brother',
    audioFile: 'anna.mp3'
  },
  {
    word: 'ಅಕ್ಕ',
    letters: ['ಅ', 'ಕ'],
    meaning: 'Elder Sister',
    audioFile: 'akka.mp3'
  },
  {
    word: 'ಮನೆ',
    letters: ['ಮ', 'ನ', 'ಎ'],
    meaning: 'House',
    audioFile: 'mane.mp3'
  },
  {
    word: 'ನೀರು',
    letters: ['ನ', 'ಈ', 'ರ', 'ಉ'],
    meaning: 'Water',
    audioFile: 'neeru.mp3'
  },
  {
    word: 'ಬಿಸಿ',
    letters: ['ಬ', 'ಇ', 'ಸ', 'ಇ'],
    meaning: 'Hot',
    audioFile: 'bisi.mp3'
  },
  {
    word: 'ಕಿವಿ',
    letters: ['ಕ', 'ಇ', 'ವ', 'ಇ'],
    meaning: 'Ear',
    audioFile: 'kivi.mp3'
  },
  {
    word: 'ನಾಯಿ',
    letters: ['ನ', 'ಆ', 'ಯ', 'ಇ'],
    meaning: 'Dog',
    audioFile: 'nayi.mp3'
  },
  {
    word: 'ಹುಲಿ',
    letters: ['ಹ', 'ಉ', 'ಲ', 'ಇ'],
    meaning: 'Tiger',
    audioFile: 'huli.mp3'
  },
  {
    word: 'ಗಿಡ',
    letters: ['ಗ', 'ಇ', 'ಡ'],
    meaning: 'Plant',
    audioFile: 'gida.mp3'
  },
  {
    word: 'ನೆಲ',
    letters: ['ನ', 'ಎ', 'ಲ'],
    meaning: 'Ground',
    audioFile: 'nela.mp3'
  },
  {
    word: 'ಬಾಳೆ',
    letters: ['ಬ', 'ಆ', 'ಳ', 'ಎ'],
    meaning: 'Banana',
    audioFile: 'bale.mp3'
  },
  {
    word: 'ಕಣ್ಣು',
    letters: ['ಕ', 'ಣ', 'ಉ'],
    meaning: 'Eye',
    audioFile: 'kannu.mp3'
  },
  {
    word: 'ಕೈ',
    letters: ['ಕ', 'ಐ'],
    meaning: 'Hand',
    audioFile: 'kai.mp3'
  },
  {
    word: 'ಮೇಲೆ',
    letters: ['ಮ', 'ಏ', 'ಲ', 'ಎ'],
    meaning: 'Above',
    audioFile: 'mele.mp3'
  },
  {
    word: 'ಕೀಲು',
    letters: ['ಕ', 'ಈ', 'ಲ', 'ಉ'],
    meaning: 'Joint',
    audioFile: 'keelu.mp3'
  },
  {
    word: 'ತಲೆ',
    letters: ['ತ', 'ಲ', 'ಎ'],
    meaning: 'Head',
    audioFile: 'thale.mp3'
  },
  {
    word: 'ಮೂರು',
    letters: ['ಮ', 'ಊ', 'ರ', 'ಉ'],
    meaning: 'Three',
    audioFile: 'mooru.mp3'
  }
];

const miniGameQuestions = [
  // Word Questions
  {
    type: 'word' as const,
    target: {
      word: 'ಅಮ್ಮ',
      englishTranslation: 'Mother',
      audioFile: 'amma.mp3',
    },
    options: [
      {
        word: 'ಅಮ್ಮ',
        englishTranslation: 'Mother',
        audioFile: 'amma.mp3',
      },
      {
        word: 'ಅಕ್ಕ',
        englishTranslation: 'Elder Sister',
        audioFile: 'akka.mp3',
      },
      {
        word: 'ಅಪ್ಪ',
        englishTranslation: 'Father',
        audioFile: 'appa.mp3',
      },
    ],
  },
  {
    type: 'word' as const,
    target: {
      word: 'ಮನೆ',
      englishTranslation: 'House',
      audioFile: 'mane.mp3',
    },
    options: [
      {
        word: 'ಮನೆ',
        englishTranslation: 'House',
        audioFile: 'mane.mp3',
      },
      {
        word: 'ನೀರು',
        englishTranslation: 'Water',
        audioFile: 'neeru.mp3',
      },
      {
        word: 'ನಾಯಿ',
        englishTranslation: 'Dog',
        audioFile: 'nayi.mp3',
      },
    ],
  },
  {
    type: 'word' as const,
    target: {
      word: 'ನಾಯಿ',
      englishTranslation: 'Dog',
      audioFile: 'nayi.mp3',
    },
    options: [
      {
        word: 'ನಾಯಿ',
        englishTranslation: 'Dog',
        audioFile: 'nayi.mp3',
      },
      {
        word: 'ಹುಲಿ',
        englishTranslation: 'Tiger',
        audioFile: 'huli.mp3',
      },
      {
        word: 'ನೀರು',
        englishTranslation: 'Water',
        audioFile: 'neeru.mp3',
      },
    ],
  },
  // Color Questions
  {
    type: 'color' as const,
    target: {
      word: 'ಕೆಂಪು',
      englishTranslation: 'red',
      audioFile: 'red.mp3',
    },
    options: [
      {
        word: 'ಕೆಂಪು',
        englishTranslation: 'red',
        audioFile: 'red.mp3',
      },
      {
        word: 'ನೀಲಿ',
        englishTranslation: 'blue',
        audioFile: 'blue.mp3',
      },
      {
        word: 'ಹಸಿರು',
        englishTranslation: 'green',
        audioFile: 'green.mp3',
      },
    ],
  },
  {
    type: 'color' as const,
    target: {
      word: 'ಹಳದಿ',
      englishTranslation: 'yellow',
      audioFile: 'yellow.mp3',
    },
    options: [
      {
        word: 'ಹಳದಿ',
        englishTranslation: 'yellow',
        audioFile: 'yellow.mp3',
      },
      {
        word: 'ಕಿತ್ತಳೆ',
        englishTranslation: 'orange',
        audioFile: 'orange.mp3',
      },
      {
        word: 'ನೇರಳೆ',
        englishTranslation: 'purple',
        audioFile: 'purple.mp3',
      },
    ],
  },
  {
    type: 'color' as const,
    target: {
      word: 'ಗುಲಾಬಿ',
      englishTranslation: 'pink',
      audioFile: 'pink.mp3',
    },
    options: [
      {
        word: 'ಗುಲಾಬಿ',
        englishTranslation: 'pink',
        audioFile: 'pink.mp3',
      },
      {
        word: 'ಕಪ್ಪು',
        englishTranslation: 'black',
        audioFile: 'black.mp3',
      },
      {
        word: 'ಬಿಳಿ',
        englishTranslation: 'white',
        audioFile: 'white.mp3',
      },
    ],
  },
  // Number Questions
  {
    type: 'number' as const,
    target: {
      word: 'ಒಂದು',
      englishTranslation: 'one',
      audioFile: 'one.mp3',
    },
    options: [
      {
        word: 'ಒಂದು',
        englishTranslation: 'one',
        audioFile: 'one.mp3',
      },
      {
        word: 'ಎರಡು',
        englishTranslation: 'two',
        audioFile: 'two.mp3',
      },
      {
        word: 'ಮೂರು',
        englishTranslation: 'three',
        audioFile: 'three.mp3',
      },
    ],
  },
  {
    type: 'number' as const,
    target: {
      word: 'ಐದು',
      englishTranslation: 'five',
      audioFile: 'five.mp3',
    },
    options: [
      {
        word: 'ಐದು',
        englishTranslation: 'five',
        audioFile: 'five.mp3',
      },
      {
        word: 'ಆರು',
        englishTranslation: 'six',
        audioFile: 'six.mp3',
      },
      {
        word: 'ಏಳು',
        englishTranslation: 'seven',
        audioFile: 'seven.mp3',
      },
    ],
  },
  {
    type: 'number' as const,
    target: {
      word: 'ಹತ್ತು',
      englishTranslation: 'ten',
      audioFile: 'ten.mp3',
    },
    options: [
      {
        word: 'ಹತ್ತು',
        englishTranslation: 'ten',
        audioFile: 'ten.mp3',
      },
      {
        word: 'ಒಂಬತ್ತು',
        englishTranslation: 'nine',
        audioFile: 'nine.mp3',
      },
      {
        word: 'ಎಂಟು',
        englishTranslation: 'eight',
        audioFile: 'eight.mp3',
      },
    ],
  },
  // Animal Questions
  {
    type: 'animal' as const,
    target: {
      word: 'ನಾಯಿ',
      englishTranslation: 'dog',
      audioFile: 'nayi.mp3',
    },
    options: [
      {
        word: 'ನಾಯಿ',
        englishTranslation: 'dog',
        audioFile: 'nayi.mp3',
      },
      {
        word: 'ಬೆಕ್ಕು',
        englishTranslation: 'cat',
        audioFile: 'bekku.mp3',
      },
      {
        word: 'ಹುಲಿ',
        englishTranslation: 'tiger',
        audioFile: 'huli.mp3',
      },
    ],
  },
  {
    type: 'animal' as const,
    target: {
      word: 'ಆನೆ',
      englishTranslation: 'elephant',
      audioFile: 'aane.mp3',
    },
    options: [
      {
        word: 'ಆನೆ',
        englishTranslation: 'elephant',
        audioFile: 'aane.mp3',
      },
      {
        word: 'ಸಿಂಹ',
        englishTranslation: 'lion',
        audioFile: 'simha.mp3',
      },
      {
        word: 'ಕರಡಿ',
        englishTranslation: 'bear',
        audioFile: 'karadi.mp3',
      },
    ],
  },
  {
    type: 'animal' as const,
    target: {
      word: 'ಕೋತಿ',
      englishTranslation: 'monkey',
      audioFile: 'koti.mp3',
    },
    options: [
      {
        word: 'ಕೋತಿ',
        englishTranslation: 'monkey',
        audioFile: 'koti.mp3',
      },
      {
        word: 'ಮೊಲ',
        englishTranslation: 'rabbit',
        audioFile: 'mola.mp3',
      },
      {
        word: 'ಮೇಕೆ',
        englishTranslation: 'goat',
        audioFile: 'meke.mp3',
      },
    ],
  },
];

function App() {
  const [currentMode, setCurrentMode] = useState(() => {
    const savedMode = localStorage.getItem('kannadaKatta_currentMode');
    return savedMode || 'auth';
  });
  const [currentLetterIndex, setCurrentLetterIndex] = useState(() => {
    const savedIndex = localStorage.getItem('kannadaKatta_currentLetterIndex');
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });
  const [currentColorIndex, setCurrentColorIndex] = useState(() => {
    const savedIndex = localStorage.getItem('kannadaKatta_currentColorIndex');
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(() => {
    const savedIndex = localStorage.getItem('kannadaKatta_currentGreetingIndex');
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(() => {
    const savedIndex = localStorage.getItem('kannadaKatta_currentAnimalIndex');
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });
  const [currentPracticeQuestionIndex, setCurrentPracticeQuestionIndex] = useState(() => {
    const savedIndex = localStorage.getItem('kannadaKatta_currentPracticeQuestionIndex');
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });
  const [currentWordIndex, setCurrentWordIndex] = useState(() => {
    const savedIndex = localStorage.getItem('kannadaKatta_currentWordIndex');
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });
  const [currentMiniGameQuestionIndex, setCurrentMiniGameQuestionIndex] = useState(() => {
    const savedIndex = localStorage.getItem('kannadaKatta_currentMiniGameQuestionIndex');
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });
  const [currentNumberIndex, setCurrentNumberIndex] = useState(() => {
    const savedIndex = localStorage.getItem('kannadaKatta_currentNumberIndex');
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(() => {
    const savedIndex = localStorage.getItem('kannadaKatta_currentSentenceIndex');
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });
  const [currentBodyPartIndex, setCurrentBodyPartIndex] = useState(() => {
    const savedIndex = localStorage.getItem('kannadaKatta_currentBodyPartIndex');
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });
  const [currentSpeakColorIndex, setCurrentSpeakColorIndex] = useState(() => {
    const savedIndex = localStorage.getItem('kannadaKatta_currentSpeakColorIndex');
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });
  const [currentSpeakNumberIndex, setCurrentSpeakNumberIndex] = useState(() => {
    const savedIndex = localStorage.getItem('kannadaKatta_currentSpeakNumberIndex');
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });
  const [currentSpeakGreetingIndex, setCurrentSpeakGreetingIndex] = useState(() => {
    const savedIndex = localStorage.getItem('kannadaKatta_currentSpeakGreetingIndex');
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });
  const [currentSpeakBodyPartIndex, setCurrentSpeakBodyPartIndex] = useState(() => {
    const savedIndex = localStorage.getItem('kannadaKatta_currentSpeakBodyPartIndex');
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });
  const [currentSpeakSentenceIndex, setCurrentSpeakSentenceIndex] = useState(() => {
    const savedIndex = localStorage.getItem('kannadaKatta_currentSpeakSentenceIndex');
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });
  const [currentSpeakAnimalIndex, setCurrentSpeakAnimalIndex] = useState(() => {
    const savedIndex = localStorage.getItem('kannadaKatta_currentSpeakAnimalIndex');
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });
  const [stars, setStars] = useState(() => {
    const savedStars = localStorage.getItem('kannadaKatta_stars');
    return savedStars ? parseInt(savedStars, 10) : 0;
  });
  const [badges, setBadges] = useState<string[]>(() => {
    const savedBadges = localStorage.getItem('kannadaKatta_badges');
    return savedBadges ? JSON.parse(savedBadges) : [];
  });
  const [showResumePrompt, setShowResumePrompt] = useState(false);
  const [celebration, setCelebration] = useState<{
    type: 'star' | 'badge';
    message: string;
  } | null>(null);

  // Save current mode to localStorage whenever it changes
  useEffect(() => {
    console.log('🔍 Debug - Saving currentMode to localStorage:', currentMode);
    
    // Only save actual learning/game modes, not navigation or auth modes
    const learningModes = [
      'learn', 'colors', 'greetings', 'animals', 'words', 'count', 'sentences', 'bodyparts',
      'speak-colors', 'speak-numbers', 'speak-greetings', 'speak-bodyparts', 'speak-sentences',
      'practice', 'game'
    ];
    
    if (learningModes.includes(currentMode)) {
      localStorage.setItem('kannadaKatta_currentMode', currentMode);
      console.log('🔍 Debug - Saved learning mode to localStorage:', currentMode);
    } else {
      console.log('🔍 Debug - Skipped saving navigation/auth mode:', currentMode);
    }
  }, [currentMode]);

  // Save current indices to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('kannadaKatta_currentLetterIndex', currentLetterIndex.toString());
  }, [currentLetterIndex]);

  useEffect(() => {
    localStorage.setItem('kannadaKatta_currentColorIndex', currentColorIndex.toString());
  }, [currentColorIndex]);

  useEffect(() => {
    localStorage.setItem('kannadaKatta_currentGreetingIndex', currentGreetingIndex.toString());
  }, [currentGreetingIndex]);

  useEffect(() => {
    localStorage.setItem('kannadaKatta_currentAnimalIndex', currentAnimalIndex.toString());
  }, [currentAnimalIndex]);

  useEffect(() => {
    localStorage.setItem('kannadaKatta_currentPracticeQuestionIndex', currentPracticeQuestionIndex.toString());
  }, [currentPracticeQuestionIndex]);

  useEffect(() => {
    localStorage.setItem('kannadaKatta_currentWordIndex', currentWordIndex.toString());
  }, [currentWordIndex]);

  useEffect(() => {
    localStorage.setItem('kannadaKatta_currentMiniGameQuestionIndex', currentMiniGameQuestionIndex.toString());
  }, [currentMiniGameQuestionIndex]);

  useEffect(() => {
    localStorage.setItem('kannadaKatta_currentNumberIndex', currentNumberIndex.toString());
  }, [currentNumberIndex]);

  useEffect(() => {
    localStorage.setItem('kannadaKatta_currentSentenceIndex', currentSentenceIndex.toString());
  }, [currentSentenceIndex]);

  useEffect(() => {
    localStorage.setItem('kannadaKatta_currentBodyPartIndex', currentBodyPartIndex.toString());
  }, [currentBodyPartIndex]);

  useEffect(() => {
    localStorage.setItem('kannadaKatta_currentSpeakColorIndex', currentSpeakColorIndex.toString());
  }, [currentSpeakColorIndex]);

  useEffect(() => {
    localStorage.setItem('kannadaKatta_currentSpeakNumberIndex', currentSpeakNumberIndex.toString());
  }, [currentSpeakNumberIndex]);

  useEffect(() => {
    localStorage.setItem('kannadaKatta_currentSpeakGreetingIndex', currentSpeakGreetingIndex.toString());
  }, [currentSpeakGreetingIndex]);

  useEffect(() => {
    localStorage.setItem('kannadaKatta_currentSpeakBodyPartIndex', currentSpeakBodyPartIndex.toString());
  }, [currentSpeakBodyPartIndex]);

  useEffect(() => {
    localStorage.setItem('kannadaKatta_currentSpeakSentenceIndex', currentSpeakSentenceIndex.toString());
  }, [currentSpeakSentenceIndex]);

  useEffect(() => {
    localStorage.setItem('kannadaKatta_currentSpeakAnimalIndex', currentSpeakAnimalIndex.toString());
  }, [currentSpeakAnimalIndex]);

  // Save stars to localStorage whenever stars change
  useEffect(() => {
    localStorage.setItem('kannadaKatta_stars', stars.toString());
  }, [stars]);

  // Save badges to localStorage whenever badges change
  useEffect(() => {
    localStorage.setItem('kannadaKatta_badges', JSON.stringify(badges));
  }, [badges]);

  const handleSuccess = (type: 'learn' | 'practice' | 'words' | 'game') => {
    setStars(prev => prev + 1);
    
    let message = '';
    switch (type) {
      case 'practice':
        message = 'Great matching skills!';
        break;
      case 'words':
        message = 'Word building master!';
        break;
      case 'game':
        message = 'Game champion!';
        break;
      case 'learn':
        message = 'Learning champion!';
        break;
    }
    
    // Celebration disabled for practice questions
    // if (type !== 'learn') {
    //   setCelebration({ type: 'star', message });
    // }
    
    // Check for badge unlock
    const newStarCount = stars + 1;
    if (newStarCount === 5 && !badges.includes('Swara Hero')) {
      setTimeout(() => {
        setBadges(prev => [...prev, 'Swara Hero']);
        setCelebration({ type: 'badge', message: 'Swara Hero Badge Unlocked!' });
      }, 3500);
    }
    
    if (newStarCount === 10 && !badges.includes('Kannada Pronouncer')) {
      setTimeout(() => {
        setBadges(prev => [...prev, 'Kannada Pronouncer']);
        setCelebration({ type: 'badge', message: 'Kannada Pronouncer Badge Unlocked!' });
      }, 3500);
    }
  };

  const handleCountComplete = () => {
    handleSuccess('learn');
    
    const nextIndex = currentNumberIndex + 1;
    if (nextIndex >= kannadaNumbers.length) {
      // All numbers completed, go back to welcome
      setCurrentNumberIndex(0);
      setCurrentMode('learning-category');
    } else {
      // Move to next number
      setCurrentNumberIndex(nextIndex);
    }
  };

  const handleLearnLetterNavigation = (direction: 'next' | 'previous') => {
    if (direction === 'next') {
      const nextIndex = currentLetterIndex + 1;
      if (nextIndex >= allLetters.length) {
        // All letters completed, go back to welcome
        setCurrentLetterIndex(0);
        setCurrentMode('learning-category');
        handleSuccess('learn');
      } else {
        // Move to next letter
        setCurrentLetterIndex(nextIndex);
      }
    } else if (direction === 'previous') {
      const prevIndex = currentLetterIndex - 1;
      if (prevIndex >= 0) {
        setCurrentLetterIndex(prevIndex);
      }
    }
  };

  const handleLearnLetterComplete = () => {
    const nextIndex = currentLetterIndex + 1;
    if (nextIndex >= allLetters.length) {
      // All letters completed, go back to welcome
      setCurrentLetterIndex(0);
      setCurrentMode('learning-category');
      handleSuccess('learn');
    } else {
      // Move to next letter
      setCurrentLetterIndex(nextIndex);
    }
  };

  const handleLearnColorNavigation = (direction: 'next' | 'previous') => {
    if (direction === 'next') {
      const nextIndex = currentColorIndex + 1;
      if (nextIndex >= allColors.length) {
        // All colors completed, go back to welcome
        setCurrentColorIndex(0);
        setCurrentMode('learning-category');
        handleSuccess('learn');
      } else {
        // Move to next color
        setCurrentColorIndex(nextIndex);
      }
    } else if (direction === 'previous') {
      const prevIndex = currentColorIndex - 1;
      if (prevIndex >= 0) {
        setCurrentColorIndex(prevIndex);
      }
    }
  };

  const handleLearnAnimalNavigation = (direction: 'next' | 'previous') => {
    if (direction === 'next') {
      const nextIndex = currentAnimalIndex + 1;
      if (nextIndex >= allAnimals.length) {
        // All animals completed, go back to learning category
        setCurrentAnimalIndex(0);
        setCurrentMode('learning-category');
        handleSuccess('learn');
      } else {
        // Move to next animal
        setCurrentAnimalIndex(nextIndex);
      }
    } else if (direction === 'previous') {
      const prevIndex = currentAnimalIndex - 1;
      if (prevIndex >= 0) {
        setCurrentAnimalIndex(prevIndex);
      }
    }
  };

  const handleLearnGreetingsNavigation = (direction: 'next' | 'previous') => {
    if (direction === 'next') {
      const nextIndex = currentGreetingIndex + 1;
      if (nextIndex >= kannadaGreetings.length) {
        // All greetings completed, go back to welcome
        setCurrentGreetingIndex(0);
        setCurrentMode('learning-category');
        handleSuccess('learn');
      } else {
        // Move to next greeting
        setCurrentGreetingIndex(nextIndex);
      }
    } else if (direction === 'previous') {
      const prevIndex = currentGreetingIndex - 1;
      if (prevIndex >= 0) {
        setCurrentGreetingIndex(prevIndex);
      }
    }
  };

  const handleLearnSentencesNavigation = (direction: 'next' | 'previous') => {
    if (direction === 'next') {
      const nextIndex = currentSentenceIndex + 1;
      if (nextIndex >= kannadaSentences.length) {
        // All sentences completed, go back to learning category
        setCurrentSentenceIndex(0);
        setCurrentMode('learning-category');
        handleSuccess('learn');
      } else {
        // Move to next sentence
        setCurrentSentenceIndex(nextIndex);
      }
    } else if (direction === 'previous') {
      const prevIndex = currentSentenceIndex - 1;
      if (prevIndex >= 0) {
        setCurrentSentenceIndex(prevIndex);
      }
    }
  };

  const handleLearnBodyPartNavigation = (direction: 'next' | 'previous') => {
    if (direction === 'next') {
      const nextIndex = currentBodyPartIndex + 1;
      if (nextIndex >= allBodyParts.length) {
        // All body parts completed, go back to learning category
        setCurrentBodyPartIndex(0);
        setCurrentMode('learning-category');
        handleSuccess('learn');
      } else {
        // Move to next body part
        setCurrentBodyPartIndex(nextIndex);
      }
    } else if (direction === 'previous') {
      const prevIndex = currentBodyPartIndex - 1;
      if (prevIndex >= 0) {
        setCurrentBodyPartIndex(prevIndex);
      }
    }
  };

  const handleSpeakColorNavigation = (direction: 'next' | 'previous') => {
    if (direction === 'next') {
      const nextIndex = currentSpeakColorIndex + 1;
      if (nextIndex >= allColors.length) {
        // All colors completed, go back to speak category
        setCurrentSpeakColorIndex(0);
        setCurrentMode('speak-category');
        handleSuccess('learn');
      } else {
        // Move to next color
        setCurrentSpeakColorIndex(nextIndex);
      }
    } else if (direction === 'previous') {
      const prevIndex = currentSpeakColorIndex - 1;
      if (prevIndex >= 0) {
        setCurrentSpeakColorIndex(prevIndex);
      }
    }
  };

  const handleSpeakNumberNavigation = (direction: 'next' | 'previous') => {
    if (direction === 'next') {
      const nextIndex = currentSpeakNumberIndex + 1;
      if (nextIndex >= kannadaNumbers.length) {
        // All numbers completed, go back to speak category
        setCurrentSpeakNumberIndex(0);
        setCurrentMode('speak-category');
        handleSuccess('learn');
      } else {
        // Move to next number
        setCurrentSpeakNumberIndex(nextIndex);
      }
    } else if (direction === 'previous') {
      const prevIndex = currentSpeakNumberIndex - 1;
      if (prevIndex >= 0) {
        setCurrentSpeakNumberIndex(prevIndex);
      }
    }
  };

  const handleSpeakGreetingNavigation = (direction: 'next' | 'previous') => {
    if (direction === 'next') {
      const nextIndex = currentSpeakGreetingIndex + 1;
      if (nextIndex >= kannadaGreetings.length) {
        // All greetings completed, go back to speak category
        setCurrentSpeakGreetingIndex(0);
        setCurrentMode('speak-category');
        handleSuccess('learn');
      } else {
        // Move to next greeting
        setCurrentSpeakGreetingIndex(nextIndex);
      }
    } else if (direction === 'previous') {
      const prevIndex = currentSpeakGreetingIndex - 1;
      if (prevIndex >= 0) {
        setCurrentSpeakGreetingIndex(prevIndex);
      }
    }
  };

  const handleSpeakBodyPartNavigation = (direction: 'next' | 'previous') => {
    if (direction === 'next') {
      const nextIndex = currentSpeakBodyPartIndex + 1;
      if (nextIndex >= allBodyParts.length) {
        // All body parts completed, go back to speak category
        setCurrentSpeakBodyPartIndex(0);
        setCurrentMode('speak-category');
        handleSuccess('learn');
      } else {
        // Move to next body part
        setCurrentSpeakBodyPartIndex(nextIndex);
      }
    } else if (direction === 'previous') {
      const prevIndex = currentSpeakBodyPartIndex - 1;
      if (prevIndex >= 0) {
        setCurrentSpeakBodyPartIndex(prevIndex);
      }
    }
  };

  const handleSpeakSentenceNavigation = (direction: 'next' | 'previous') => {
    if (direction === 'next') {
      const nextIndex = currentSpeakSentenceIndex + 1;
      if (nextIndex >= kannadaSentences.length) {
        // All sentences completed, go back to speak category
        setCurrentSpeakSentenceIndex(0);
        setCurrentMode('learning-category');
        handleSuccess('learn');
      } else {
        // Move to next sentence
        setCurrentSpeakSentenceIndex(nextIndex);
      }
    } else if (direction === 'previous') {
      const prevIndex = currentSpeakSentenceIndex - 1;
      if (prevIndex >= 0) {
        setCurrentSpeakSentenceIndex(prevIndex);
      }
    }
  };

  const handleSpeakAnimalNavigation = (direction: 'next' | 'previous') => {
    if (direction === 'next') {
      const nextIndex = currentSpeakAnimalIndex + 1;
      if (nextIndex >= allAnimals.length) {
        // All animals completed, go back to learning category
        setCurrentSpeakAnimalIndex(0);
        setCurrentMode('learning-category');
        handleSuccess('learn');
      } else {
        // Move to next animal
        setCurrentSpeakAnimalIndex(nextIndex);
      }
    } else if (direction === 'previous') {
      const prevIndex = currentSpeakAnimalIndex - 1;
      if (prevIndex >= 0) {
        setCurrentSpeakAnimalIndex(prevIndex);
      }
    }
  };

  const handlePracticeMatchComplete = () => {
    handleSuccess('practice');
    
    const nextIndex = currentPracticeQuestionIndex + 1;
    if (nextIndex >= practiceQuestions.length) {
      // All practice questions completed, go back to welcome
      setCurrentPracticeQuestionIndex(0);
      setCurrentMode('games-category');
    } else {
      // Move to next question
      setCurrentPracticeQuestionIndex(nextIndex);
    }
  };

  const handleWordBuilderComplete = () => {
    handleSuccess('words');
  };

  const handleWordBuilderNavigation = (direction: 'next' | 'previous') => {
    if (direction === 'next') {
      const nextIndex = currentWordIndex + 1;
      if (nextIndex >= allWordData.length) {
        // All words completed, go back to welcome
        setCurrentWordIndex(0);
        setCurrentMode('learning-category');
      } else {
        // Move to next word
        setCurrentWordIndex(nextIndex);
      }
    } else if (direction === 'previous') {
      const prevIndex = currentWordIndex - 1;
      if (prevIndex >= 0) {
        setCurrentWordIndex(prevIndex);
      }
    }
  };

  const handleMiniGameComplete = () => {
    handleSuccess('game');
    
    const nextIndex = currentMiniGameQuestionIndex + 1;
    if (nextIndex >= miniGameQuestions.length) {
      // All mini game questions completed, go back to welcome
      setCurrentMiniGameQuestionIndex(0);
      setCurrentMode('games-category');
    } else {
      // Move to next question
      setCurrentMiniGameQuestionIndex(nextIndex);
    }
  };

  const closeCelebration = () => {
    setCelebration(null);
  };

  const handleSignOut = () => {
    setCurrentMode('auth');
  };

  const handleSignUpSuccess = () => {
    setCurrentMode('landing');
  };

  const handleGoHome = () => {
    setCurrentMode('welcome');
  };

  const handleSignInSuccess = () => {
    // Check if there's saved learning progress
    const savedMode = localStorage.getItem('kannadaKatta_currentMode');
    const savedLetterIndex = localStorage.getItem('kannadaKatta_currentLetterIndex');
    const savedColorIndex = localStorage.getItem('kannadaKatta_currentColorIndex');
    const savedGreetingIndex = localStorage.getItem('kannadaKatta_currentGreetingIndex');
    const savedAnimalIndex = localStorage.getItem('kannadaKatta_currentAnimalIndex');
    const savedWordIndex = localStorage.getItem('kannadaKatta_currentWordIndex');
    const savedNumberIndex = localStorage.getItem('kannadaKatta_currentNumberIndex');
    const savedSentenceIndex = localStorage.getItem('kannadaKatta_currentSentenceIndex');
    const savedBodyPartIndex = localStorage.getItem('kannadaKatta_currentBodyPartIndex');
    
    console.log('🔍 Debug - savedMode from localStorage:', savedMode);
    console.log('🔍 Debug - savedLetterIndex:', savedLetterIndex);
    console.log('🔍 Debug - savedColorIndex:', savedColorIndex);
    
    // Check if there's a saved learning mode OR any progress indices > 0
    const hasLearningMode = savedMode && !['auth', 'signup', 'signin', 'landing', 'welcome', 'learning-category', 'games-category'].includes(savedMode);
    const hasProgressIndices = (
      (savedLetterIndex && parseInt(savedLetterIndex, 10) > 0) ||
      (savedColorIndex && parseInt(savedColorIndex, 10) > 0) ||
      (savedGreetingIndex && parseInt(savedGreetingIndex, 10) > 0) ||
      (savedAnimalIndex && parseInt(savedAnimalIndex, 10) > 0) ||
      (savedWordIndex && parseInt(savedWordIndex, 10) > 0) ||
      (savedNumberIndex && parseInt(savedNumberIndex, 10) > 0) ||
      (savedSentenceIndex && parseInt(savedSentenceIndex, 10) > 0) ||
      (savedBodyPartIndex && parseInt(savedBodyPartIndex, 10) > 0)
    );
    
    const hasProgress = hasLearningMode || hasProgressIndices;
    console.log('🔍 Debug - hasLearningMode:', hasLearningMode);
    console.log('🔍 Debug - hasProgressIndices:', hasProgressIndices);
    console.log('🔍 Debug - hasProgress calculated:', hasProgress);
    console.log('🔍 Debug - showResumePrompt before setting:', showResumePrompt);
    
    if (hasProgress) {
      setShowResumePrompt(true);
      console.log('🔍 Debug - setShowResumePrompt(true) called');
    } else {
      console.log('🔍 Debug - No progress found, not showing resume prompt');
    }
    
    setCurrentMode('welcome');
    console.log('🔍 Debug - setCurrentMode("welcome") called');
  };

  const handleResumeGame = () => {
    // Load all saved progress from localStorage
    const savedMode = localStorage.getItem('kannadaKatta_currentMode');
    const savedLetterIndex = localStorage.getItem('kannadaKatta_currentLetterIndex');
    const savedColorIndex = localStorage.getItem('kannadaKatta_currentColorIndex');
    const savedGreetingIndex = localStorage.getItem('kannadaKatta_currentGreetingIndex');
    const savedAnimalIndex = localStorage.getItem('kannadaKatta_currentAnimalIndex');
    const savedPracticeQuestionIndex = localStorage.getItem('kannadaKatta_currentPracticeQuestionIndex');
    const savedWordIndex = localStorage.getItem('kannadaKatta_currentWordIndex');
    const savedMiniGameQuestionIndex = localStorage.getItem('kannadaKatta_currentMiniGameQuestionIndex');
    const savedNumberIndex = localStorage.getItem('kannadaKatta_currentNumberIndex');
    const savedSentenceIndex = localStorage.getItem('kannadaKatta_currentSentenceIndex');
    const savedBodyPartIndex = localStorage.getItem('kannadaKatta_currentBodyPartIndex');
    const savedSpeakColorIndex = localStorage.getItem('kannadaKatta_currentSpeakColorIndex');
    const savedSpeakNumberIndex = localStorage.getItem('kannadaKatta_currentSpeakNumberIndex');
    const savedSpeakGreetingIndex = localStorage.getItem('kannadaKatta_currentSpeakGreetingIndex');
    const savedSpeakBodyPartIndex = localStorage.getItem('kannadaKatta_currentSpeakBodyPartIndex');
    const savedSpeakSentenceIndex = localStorage.getItem('kannadaKatta_currentSpeakSentenceIndex');
    const savedSpeakAnimalIndex = localStorage.getItem('kannadaKatta_currentSpeakAnimalIndex');

    // Set all the saved states
    if (savedMode) setCurrentMode(savedMode);
    if (savedLetterIndex) setCurrentLetterIndex(parseInt(savedLetterIndex, 10));
    if (savedColorIndex) setCurrentColorIndex(parseInt(savedColorIndex, 10));
    if (savedGreetingIndex) setCurrentGreetingIndex(parseInt(savedGreetingIndex, 10));
    if (savedAnimalIndex) setCurrentAnimalIndex(parseInt(savedAnimalIndex, 10));
    if (savedPracticeQuestionIndex) setCurrentPracticeQuestionIndex(parseInt(savedPracticeQuestionIndex, 10));
    if (savedWordIndex) setCurrentWordIndex(parseInt(savedWordIndex, 10));
    if (savedMiniGameQuestionIndex) setCurrentMiniGameQuestionIndex(parseInt(savedMiniGameQuestionIndex, 10));
    if (savedNumberIndex) setCurrentNumberIndex(parseInt(savedNumberIndex, 10));
    if (savedSentenceIndex) setCurrentSentenceIndex(parseInt(savedSentenceIndex, 10));
    if (savedBodyPartIndex) setCurrentBodyPartIndex(parseInt(savedBodyPartIndex, 10));
    if (savedSpeakColorIndex) setCurrentSpeakColorIndex(parseInt(savedSpeakColorIndex, 10));
    if (savedSpeakNumberIndex) setCurrentSpeakNumberIndex(parseInt(savedSpeakNumberIndex, 10));
    if (savedSpeakGreetingIndex) setCurrentSpeakGreetingIndex(parseInt(savedSpeakGreetingIndex, 10));
    if (savedSpeakBodyPartIndex) setCurrentSpeakBodyPartIndex(parseInt(savedSpeakBodyPartIndex, 10));
    if (savedSpeakSentenceIndex) setCurrentSpeakSentenceIndex(parseInt(savedSpeakSentenceIndex, 10));
    if (savedSpeakAnimalIndex) setCurrentSpeakAnimalIndex(parseInt(savedSpeakAnimalIndex, 10));

    setShowResumePrompt(false);
  };

  const handleWelcomeModeSelect = (mode: string) => {
    setCurrentMode(mode);
    setShowResumePrompt(false);
  };

  const renderCurrentMode = () => {
    switch (currentMode) {
      case 'auth':
        return (
          <AuthScreen 
            onSignUp={() => setCurrentMode('signup')}
            onSignIn={() => setCurrentMode('signin')}
          />
        );
      case 'welcome':
        return (
          <WelcomeScreen 
            onModeSelect={handleWelcomeModeSelect} 
            showResumePrompt={showResumePrompt}
            onResumeGame={handleResumeGame}
          />
        );
      case 'learning-category':
        return (
          <LearningCategoryScreen 
            onModeSelect={setCurrentMode} 
            onBack={() => setCurrentMode('welcome')}
          />
        );
      case 'games-category':
        return (
          <GamesCategoryScreen 
            onModeSelect={setCurrentMode} 
            onBack={() => setCurrentMode('welcome')}
          />
        );
      case 'learn':
        const currentLetter = allLetters[currentLetterIndex];
        return (
          <LearnLetter
            letter={currentLetter.letter}
            englishTranslation={currentLetter.englishTranslation}
            audioFile={currentLetter.audio}
            currentIndex={currentLetterIndex}
            totalLetters={allLetters.length}
            onNavigate={handleLearnLetterNavigation}
          />
        );
      case 'practice':
        const currentPracticeQuestion = practiceQuestions[currentPracticeQuestionIndex];
        const targetLetterData = allLetters.find(letter => letter.letter === currentPracticeQuestion.targetLetter);
        return (
          <PracticeMatch
            targetLetter={currentPracticeQuestion.targetLetter}
            options={currentPracticeQuestion.options}
            targetAudioFile={targetLetterData?.audio || ''}
            onSuccess={handlePracticeMatchComplete}
          />
        );
      case 'colors':
        const currentColor = allColors[currentColorIndex];
        return (
          <LearnColor
            color={currentColor.color}
            englishTranslation={currentColor.englishTranslation}
            audioFile={currentColor.audio}
            currentIndex={currentColorIndex}
            totalColors={allColors.length}
            onNavigate={handleLearnColorNavigation}
          />
        );
      case 'greetings':
        return (
          <LearnGreetings
            greetings={kannadaGreetings}
            currentIndex={currentGreetingIndex}
            totalGreetings={kannadaGreetings.length}
            onNavigate={handleLearnGreetingsNavigation}
          />
        );
      case 'animals':
        const currentAnimal = allAnimals[currentAnimalIndex];
        return (
          <LearnAnimal
            animal={currentAnimal.animal}
            englishTranslation={currentAnimal.englishTranslation}
            audioFile={currentAnimal.audio}
            currentIndex={currentAnimalIndex}
            totalAnimals={allAnimals.length}
            onNavigate={handleLearnAnimalNavigation}
          />
        );
      case 'words':
        const currentWordData = allWordData[currentWordIndex];
        return (
          <WordBuilder
            word={currentWordData.word}
            letters={currentWordData.letters}
            meaning={currentWordData.meaning}
            audioFile={currentWordData.audioFile}
            letterAudioData={allLetters}
            onWordComplete={handleWordBuilderComplete}
            currentIndex={currentWordIndex}
            totalWords={allWordData.length}
            onNavigate={handleWordBuilderNavigation}
          />
        );
      case 'game':
        const currentMiniGameQuestion = miniGameQuestions[currentMiniGameQuestionIndex];
        return (
          <MiniGame
            question={currentMiniGameQuestion}
            onSuccess={handleMiniGameComplete}
          />
        );
      case 'count':
        return (
          <CountNumbers
            numbers={kannadaNumbers}
            onComplete={handleCountComplete}
          />
        );
      case 'sentences':
        return (
          <LearnSentences
            sentences={kannadaSentences}
            currentIndex={currentSentenceIndex}
            totalSentences={kannadaSentences.length}
            onNavigate={handleLearnSentencesNavigation}
          />
        );
      case 'bodyparts':
        const currentBodyPart = allBodyParts[currentBodyPartIndex];
        return (
          <LearnBodyPart
            bodyPart={currentBodyPart.bodyPart}
            englishTranslation={currentBodyPart.englishTranslation}
            audioFile={currentBodyPart.audio}
            currentIndex={currentBodyPartIndex}
            totalBodyParts={allBodyParts.length}
            onNavigate={handleLearnBodyPartNavigation}
          />
        );
      case 'speak-category':
        return (
          <Speak
            type="colors"
            data={kannadaColors}
            currentIndex={currentSpeakColorIndex}
            totalItems={kannadaColors.length}
            onNavigate={handleSpeakColorNavigation}
          />
        );
      case 'speak-colors':
        return (
          <Speak
            type="colors"
            data={kannadaColors}
            currentIndex={currentSpeakColorIndex}
            totalItems={kannadaColors.length}
            onNavigate={handleSpeakColorNavigation}
          />
        );
      case 'speak-numbers':
        return (
          <Speak
            type="numbers"
            data={kannadaNumbers}
            currentIndex={currentSpeakNumberIndex}
            totalItems={kannadaNumbers.length}
            onNavigate={handleSpeakNumberNavigation}
          />
        );
      case 'speak-greetings':
        return (
          <Speak
            type="greetings"
            data={kannadaGreetings}
            currentIndex={currentSpeakGreetingIndex}
            totalItems={kannadaGreetings.length}
            onNavigate={handleSpeakGreetingNavigation}
          />
        );
      case 'speak-bodyparts':
        return (
          <Speak
            type="bodyparts"
            data={kannadaBodyParts}
            currentIndex={currentSpeakBodyPartIndex}
            totalItems={kannadaBodyParts.length}
            onNavigate={handleSpeakBodyPartNavigation}
          />
        );
      case 'speak-sentences':
        return (
          <Speak
            type="sentences"
            data={kannadaSentences}
            currentIndex={currentSpeakSentenceIndex}
            totalItems={kannadaSentences.length}
            onNavigate={handleSpeakSentenceNavigation}
          />
        );
      case 'speak-animals':
        return (
          <Speak
            type="animals"
            data={kannadaAnimals}
            currentIndex={currentSpeakAnimalIndex}
            totalItems={kannadaAnimals.length}
            onNavigate={handleSpeakAnimalNavigation}
          />
        );
      case 'signup':
        return (
          <SignUpPage
            onSignUpSuccess={handleSignUpSuccess}
            onBack={() => setCurrentMode('auth')}
          />
        );
      case 'signin':
        return (
          <SignInPage
            onSignInSuccess={handleSignInSuccess}
            onBack={() => setCurrentMode('auth')}
          />
        );
      case 'landing':
        return (
          <LandingPage
            onGoHome={handleGoHome}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col animated-bg">
      {/* Floating decorative elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 floating-orb rounded-full animate-float animate-sparkle"></div>
        <div className="absolute top-32 right-20 w-16 h-16 floating-orb rounded-full animate-float animate-glow" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 floating-orb rounded-full animate-float animate-rainbow" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-32 right-10 w-18 h-18 floating-orb rounded-full animate-float animate-bounce-gentle" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 floating-orb rounded-full animate-float animate-sparkle" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-14 h-14 floating-orb rounded-full animate-float animate-glow" style={{animationDelay: '5s'}}></div>
        <div className="absolute top-20 left-1/2 w-10 h-10 floating-orb rounded-full animate-float animate-rainbow" style={{animationDelay: '6s'}}></div>
        <div className="absolute bottom-40 right-1/4 w-22 h-22 floating-orb rounded-full animate-float animate-sparkle" style={{animationDelay: '7s'}}></div>
      </div>
      
      <Header 
        stars={stars} 
        badges={badges} 
        onSignOut={handleSignOut}
        isAuthenticated={!['auth', 'signup', 'signin', 'landing'].includes(currentMode)}
      />
      
      <main className="pb-32 flex-grow overflow-y-auto">
        {renderCurrentMode()}
      </main>
      
      {!['auth', 'signup', 'signin', 'landing'].includes(currentMode) && (
        <Navigation 
          currentMode={currentMode} 
          onModeChange={setCurrentMode} 
        />
      )}
      
      {celebration && (
        <Celebration
          type={celebration.type}
          message={celebration.message}
          onClose={closeCelebration}
        />
      )}
    </div>
  );
}

export default App;
