import React from 'react';
import { motion } from 'framer-motion';
import { Bitcoin, Feather as Ethereum, CircleDashed, Hexagon as Polygon } from 'lucide-react';

interface TokenBadgeProps {
  token: 'BTC' | 'ETH' | 'SOL' | 'MATIC';
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  className?: string;
}

const tokenIconMap = {
  BTC: Bitcoin,
  ETH: Ethereum,
  SOL: CircleDashed, // Using a placeholder for SOL
  MATIC: Polygon,
};

const tokenColorMap = {
  BTC: 'var(--tw-neon-btc, #FFA500)',
  ETH: 'var(--tw-neon-eth, #9B5DE5)',
  SOL: 'var(--tw-neon-sol, #00F5D4)',
  MATIC: 'var(--tw-neon-matic, #845EC2)',
};

const sizeMap = {
  sm: { icon: 16, text: 'text-xs' },
  md: { icon: 20, text: 'text-sm' },
  lg: { icon: 24, text: 'text-base' },
};

const TokenBadge: React.FC<TokenBadgeProps> = ({
  token,
  size = 'md',
  showName = true,
  className = '',
}) => {
  const Icon = tokenIconMap[token];
  const color = tokenColorMap[token];
  const { icon: iconSize, text: textSize } = sizeMap[size];
  
  return (
    <motion.div
      className={`flex items-center gap-1.5 ${className}`}
      whileHover={{ scale: 1.05 }}
    >
      <span 
        className="p-1 rounded-full flex items-center justify-center"
        style={{ 
          backgroundColor: `rgba(${color.replace(/[^\d,]/g, '')}, 0.2)`,
          boxShadow: `0 0 5px ${color}`
        }}
      >
        <Icon size={iconSize} color={color} />
      </span>
      {showName && (
        <span 
          className={`font-medium ${textSize}`}
          style={{ color }}
        >
          {token}
        </span>
      )}
    </motion.div>
  );
};

export default TokenBadge;