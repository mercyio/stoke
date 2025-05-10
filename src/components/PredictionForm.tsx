import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown, Timer, Wallet } from 'lucide-react';
import NeonButton from './ui/NeonButton';
import NeonCard from './ui/NeonCard';
import TokenBadge from './ui/TokenBadge';
import NeonHeading from './ui/NeonHeading';
import useConfetti from '../hooks/useConfetti';

type Token = 'BTC' | 'ETH' | 'SOL' | 'MATIC';
type Timeframe = '1w' | '2w' | '1m' | '3m' | '6m' | '1y';
type Direction = 'up' | 'down';

interface PredictionFormProps {
  onPredictionMade: (prediction: {
    token: Token;
    timeframe: Timeframe;
    amount: number;
    direction: Direction;
  }) => void;
}

const PredictionForm: React.FC<PredictionFormProps> = ({ onPredictionMade }) => {
  const [selectedToken, setSelectedToken] = useState<Token>('BTC');
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>('1m');
  const [stakeAmount, setStakeAmount] = useState<number>(0.1);
  const [pendingDirection, setPendingDirection] = useState<Direction | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const fireConfetti = useConfetti();
  
  const tokens: Token[] = ['BTC', 'ETH', 'SOL', 'MATIC'];
  const timeframes: Timeframe[] = ['1w', '2w', '1m', '3m', '6m', '1y'];
  
  // Map for displaying human-readable timeframe labels
  const timeframeLabels: Record<Timeframe, string> = {
    '1w': '1 Week',
    '2w': '2 Weeks',
    '1m': '1 Month',
    '3m': '3 Months',
    '6m': '6 Months',
    '1y': '1 Year'
  };
  
  const handleSetStakeAmount = (value: number) => {
    // Ensure value is between 0.01 and 10
    const clampedValue = Math.max(0.01, Math.min(10, value));
    setStakeAmount(parseFloat(clampedValue.toFixed(2)));
  };
  
  const handleDirectionSelect = async (direction: Direction) => {
    setPendingDirection(direction);
    setIsSubmitting(true);
    
    // Simulate prediction processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Call the onPredictionMade callback
    onPredictionMade({
      token: selectedToken,
      timeframe: selectedTimeframe,
      amount: stakeAmount,
      direction
    });
    
    // Reset form state
    setTimeout(() => {
      setPendingDirection(null);
      setIsSubmitting(false);
    }, 1000);
  };
  
  const tokenColors: Record<Token, 'btc' | 'eth' | 'sol' | 'matic'> = {
    BTC: 'btc',
    ETH: 'eth',
    SOL: 'sol',
    MATIC: 'matic'
  };
  
  const directionButtonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05 },
    pressed: { scale: 0.95 },
    selected: { scale: 1.1, y: -5 }
  };
  
  const calculateOdds = () => {
    // In a real app, odds would be calculated based on market data
    // Here we're just simulating different odds based on selected options
    const tokenMultiplier = {
      BTC: 1.0,
      ETH: 1.1,
      SOL: 1.2,
      MATIC: 1.15
    }[selectedToken];
    
    const timeframeMultiplier = {
      '1w': 1.5,
      '2w': 1.6,
      '1m': 1.8,
      '3m': 2.0,
      '6m': 2.2,
      '1y': 2.5
    }[selectedTimeframe];
    
    return (tokenMultiplier * timeframeMultiplier).toFixed(2);
  };
  
  return (
    <NeonCard className="p-6 w-full max-w-3xl mx-auto" color={tokenColors[selectedToken]}>
      <div className="mb-6">
        <NeonHeading color={tokenColors[selectedToken]} level={3}>
          Make a Prediction
        </NeonHeading>
        <p className="text-gray-400 mt-2">
          Predict where the price will be after {timeframeLabels[selectedTimeframe]}
        </p>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Select Token
        </label>
        <div className="flex flex-wrap gap-2">
          {tokens.map(token => (
            <button
              key={token}
              onClick={() => setSelectedToken(token)}
              className={`p-2 rounded-md transition-all ${
                selectedToken === token 
                  ? 'bg-gray-750 shadow-md' 
                  : 'bg-gray-850 hover:bg-gray-750'
              }`}
            >
              <TokenBadge token={token} size="md" />
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
          <Timer size={16} className="mr-1" />
          Timeframe
        </label>
        <div className="flex justify-between gap-2 overflow-x-auto pb-1">
          {timeframes.map(timeframe => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap flex-1 ${
                selectedTimeframe === timeframe 
                  ? `bg-background-card border border-neon-${tokenColors[selectedToken]} shadow-neon shadow-${tokenColors[selectedToken]}` 
                  : 'bg-gray-850 hover:bg-gray-750'
              }`}
              style={selectedTimeframe === timeframe ? {
                '--neon-color': `var(--tw-neon-${tokenColors[selectedToken]})`,
              } as React.CSSProperties : undefined}
            >
              {timeframeLabels[timeframe]}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
          <Wallet size={16} className="mr-1" />
          Stake Amount
        </label>
        <div className="flex items-center">
          <input
            type="number"
            value={stakeAmount}
            onChange={(e) => handleSetStakeAmount(parseFloat(e.target.value) || 0)}
            min="0.01"
            max="10"
            step="0.01"
            className="bg-gray-850 border border-gray-750 rounded-md px-3 py-2 w-full text-white focus:outline-none focus:ring-2 focus:ring-neon-sol"
          />
          <span className="ml-2 text-gray-400">ETH</span>
        </div>
        <div className="flex justify-between mt-2">
          <button 
            onClick={() => handleSetStakeAmount(0.05)}
            className="px-2 py-1 text-xs bg-gray-850 hover:bg-gray-750 rounded"
          >
            0.05
          </button>
          <button 
            onClick={() => handleSetStakeAmount(0.1)}
            className="px-2 py-1 text-xs bg-gray-850 hover:bg-gray-750 rounded"
          >
            0.1
          </button>
          <button 
            onClick={() => handleSetStakeAmount(0.5)}
            className="px-2 py-1 text-xs bg-gray-850 hover:bg-gray-750 rounded"
          >
            0.5
          </button>
          <button 
            onClick={() => handleSetStakeAmount(1)}
            className="px-2 py-1 text-xs bg-gray-850 hover:bg-gray-750 rounded"
          >
            1.0
          </button>
        </div>
      </div>
      
      <div className="text-center mb-4">
        <div className="text-sm font-medium text-gray-400 mb-1">
          Potential Win: <span className="text-white">{(stakeAmount * parseFloat(calculateOdds())).toFixed(2)} ETH</span>
        </div>
        <div className="text-xs text-gray-500">
          Multiplier: {calculateOdds()}x
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          variants={directionButtonVariants}
          initial="idle"
          whileHover="hover"
          whileTap="pressed"
          animate={pendingDirection === 'up' ? 'selected' : 'idle'}
        >
          <NeonButton 
            color="success" 
            className="w-full py-3" 
            onClick={() => handleDirectionSelect('up')}
            disabled={isSubmitting}
            icon={<ChevronUp />}
          >
            Going UP
          </NeonButton>
        </motion.div>
        
        <motion.div
          variants={directionButtonVariants}
          initial="idle"
          whileHover="hover"
          whileTap="pressed"
          animate={pendingDirection === 'down' ? 'selected' : 'idle'}
        >
          <NeonButton 
            color="error" 
            className="w-full py-3" 
            onClick={() => handleDirectionSelect('down')}
            disabled={isSubmitting}
            icon={<ChevronDown />}
          >
            Going DOWN
          </NeonButton>
        </motion.div>
      </div>
    </NeonCard>
  );
};

export default PredictionForm;
