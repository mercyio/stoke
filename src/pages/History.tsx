import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser, PredictionRecord } from '../contexts/UserContext';
import NeonHeading from '../components/ui/NeonHeading';
import TokenBadge from '../components/ui/TokenBadge';

// More mock data for demonstration
const mockPredictionHistory: PredictionRecord[] = [
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
  {
    id: '5',
    token: 'BTC',
    direction: 'down',
    stake: 0.15,
    result: 'win',
    timeframe: '4h',
    timestamp: Date.now() - 172800000,
    payout: 0.3,
  },
  {
    id: '6',
    token: 'ETH',
    direction: 'up',
    stake: 0.2,
    result: 'loss',
    timeframe: '1d',
    timestamp: Date.now() - 259200000,
  },
  {
    id: '7',
    token: 'SOL',
    direction: 'down',
    stake: 0.3,
    result: 'win',
    timeframe: '5m',
    timestamp: Date.now() - 345600000,
    payout: 0.65,
  },
  {
    id: '8',
    token: 'MATIC',
    direction: 'down',
    stake: 0.1,
    result: 'loss',
    timeframe: '15m',
    timestamp: Date.now() - 432000000,
  },
];

const History: React.FC = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<'all' | 'wins' | 'losses'>('all');
  const [selectedToken, setSelectedToken] = useState<string>('all');
  
  // Filter predictions based on active tab and selected token
  const filteredPredictions = mockPredictionHistory.filter(prediction => {
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'wins' && prediction.result === 'win') ||
      (activeTab === 'losses' && prediction.result === 'loss');
    
    const matchesToken = selectedToken === 'all' || prediction.token === selectedToken;
    
    return matchesTab && matchesToken;
  });
  
  // Calculate stats
  const totalStaked = mockPredictionHistory.reduce((sum, p) => sum + p.stake, 0);
  const wins = mockPredictionHistory.filter(p => p.result === 'win').length;
  const winRate = Math.round((wins / mockPredictionHistory.length) * 100);
  const totalEarned = mockPredictionHistory
    .filter(p => p.result === 'win' && p.payout)
    .reduce((sum, p) => sum + (p.payout || 0), 0);
  
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <NeonHeading color="eth" level={2} className="mb-4">
          Prediction History
        </NeonHeading>
        <p className="text-gray-400">
          Track your prediction performance over time
        </p>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { 
            title: 'Predictions Made', 
            value: mockPredictionHistory.length, 
            color: 'eth',
            suffix: ''
          },
          { 
            title: 'Win Rate', 
            value: winRate, 
            color: 'sol',
            suffix: '%'
          },
          { 
            title: 'Total Staked', 
            value: totalStaked.toFixed(2), 
            color: 'btc',
            suffix: ' ETH'
          },
          { 
            title: 'Total Earned', 
            value: totalEarned.toFixed(2), 
            color: 'sol',
            suffix: ' ETH'
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className={`bg-background-card p-4 rounded-lg border border-neon-${stat.color}`}
            style={{ '--neon-color': `var(--tw-neon-${stat.color})` } as React.CSSProperties}
            whileHover={{ y: -3 }}
          >
            <div className="text-gray-400 text-sm">{stat.title}</div>
            <div className={`text-2xl font-bold text-neon-${stat.color}`}>
              {stat.value}{stat.suffix}
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="flex space-x-1 bg-background-darker rounded-md p-1">
          <button 
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'all' ? 'bg-background-card text-white' : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button 
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'wins' ? 'bg-background-card text-white' : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('wins')}
          >
            Wins
          </button>
          <button 
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'losses' ? 'bg-background-card text-white' : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('losses')}
          >
            Losses
          </button>
        </div>
        
        <select 
          className="bg-background-card text-white border border-gray-750 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neon-eth"
          value={selectedToken}
          onChange={(e) => setSelectedToken(e.target.value)}
        >
          <option value="all">All Tokens</option>
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
          <option value="SOL">SOL</option>
          <option value="MATIC">MATIC</option>
        </select>
      </div>
      
      {/* Predictions table */}
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-lg overflow-hidden">
          <thead className="bg-background-darker">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Token
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Direction
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Timeframe
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Stake
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Result
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-background-card divide-y divide-gray-750">
            {filteredPredictions.map((prediction, index) => (
              <motion.tr 
                key={prediction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-850 transition-colors"
              >
                <td className="px-4 py-3 whitespace-nowrap">
                  <TokenBadge token={prediction.token} />
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`
                    inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${prediction.direction === 'up' 
                      ? 'bg-success bg-opacity-20 text-success' 
                      : 'bg-error bg-opacity-20 text-error'
                    }
                  `}>
                    {prediction.direction === 'up' ? '↑ Up' : '↓ Down'}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-gray-300">{prediction.timeframe}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="font-medium">{prediction.stake} ETH</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`
                    inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${prediction.result === 'win' 
                      ? 'bg-success bg-opacity-20 text-success' 
                      : prediction.result === 'loss' 
                      ? 'bg-error bg-opacity-20 text-error' 
                      : 'bg-gray-700 text-gray-300'
                    }
                  `}>
                    {prediction.result === 'win' 
                      ? `Win +${prediction.payout} ETH` 
                      : prediction.result === 'loss' 
                      ? 'Loss' 
                      : 'Pending'}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                  {new Date(prediction.timestamp).toLocaleDateString()}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredPredictions.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">No predictions found matching your filters</p>
        </div>
      )}
    </motion.div>
  );
};

export default History;