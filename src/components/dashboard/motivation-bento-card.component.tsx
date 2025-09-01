import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faQuoteLeft, 
  faHeart, 
  faShare,
  faTrophy,
  faStar,
  faFire,
  faLightbulb
} from '@fortawesome/free-solid-svg-icons';
import BentoCard from './bento-card.component';

interface Quote {
  text: string;
  author: string;
  category: string;
  likes: number;
  isLiked: boolean;
}

const MotivationBentoCard: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const quotes: Quote[] = [
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
      category: "Passion",
      likes: 1247,
      isLiked: false
    },
    {
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill",
      category: "Perseverance",
      likes: 892,
      isLiked: false
    },
    {
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
      category: "Dreams",
      likes: 1563,
      isLiked: false
    }
  ];

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const currentQuoteData = quotes[currentQuote];

  return (
    <BentoCard
      title="Daily Motivation"
      subtitle="Fuel your journey"
      variant="highlight"
      interactive
      icon={
        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
          <FontAwesomeIcon icon={faLightbulb} className="text-white" />
        </div>
      }
      gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      backgroundPattern={
        <div className="absolute inset-0">
          {/* Trophy Background */}
          <div className="absolute top-4 right-4 opacity-10">
            <FontAwesomeIcon icon={faTrophy} className="text-white text-4xl" />
          </div>
          {/* Stars */}
          <div className="absolute top-1/4 left-4 opacity-20">
            <FontAwesomeIcon icon={faStar} className="text-white text-lg" />
          </div>
          <div className="absolute bottom-1/3 right-8 opacity-15">
            <FontAwesomeIcon icon={faStar} className="text-white text-sm" />
          </div>
          {/* Fire */}
          <div className="absolute bottom-4 left-1/4 opacity-10">
            <FontAwesomeIcon icon={faFire} className="text-white text-2xl" />
          </div>
        </div>
      }
    >
      <div className="relative z-10">
        {/* Quote */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuote}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-6"
          >
            <div className="flex items-start gap-3 mb-4">
              <FontAwesomeIcon 
                icon={faQuoteLeft} 
                className="text-white/60 text-xl mt-1" 
              />
              <div>
                <p className="text-white text-lg font-medium leading-relaxed mb-3">
                  "{currentQuoteData.text}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 font-medium">— {currentQuoteData.author}</p>
                    <p className="text-white/60 text-sm">{currentQuoteData.category}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={toggleLike}
                      className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                    >
                      <motion.div
                        animate={{ scale: isLiked ? [1, 1.2, 1] : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FontAwesomeIcon 
                          icon={faHeart} 
                          className={`text-sm ${isLiked ? 'text-red-400' : 'text-white/60'}`} 
                        />
                      </motion.div>
                      <span className="text-xs">{currentQuoteData.likes + (isLiked ? 1 : 0)}</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      <FontAwesomeIcon icon={faShare} className="text-sm" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mb-4">
          {quotes.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => setCurrentQuote(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentQuote 
                  ? 'bg-white scale-125' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-1 overflow-hidden">
          <motion.div
            className="h-full bg-white rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuote + 1) / quotes.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {/* Next Quote Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextQuote}
          className="mt-4 w-full py-2 bg-white/20 rounded-xl text-white font-medium hover:bg-white/30 transition-colors"
        >
          Next Quote
        </motion.button>
      </div>
    </BentoCard>
  );
};

export default MotivationBentoCard;

