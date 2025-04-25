import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, Users, Zap, ChevronRight } from 'lucide-react';
import NeonButton from '../components/ui/NeonButton';
import NeonHeading from '../components/ui/NeonHeading';
import TokenBadge from '../components/ui/TokenBadge';

interface Tournament {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  entryFee: number;
  prizePool: number;
  participants: number;
  maxParticipants: number;
  token: 'BTC' | 'ETH' | 'SOL' | 'MATIC';
  status: 'upcoming' | 'active' | 'completed';
}

const mockTournaments: Tournament[] = [
  {
    id: '1',
    title: 'Weekly Champions Cup',
    startDate: new Date(Date.now() + 86400000), // Tomorrow
    endDate: new Date(Date.now() + 604800000), // 7 days from now
    entryFee: 0.1,
    prizePool: 25,
    participants: 42,
    maxParticipants: 100,
    token: 'ETH',
    status: 'upcoming',
  },
  {
    id: '2',
    title: 'Crypto Masters League',
    startDate: new Date(),
    endDate: new Date(Date.now() + 259200000), // 3 days from now
    entryFee: 0.05,
    prizePool: 10,
    participants: 85,
    maxParticipants: 100,
    token: 'BTC',
    status: 'active',
  },
  {
    id: '3',
    title: 'SOL Prediction Championship',
    startDate: new Date(Date.now() - 604800000), // 7 days ago
    endDate: new Date(Date.now() - 86400000), // Yesterday
    entryFee: 0.2,
    prizePool: 50,
    participants: 100,
    maxParticipants: 100,
    token: 'SOL',
    status: 'completed',
  },
  {
    id: '4',
    title: 'MATIC Trading Cup',
    startDate: new Date(Date.now() + 172800000), // 2 days from now
    endDate: new Date(Date.now() + 432000000), // 5 days from now
    entryFee: 0.15,
    prizePool: 30,
    participants: 28,
    maxParticipants: 50,
    token: 'MATIC',
    status: 'upcoming',
  },
];

const Tournaments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'active' | 'completed'>('active');
  
  const filteredTournaments = mockTournaments.filter(t => t.status === activeTab);
  
  const getStatusColor = (status: Tournament['status']) => {
    switch (status) {
      case 'upcoming':
        return 'text-neon-eth';
      case 'active':
        return 'text-neon-sol';
      case 'completed':
        return 'text-gray-400';
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="mb-8">
        <NeonHeading color="btc" level={2} className="mb-4">
          Tournaments
        </NeonHeading>
        <p className="text-gray-400">
          Compete in prediction tournaments to win bigger prizes
        </p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          {
            label: 'Active Tournaments',
            value: mockTournaments.filter(t => t.status === 'active').length,
            icon: <Trophy size={20} />,
            color: 'sol'
          },
          {
            label: 'Total Prize Pool',
            value: `${mockTournaments.reduce((sum, t) => sum + t.prizePool, 0)} ETH`,
            icon: <Zap size={20} />,
            color: 'btc'
          },
          {
            label: 'Total Participants',
            value: mockTournaments.reduce((sum, t) => sum + t.participants, 0),
            icon: <Users size={20} />,
            color: 'eth'
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            className={`bg-background-card p-4 rounded-lg border border-neon-${stat.color}`}
            style={{ '--neon-color': `var(--tw-neon-${stat.color})` } as React.CSSProperties}
            whileHover={{ y: -3 }}
          >
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              {stat.icon}
              <span>{stat.label}</span>
            </div>
            <div className={`text-2xl font-bold text-neon-${stat.color}`}>
              {stat.value}
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Tabs */}
      <div className="flex space-x-1 bg-background-darker rounded-md p-1 mb-6">
        {(['active', 'upcoming', 'completed'] as const).map((tab) => (
          <button
            key={tab}
            className={`
              flex-1 px-4 py-2 rounded-md transition-colors capitalize
              ${activeTab === tab 
                ? 'bg-background-card text-white' 
                : 'text-gray-400 hover:text-white'
              }
            `}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      
      {/* Tournaments List */}
      <div className="space-y-4">
        {filteredTournaments.map((tournament) => (
          <motion.div
            key={tournament.id}
            className="bg-background-card rounded-lg p-6 border border-gray-750"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <TokenBadge token={tournament.token} />
                  <h3 className="text-xl font-semibold">{tournament.title}</h3>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>
                      {tournament.startDate.toLocaleDateString()} - {tournament.endDate.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    <span>
                      {tournament.participants}/{tournament.maxParticipants} participants
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="text-right">
                  <div className="text-sm text-gray-400">Prize Pool</div>
                  <div className="text-xl font-bold text-white">
                    {tournament.prizePool} ETH
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-gray-400">Entry Fee</div>
                  <div className="text-lg text-white">
                    {tournament.entryFee} ETH
                  </div>
                </div>
                
                <NeonButton 
                  color={tournament.token.toLowerCase() as any}
                  disabled={tournament.status === 'completed'}
                  icon={<ChevronRight size={16} />}
                >
                  {tournament.status === 'active' ? 'Enter Now' : 
                   tournament.status === 'upcoming' ? 'Register' : 'View Results'}
                </NeonButton>
              </div>
            </div>
            
            {tournament.status === 'active' && (
              <div className="mt-4 pt-4 border-t border-gray-750">
                <div className="text-sm text-gray-400 mb-1">Tournament Progress</div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-neon-sol"
                    style={{ 
                      width: `${((Date.now() - tournament.startDate.getTime()) / 
                        (tournament.endDate.getTime() - tournament.startDate.getTime())) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
        
        {filteredTournaments.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No {activeTab} tournaments found
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Tournaments;