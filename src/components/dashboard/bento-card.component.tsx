import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface BentoCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'highlight' | 'accent' | 'muted';
  onClick?: () => void;
  interactive?: boolean;
  icon?: ReactNode;
  gradient?: string;
  backgroundPattern?: ReactNode;
}

const BentoCard: React.FC<BentoCardProps> = ({
  title,
  subtitle,
  children,
  className = '',
  variant = 'default',
  onClick,
  interactive = false,
  icon,
  gradient,
  backgroundPattern
}) => {
  const baseClasses = `
    relative overflow-hidden rounded-2xl p-6 backdrop-blur-sm
    border border-white/10 shadow-xl
    transition-all duration-300 ease-out
    ${interactive ? 'cursor-pointer hover:scale-[1.02] hover:shadow-2xl' : ''}
    ${className}
  `;

  const variantClasses = {
    default: 'bg-white/80 dark:bg-gray-800/80',
    highlight: 'bg-gradient-to-br from-blue-500/90 to-purple-600/90 text-white',
    accent: 'bg-gradient-to-br from-orange-400/90 to-red-500/90 text-white',
    muted: 'bg-gray-50/80 dark:bg-gray-700/80'
  };

  const CardComponent = interactive ? motion.div : 'div';
  const cardProps = interactive ? {
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.98 },
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, ease: "easeOut" }
  } : {};

  return (
    <CardComponent
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
      {...cardProps}
      style={{
        background: gradient || undefined
      }}
    >
      {/* Background Pattern */}
      {backgroundPattern && (
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          {backgroundPattern}
        </div>
      )}

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {icon && (
              <div className="flex-shrink-0">
                {icon}
              </div>
            )}
            <h3 className="text-lg font-semibold tracking-tight">
              {title}
            </h3>
          </div>
          {subtitle && (
            <p className="text-sm opacity-80 font-medium">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Interactive Glow Effect */}
      {interactive && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}
    </CardComponent>
  );
};

export default BentoCard;

