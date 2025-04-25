import React, { createContext, useContext, useState } from 'react';

interface UserContextType {
  isConnected: boolean;
  user: UserData | null;
  connectWallet: () => void;
  disconnectWallet: () => void;
  level: number;
  xp: number;
  username: string;
  mockPredictionHistory: PredictionRecord[];
  hasCompletedOnboarding: boolean;
  completeOnboarding: (username: string) => void;
}

interface UserData {
  address: string;
  username: string;
  level: number;
  xp: number;
  totalWon: number;
  predictionsMade: number;
  successRate: number;
  avatar: string;
  preferences: {
    darkMode: boolean;
    notifications: boolean;
    riskLevel: 'conservative' | 'moderate' | 'aggressive';
    favoriteTokens: ('BTC' | 'ETH' | 'SOL' | 'MATIC')[];
  };
}

export interface PredictionRecord {
  id: string;
  token: 'BTC' | 'ETH' | 'SOL' | 'MATIC';
  direction: 'up' | 'down';
  stake: number;
  result: 'win' | 'loss' | 'pending';
  timeframe: '1m' | '5m' | '15m' | '1h' | '4h' | '1d';
  timestamp: number;
  payout?: number;
}

const mockUser: UserData = {
  address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
  username: '',
  level: 1,
  xp: 0,
  totalWon: 0,
  predictionsMade: 0,
  successRate: 0,
  avatar: '',
  preferences: {
    darkMode: true,
    notifications: true,
    riskLevel: 'moderate',
    favoriteTokens: ['BTC', 'ETH']
  }
};

const mockPredictions: PredictionRecord[] = [
  {
    id: '1',
    token: 'BTC',
    direction: 'up',
    stake: 0.05,
    result: 'win',
    timeframe: '5m',
    timestamp: Date.now() - 3600000,
    payout: 0.12,
  },
  {
    id: '2',
    token: 'ETH',
    direction: 'down',
    stake: 0.1,
    result: 'loss',
    timeframe: '15m',
    timestamp: Date.now() - 7200000,
  },
  {
    id: '3',
    token: 'SOL',
    direction: 'up',
    stake: 0.5,
    result: 'win',
    timeframe: '1h',
    timestamp: Date.now() - 86400000,
    payout: 0.85,
  },
  {
    id: '4',
    token: 'MATIC',
    direction: 'up',
    stake: 0.25,
    result: 'pending',
    timeframe: '1m',
    timestamp: Date.now() - 30000,
  },
];

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  const connectWallet = () => {
    setIsConnected(true);
    setUser(mockUser);
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setUser(null);
    setHasCompletedOnboarding(false);
  };

  const completeOnboarding = (username: string) => {
    if (user) {
      setUser({
        ...user,
        username
      });
      setHasCompletedOnboarding(true);
    }
  };

  return (
    <UserContext.Provider
      value={{
        isConnected,
        user,
        connectWallet,
        disconnectWallet,
        level: user?.level || 0,
        xp: user?.xp || 0,
        username: user?.username || '',
        mockPredictionHistory: mockPredictions,
        hasCompletedOnboarding,
        completeOnboarding
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};