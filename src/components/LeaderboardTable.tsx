import React from 'react';
import { motion } from 'framer-motion';
import TokenBadge from './ui/TokenBadge';

interface LeaderboardEntry {
  id: string;
  rank: number;
  username: string;
  avatar: string;
  level: number;
  winStreak: number;
  totalWinnings: number;
  favoriteToken: 'BTC' | 'ETH' | 'SOL' | 'MATIC';
  winRate: number;
}

// Mock data
const mockLeaderboardData: LeaderboardEntry[] = [
  {
    id: '1',
    rank: 1,
    username: 'CryptoWizard',
    avatar: 'https://i.pravatar.cc/150?u=cryptowizard',
    level: 32,
    winStreak: 8,
    totalWinnings: 145.32,
    favoriteToken: 'ETH',
    winRate: 0.78,
  },
  {
    id: '2',
    rank: 2,
    username: 'TokenTitan',
    avatar: 'https://i.pravatar.cc/150?u=tokentitan',
    level: 28,
    winStreak: 6,
    totalWinnings: 118.45,
    favoriteToken: 'BTC',
    winRate: 0.72,
  },
  {
    id: '3',
    rank: 3,
    username: 'BlockchainBaron',
    avatar: 'https://i.pravatar.cc/150?u=blockchainbaron',
    level: 26,
    winStreak: 4,
    totalWinnings: 94.21,
    favoriteToken: 'SOL',
    winRate: 0.69,
  },
  {
    id: '4',
    rank: 4,
    username: 'SatoshiSurfer',
    avatar: 'https://i.pravatar.cc/150?u=satoshisurfer',
    level: 24,
    winStreak: 3,
    totalWinnings: 82.17,
    favoriteToken: 'MATIC',
    winRate: 0.67,
  },
  {
    id: '5',
    rank: 5,
    username: 'ETHExplorer',
    avatar: 'https://i.pravatar.cc/150?u=ethexplorer',
    level: 22,
    winStreak: 2,
    totalWinnings: 76.54,
    favoriteToken: 'ETH',
    winRate: 0.65,
  },
  {
    id: '6',
    rank: 6,
    username: 'MoonMaker',
    avatar: 'https://i.pravatar.cc/150?u=moonmaker',
    level: 21,
    winStreak: 1,
    totalWinnings: 68.32,
    favoriteToken: 'BTC',
    winRate: 0.63,
  },
  {
    id: '7',
    rank: 7,
    username: 'CoinCollector',
    avatar: 'https://i.pravatar.cc/150?u=coincollector',
    level: 20,
    winStreak: 0,
    totalWinnings: 65.12,
    favoriteToken: 'SOL',
    winRate: 0.61,
  },
  {
    id: '8',
    rank: 8,
    username: 'DeFiDiva',
    avatar: 'https://i.pravatar.cc/150?u=defidiva',
    level: 19,
    winStreak: 0,
    totalWinnings: 59.87,
    favoriteToken: 'MATIC',
    winRate: 0.59,
  },
  {
    id: '9',
    rank: 9,
    username: 'OnChainOracle',
    avatar: 'https://i.pravatar.cc/150?u=onchainoracle',
    level: 18,
    winStreak: 0,
    totalWinnings: 54.21,
    favoriteToken: 'ETH',
    winRate: 0.58,
  },
  {
    id: '10',
    rank: 10,
    username: 'CryptoPunk',
    avatar: 'https://i.pravatar.cc/150?u=cryptopunk',
    level: 17,
    winStreak: 0,
    totalWinnings: 48.76,
    favoriteToken: 'BTC',
    winRate: 0.56,
  },
];

const LeaderboardTable: React.FC = () => {
  return (
    <div className="w-full overflow-hidden rounded-lg shadow-md">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-background-darker border-b border-gray-750">
            <tr>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
                Rank
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
                User
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
                Level
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
                Streak
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
                Favorite
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
                Win Rate
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
                Total Winnings
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-750">
            {mockLeaderboardData.map((entry, index) => (
              <motion.tr 
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`
                  ${index < 3 ? 'bg-background-card' : 'bg-background-darker'}
                  hover:bg-gray-850 transition-colors
                `}
              >
                <td className="py-3 px-4 whitespace-nowrap">
                  <div className={`
                    flex items-center justify-center w-8 h-8 rounded-full font-bold
                    ${index === 0 ? 'bg-yellow-500 text-black' : ''}
                    ${index === 1 ? 'bg-gray-400 text-black' : ''}
                    ${index === 2 ? 'bg-amber-700 text-white' : ''}
                    ${index > 2 ? 'bg-gray-800 text-gray-300' : ''}
                  `}>
                    {entry.rank}
                  </div>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img 
                      src={entry.avatar} 
                      alt={entry.username} 
                      className="w-8 h-8 rounded-full mr-3 border border-gray-750"
                    />
                    <div>
                      <div className="font-medium text-white">{entry.username}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">
                    {entry.level}
                  </div>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <div className={`
                    inline-flex items-center px-2 py-1 rounded text-xs font-medium
                    ${entry.winStreak > 0 ? 'bg-success bg-opacity-20 text-success' : 'bg-gray-800 text-gray-400'}
                  `}>
                    {entry.winStreak > 0 ? `🔥 ${entry.winStreak}` : '-'}
                  </div>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <TokenBadge token={entry.favoriteToken} size="sm" />
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full" 
                      style={{ 
                        width: `${entry.winRate * 100}%`,
                        backgroundColor: `var(--tw-neon-${
                          entry.favoriteToken === 'BTC' ? 'btc' : 
                          entry.favoriteToken === 'ETH' ? 'eth' : 
                          entry.favoriteToken === 'SOL' ? 'sol' : 'matic'
                        })`,
                      }}
                    ></div>
                  </div>
                  <div className="text-xs mt-1 text-gray-400">
                    {(entry.winRate * 100).toFixed(0)}%
                  </div>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">
                    {entry.totalWinnings.toFixed(2)} ETH
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardTable;