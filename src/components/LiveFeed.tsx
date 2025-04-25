import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TokenBadge from './ui/TokenBadge';

type Token = 'BTC' | 'ETH' | 'SOL' | 'MATIC';
type Direction = 'up' | 'down';
type Timeframe = '1m' | '5m' | '15m' | '1h' | '4h' | '1d';

interface LiveEvent {
  id: string;
  username: string;
  token: Token;
  direction: Direction;
  timeframe: Timeframe;
  amount: number;
  timestamp: number;
}

// Mock data generator
const generateMockEvent = (): LiveEvent => {
  const tokens: Token[] = ['BTC', 'ETH', 'SOL', 'MATIC'];
  const directions: Direction[] = ['up', 'down'];
  const timeframes: Timeframe[] = ['1m', '5m', '15m', '1h', '4h', '1d'];
  const usernames = [
    'CryptoWhale', 'BlockchainBaron', 'TokenTrader', 
    'SatoshiSurfer', 'ETHExplorer', 'MoonMaker',
    'CoinCollector', 'DeFiDiva', 'OnChainOracle'
  ];
  
  return {
    id: Math.random().toString(36).substring(2, 10),
    username: usernames[Math.floor(Math.random() * usernames.length)],
    token: tokens[Math.floor(Math.random() * tokens.length)],
    direction: directions[Math.floor(Math.random() * directions.length)],
    timeframe: timeframes[Math.floor(Math.random() * timeframes.length)],
    amount: parseFloat((Math.random() * 2 + 0.05).toFixed(2)),
    timestamp: Date.now()
  };
};

const LiveFeed: React.FC = () => {
  const [events, setEvents] = useState<LiveEvent[]>([]);
  
  // Generate initial events
  useEffect(() => {
    const initialEvents = Array(5).fill(null).map(() => generateMockEvent());
    setEvents(initialEvents);
    
    // Add new event every few seconds
    const interval = setInterval(() => {
      const newEvent = generateMockEvent();
      setEvents(prev => [newEvent, ...prev.slice(0, 9)]);
    }, 3000 + Math.random() * 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="w-full">
      <h3 className="text-lg font-orbitron mb-4 text-gray-300">Live Activity</h3>
      
      <div className="overflow-hidden">
        <AnimatePresence>
          {events.map((event) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-3 p-3 bg-background-card rounded-md border border-gray-750"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TokenBadge token={event.token} size="sm" showName={false} />
                  <div className="ml-2">
                    <span className="text-sm font-medium">@{event.username}</span>
                    <div className="text-xs text-gray-400 flex items-center">
                      <span className={`mr-1 ${
                        event.direction === 'up' ? 'text-success' : 'text-error'
                      }`}>
                        {event.direction === 'up' ? '↑' : '↓'}
                      </span>
                      <span>{event.timeframe}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{event.amount} ETH</div>
                  <div className="text-xs text-gray-500">
                    {new Date(event.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LiveFeed;