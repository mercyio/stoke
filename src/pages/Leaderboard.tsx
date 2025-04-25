import React from 'react';
import { motion } from 'framer-motion';
import LeaderboardTable from '../components/LeaderboardTable';
import NeonHeading from '../components/ui/NeonHeading';

const Leaderboard: React.FC = () => {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <NeonHeading color="btc" level={2} className="mb-4">
          Leaderboard
        </NeonHeading>
        <p className="text-gray-400">
          Top predictors based on win rate and total earnings
        </p>
      </div>
      
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-2">
          <select className="bg-background-card text-white border border-gray-750 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neon-eth">
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="all-time">All Time</option>
          </select>
          
          <select className="bg-background-card text-white border border-gray-750 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neon-eth">
            <option value="all">All Tokens</option>
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
            <option value="SOL">SOL</option>
            <option value="MATIC">MATIC</option>
          </select>
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            className="bg-background-card text-white border border-gray-750 rounded-md pl-10 pr-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-neon-eth"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>
      
      <LeaderboardTable />
    </motion.div>
  );
};

export default Leaderboard;