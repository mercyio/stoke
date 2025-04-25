import React from 'react';
import { motion } from 'framer-motion';

interface NeonButtonProps {
  children: React.ReactNode;
  color: 'btc' | 'eth' | 'sol' | 'matic' | 'success' | 'error';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  pulse?: boolean;
  type?: 'button' | 'submit' | 'reset';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

const neonColorMap = {
  btc: 'var(--tw-neon-btc, #FFA500)',
  eth: 'var(--tw-neon-eth, #9B5DE5)',
  sol: 'var(--tw-neon-sol, #00F5D4)',
  matic: 'var(--tw-neon-matic, #845EC2)',
  success: 'var(--tw-success, #10B981)',
  error: 'var(--tw-error, #EF4444)',
};

const sizesMap = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg',
};

const NeonButton: React.FC<NeonButtonProps> = ({
  children,
  color,
  onClick,
  className,
  disabled = false,
  pulse = false,
  type = 'button',
  size = 'md',
  icon,
}) => {
  const neonColor = neonColorMap[color];
  const sizeClasses = sizesMap[size];
  
  return (
    <motion.button
      type={type}
      className={`btn-neon ${sizeClasses} ${pulse ? 'animate-glow-pulse' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className || ''}`}
      onClick={onClick}
      disabled={disabled}
      style={{ '--neon-color': neonColor } as React.CSSProperties}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      <span className="flex items-center gap-2">
        {icon && <span className="flex items-center">{icon}</span>}
        {children}
      </span>
    </motion.button>
  );
};

export default NeonButton;