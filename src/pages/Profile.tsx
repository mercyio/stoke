import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Clock, Star, Share2, Edit2 } from 'lucide-react';
import NeonHeading from '../components/ui/NeonHeading';
import NeonButton from '../components/ui/NeonButton';
import TokenBadge from '../components/ui/TokenBadge';
import { useUser } from '../contexts/UserContext';

const Profile: React.FC = () => {
  const { user, mockPredictionHistory } = useUser();
  
  if (!user) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-gray-400">Please connect your wallet to view your profile</p>
      </div>
    );
  }
  
  // Calculate stats
  const totalPredictions = mockPredictionHistory.length;
  const wins = mockPredictionHistory.filter(p => p.result === 'win').length;
  const winRate = totalPredictions > 0 ? (wins / totalPredictions) * 100 : 0;
  const totalEarned = mockPredictionHistory
    .filter(p => p.result === 'win' && p.payout)
    .reduce((sum, p) => sum + (p.payout || 0), 0);
  
  // Calculate XP progress
  const xpForNextLevel = 1000; // Example value
  const xpProgress = (user.xp % xpForNextLevel) / xpForNextLevel * 100;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl mx-auto"
    >
      {/* Profile Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-background-card border-4 border-neon-eth flex items-center justify-center overflow-hidden">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl font-bold">{user.username[0].toUpperCase()}</span>
                )}
              </div>
              <div className="absolute -bottom-2 -right-2">
                <div className="bg-background-card border-2 border-neon-sol text-neon-sol px-2 py-1 rounded-full text-sm font-bold">
                  Lvl {user.level}
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">{user.username}</h1>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <Edit2 size={16} />
                </button>
              </div>
              <div className="text-gray-400 mt-1 flex items-center gap-2">
                <span className="font-mono">{user.address.slice(0, 6)}...{user.address.slice(-4)}</span>
                <button className="hover:text-white transition-colors">
                  <Share2 size={14} />
                </button>
              </div>
              <div className="mt-3">
                <div className="text-sm text-gray-400 mb-1">Level Progress</div>
                <div className="w-48 bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-neon-sol"
                    style={{ width: `${xpProgress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {user.xp % xpForNextLevel} / {xpForNextLevel} XP
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <NeonButton color="btc" icon={<Share2 size={16} />}>
              Share Profile
            </NeonButton>
            <NeonButton color="btc" icon={<Edit2 size={16} />}>
              Edit Profile
            </NeonButton>
          </div>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: 'Total Predictions',
            value: totalPredictions,
            icon: TrendingUp,
            color: 'eth'
          },
          {
            label: 'Win Rate',
            value: `${winRate.toFixed(1)}%`,
            icon: Trophy,
            color: 'sol'
          },
          {
            label: 'Total Earned',
            value: `${totalEarned.toFixed(2)} ETH`,
            icon: Star,
            color: 'btc'
          },
          {
            label: 'Time Active',
            value: '14 days',
            icon: Clock,
            color: 'matic'
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            className={`bg-background-card p-4 rounded-lg border border-neon-${stat.color}`}
            style={{ '--neon-color': `var(--tw-neon-${stat.color})` } as React.CSSProperties}
            whileHover={{ y: -3 }}
          >
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <stat.icon size={20} />
              <span>{stat.label}</span>
            </div>
            <div className={`text-2xl font-bold text-neon-${stat.color}`}>
              {stat.value}
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Recent Activity */}
      <div className="mb-8">
        <NeonHeading color="btc" level={3} className="mb-6">
          Recent Activity
        </NeonHeading>
        
        <div className="bg-background-card rounded-lg border border-gray-750 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-background-darker">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Token
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Direction
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Stake
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Result
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-750">
                {mockPredictionHistory.slice(0, 5).map((prediction, index) => (
                  <motion.tr 
                    key={prediction.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
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
                      {new Date(prediction.timestamp).toLocaleString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Achievements */}
      <div>
        <NeonHeading color="btc" level={3} className="mb-6">
          Achievements
        </NeonHeading>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: 'First Blood',
              description: 'Made your first successful prediction',
              progress: 100,
              color: 'btc'
            },
            {
              title: 'Winning Streak',
              description: 'Won 5 predictions in a row',
              progress: 60,
              color: 'eth'
            },
            {
              title: 'High Roller',
              description: 'Made a prediction with 1 ETH or more',
              progress: 0,
              color: 'sol'
            }
          ].map((achievement, index) => (
            <motion.div
              key={index}
              className="bg-background-card rounded-lg p-4 border border-gray-750"
              whileHover={{ y: -2 }}
            >
              <h4 className="font-medium mb-1">{achievement.title}</h4>
              <p className="text-sm text-gray-400 mb-3">{achievement.description}</p>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full bg-neon-${achievement.color}`}
                  style={{ width: `${achievement.progress}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {achievement.progress}%
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;