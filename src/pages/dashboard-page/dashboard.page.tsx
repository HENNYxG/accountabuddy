import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, 
  faCheck, 
  faUserPlus, 
  faPlusCircle,
  faBell,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import HamburgerMenu from "../../components/ui-elements/hamburger-menu.component";
import { UIContext } from "../../contexts/ui.context";
import useMediaQuery from "../../utils/mediaquery";

// Import Bento Cards
import HabitsBentoCard from "../../components/dashboard/habits-bento-card.component";
import BuddiesBentoCard from "../../components/dashboard/buddies-bento-card.component";
import ActivityBentoCard from "../../components/dashboard/activity-bento-card.component";
import TrendsBentoCard from "../../components/dashboard/trends-bento-card.component";
import MotivationBentoCard from "../../components/dashboard/motivation-bento-card.component";
import QuickStatsBentoCard from "../../components/dashboard/quick-stats-bento-card.component";

const DashboardPage = () => {
  const { mobileWebsiteView } = useContext(UIContext);
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [isFabOpen, setIsFabOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const quickActions = [
    {
      icon: faCheck,
      label: "Quick Complete",
      action: () => console.log("Quick complete"),
      color: "bg-green-500"
    },
    {
      icon: faUserPlus,
      label: "Add Friend",
      action: () => console.log("Add friend"),
      color: "bg-blue-500"
    },
    {
      icon: faPlusCircle,
      label: "Add Habit",
      action: () => console.log("Add habit"),
      color: "bg-purple-500"
    },
    {
      icon: faBell,
      label: "Check In",
      action: () => console.log("Check in"),
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="max-xl:flex-col gap-4 w-full flex flex-row p-3 relative min-h-screen">
      <div className="flex-grow">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-5 rounded-md flex justify-between mb-6 shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <div className="flex flex-col relative">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Welcome back! Here's your progress overview
            </p>
          </div>
          
          {/* Mobile Hamburger Menu Only */}
          {isMobile && (
            <div className="flex items-center">
              <HamburgerMenu />
            </div>
          )}
        </motion.div>
        
        {/* Bento Board Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-20"
        >
          {/* Row 1: Large Cards */}
          <motion.div variants={cardVariants} className="lg:col-span-2">
            <HabitsBentoCard />
          </motion.div>
          
          <motion.div variants={cardVariants}>
            <MotivationBentoCard />
          </motion.div>
          
          {/* Row 2: Medium Cards */}
          <motion.div variants={cardVariants}>
            <BuddiesBentoCard />
          </motion.div>
          
          <motion.div variants={cardVariants}>
            <ActivityBentoCard />
          </motion.div>
          
          <motion.div variants={cardVariants}>
            <QuickStatsBentoCard />
          </motion.div>
          
          {/* Row 3: Full Width Card */}
          <motion.div variants={cardVariants} className="lg:col-span-3">
            <TrendsBentoCard />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 max-sm:bottom-4 max-sm:right-4 z-50">
        <AnimatePresence>
          {isFabOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 right-0 mb-4 max-sm:bottom-14 max-sm:mb-2"
            >
              <div className="flex flex-col gap-3 items-end max-sm:gap-2">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 max-sm:gap-2"
                  >
                    <span className="text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm whitespace-nowrap max-sm:text-xs max-sm:px-2">
                      {action.label}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={action.action}
                      className={`w-12 h-12 max-sm:w-10 max-sm:h-10 ${action.color} text-white rounded-full shadow-lg flex items-center justify-center`}
                    >
                      <FontAwesomeIcon icon={action.icon} className="text-sm max-sm:text-xs" />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main FAB Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsFabOpen(!isFabOpen)}
          className="w-14 h-14 max-sm:w-12 max-sm:h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
        >
          <AnimatePresence mode="wait">
            {isFabOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FontAwesomeIcon icon={faTimes} className="text-lg max-sm:text-base" />
              </motion.div>
            ) : (
              <motion.div
                key="plus"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FontAwesomeIcon icon={faPlus} className="text-lg max-sm:text-base" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
};

export default DashboardPage;
