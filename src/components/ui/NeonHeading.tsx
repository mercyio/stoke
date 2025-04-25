import React from 'react';
import { motion } from 'framer-motion';

interface NeonHeadingProps {
  children: React.ReactNode;
  color: 'btc' | 'eth' | 'sol' | 'matic';
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  glow?: boolean;
}

const neonColorMap = {
  btc: 'var(--tw-neon-btc, #FFA500)',
  eth: 'var(--tw-neon-eth, #9B5DE5)',
  sol: 'var(--tw-neon-sol, #00F5D4)',
  matic: 'var(--tw-neon-matic, #845EC2)',
};

export const NeonHeading: React.FC<NeonHeadingProps> = ({
  children,
  color,
  level = 2,
  className = '',
  glow = true,
}) => {
  const neonColor = neonColorMap[color];
  const sizeClasses = {
    1: 'text-4xl md:text-5xl font-bold',
    2: 'text-3xl md:text-4xl font-bold',
    3: 'text-2xl md:text-3xl font-semibold',
    4: 'text-xl md:text-2xl font-semibold',
    5: 'text-lg md:text-xl font-medium',
    6: 'text-base md:text-lg font-medium',
  }[level];
  
  const Component = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Component 
        className={`${sizeClasses} ${className}`}
        style={{ 
          color: neonColor,
          textShadow: glow ? `0 0 5px ${neonColor}, 0 0 10px ${neonColor}` : 'none',
        }}
      >
        {children}
      </Component>
    </motion.div>
  );
};

export default NeonHeading;