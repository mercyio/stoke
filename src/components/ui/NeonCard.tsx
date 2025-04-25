import React from 'react';
import { motion } from 'framer-motion';

interface NeonCardProps {
  children: React.ReactNode;
  className?: string;
  color?: 'btc' | 'eth' | 'sol' | 'matic' | null;
  onClick?: () => void;
  hover?: boolean;
  animate?: boolean;
}

const neonColorMap = {
  btc: 'var(--tw-neon-btc, #FFA500)',
  eth: 'var(--tw-neon-eth, #9B5DE5)',
  sol: 'var(--tw-neon-sol, #00F5D4)',
  matic: 'var(--tw-neon-matic, #845EC2)',
};

const NeonCard: React.FC<NeonCardProps> = ({
  children,
  className = '',
  color = null,
  onClick,
  hover = false,
  animate = false,
}) => {
  const neonColor = color ? neonColorMap[color] : null;
  
  return (
    <motion.div
      className={`cyberpunk-card ${color ? 'cyberpunk-card-accent' : ''} ${className}`}
      style={color ? { '--neon-color': neonColor } as React.CSSProperties : undefined}
      onClick={onClick}
      whileHover={hover ? { y: -5, boxShadow: color ? `0 0 15px ${neonColor}` : undefined } : undefined}
      animate={animate ? { y: [0, -5, 0] } : undefined}
      transition={animate ? { duration: 2, repeat: Infinity, repeatType: 'reverse' } : undefined}
    >
      {children}
    </motion.div>
  );
};

export default NeonCard;