import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheckCircle, 
  faClock, 
  faExclamationTriangle,
  faRunning,
  faBook,
  faDumbbell,
  faAppleAlt,
  faBed,
  faWater,
  faBrain
} from '@fortawesome/free-solid-svg-icons';
import BentoCard from './bento-card.component';

interface Habit {
  id: string;
  name: string;
  icon: string;
  status: 'completed' | 'pending' | 'overdue';
  timeLeft?: string;
  streak: number;
  type: 'binary' | 'numeric';
  target?: number;
  current?: number;
}

const HabitsBentoCard: React.FC = () => {
  // Mock data - replace with real data
  const habits: Habit[] = [
    {
      id: '1',
      name: 'Morning Run',
      icon: 'running',
      status: 'pending',
      timeLeft: '2h 30m',
      streak: 7,
      type: 'binary'
    },
    {
      id: '2',
      name: 'Read 30min',
      icon: 'book',
      status: 'overdue',
      timeLeft: '1h 15m',
      streak: 12,
      type: 'binary'
    },
    {
      id: '3',
      name: 'Drink Water',
      icon: 'water',
      status: 'pending',
      streak: 5,
      type: 'numeric',
      target: 8,
      current: 3
    },
    {
      id: '4',
      name: 'Workout',
      icon: 'dumbbell',
      status: 'completed',
      streak: 15,
      type: 'binary'
    }
  ];

  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      running: faRunning,
      book: faBook,
      dumbbell: faDumbbell,
      apple: faAppleAlt,
      bed: faBed,
      water: faWater,
      brain: faBrain
    };
    return iconMap[iconName] || faRunning;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />;
      case 'overdue':
        return <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500" />;
      default:
        return <FontAwesomeIcon icon={faClock} className="text-yellow-500" />;
    }
  };

  const pendingHabits = habits.filter(h => h.status !== 'completed');

  return (
    <BentoCard
      title="Today's Habits"
      subtitle={`${pendingHabits.length} remaining`}
      variant="highlight"
      interactive
      icon={
        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
          <FontAwesomeIcon icon={faRunning} className="text-white" />
        </div>
      }
      backgroundPattern={
        <div className="absolute inset-0">
          <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/5 rounded-full"></div>
        </div>
      }
    >
      <div className="space-y-3">
        {pendingHabits.slice(0, 3).map((habit, index) => (
          <motion.div
            key={habit.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-white/10 rounded-xl backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={getIcon(habit.icon)} className="text-white text-sm" />
              </div>
              <div>
                <p className="font-medium text-white">{habit.name}</p>
                <p className="text-xs text-white/70">🔥 {habit.streak} day streak</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {habit.type === 'numeric' && (
                <div className="text-right">
                  <p className="text-xs text-white/70">{habit.current}/{habit.target}</p>
                  <div className="w-12 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white rounded-full transition-all duration-300"
                      style={{ width: `${(habit.current! / habit.target!) * 100}%` }}
                    />
                  </div>
                </div>
              )}
              {getStatusIcon(habit.status)}
              {habit.timeLeft && (
                <span className="text-xs text-white/70">{habit.timeLeft}</span>
              )}
            </div>
          </motion.div>
        ))}
        
        {pendingHabits.length > 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center pt-2"
          >
            <p className="text-sm text-white/70">
              +{pendingHabits.length - 3} more habits
            </p>
          </motion.div>
        )}
      </div>
    </BentoCard>
  );
};

export default HabitsBentoCard;

