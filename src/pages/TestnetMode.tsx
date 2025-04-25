import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap } from 'lucide-react';
import NeonButton from '../components/ui/NeonButton';
import NeonHeading from '../components/ui/NeonHeading';
import { useUser } from '../contexts/UserContext';

const TestnetMode: React.FC = () => {
  const { isConnected, connectWallet, hasCompletedOnboarding } = useUser();
   const navigate = useNavigate();
   
   const handleConnect = () => {
     connectWallet();
     navigate('/onboarding');
   };
   
  return (
    <div className="min-h-screen bg-background-dark">
      {/* Test mode banner */}
      <div className="bg-neon-btc bg-opacity-10 border-b border-neon-btc px-4 py-2 text-center">
        <p className="text-neon-btc font-medium flex items-center justify-center gap-2">
          <Zap size={16} />
          You are in Simulation Mode - no real crypto is used
        </p>
      </div>
      
      {/* Header */}
      <header className="h-16 border-b border-gray-750 flex items-center px-4">
        <Link to="/" className="flex items-center">
          <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="8" fill="#0A0A0A"/>
            <path d="M15 13C15 11.8954 15.8954 11 17 11H31C32.1046 11 33 11.8954 33 13V35C33 36.1046 32.1046 37 31 37H17C15.8954 37 15 36.1046 15 35V13Z" stroke="#9B5DE5" strokeWidth="2"/>
            <path d="M21 19L27 19" stroke="#00F5D4" strokeWidth="2" strokeLinecap="round"/>
            <path d="M24 14V34" stroke="#FFA500" strokeWidth="2" strokeLinecap="round"/>
            <path d="M21 29L27 29" stroke="#845EC2" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="24" cy="24" r="3" stroke="#FFA500" strokeWidth="2"/>
          </svg>
          <span 
            className="ml-2 font-orbitron font-bold text-xl" 
            style={{ 
              background: 'linear-gradient(90deg, #9B5DE5, #00F5D4, #FFA500)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            STOKE TESTNET
          </span>
        </Link>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8 flex items-center">
          <Link to="/" className="text-gray-400 hover:text-white flex items-center mr-4">
            <ArrowLeft size={16} className="mr-1" />
            Back
          </Link>
          <NeonHeading color="btc" level={2}>
            Simulation Mode
          </NeonHeading>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="cyberpunk-card p-6" style={{ '--neon-color': 'var(--tw-neon-btc)' } as React.CSSProperties}>
              <h3 className="text-xl font-orbitron mb-4">Practice Predictions</h3>
              <p className="text-gray-400 mb-6">
                Test your prediction skills with no risk. Simulation mode uses test tokens to let you get familiar with the platform without risking real crypto.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-neon-btc bg-opacity-20 text-neon-btc flex items-center justify-center mr-3">
                    1
                  </div>
                  <p className="text-gray-300">Practice with 1000 TEST tokens</p>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-neon-btc bg-opacity-20 text-neon-btc flex items-center justify-center mr-3">
                    2
                  </div>
                  <p className="text-gray-300">Make predictions with the same interface</p>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-neon-btc bg-opacity-20 text-neon-btc flex items-center justify-center mr-3">
                    3
                  </div>
                  <p className="text-gray-300">Track your simulation performance</p>
                </div>
              </div>
              <div className="mt-8">
                <NeonButton color="btc" className="w-full">
                  Start Simulation
                </NeonButton>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="cyberpunk-card p-6" style={{ '--neon-color': 'var(--tw-neon-sol)' } as React.CSSProperties}>
              <h3 className="text-xl font-orbitron mb-4">Ready for Real Mode?</h3>
              <p className="text-gray-400 mb-6">
                When you're confident with your prediction skills, switch to real mode to start earning actual crypto rewards.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-neon-sol bg-opacity-20 text-neon-sol flex items-center justify-center mr-3">
                    <Zap size={16} />
                  </div>
                  <p className="text-gray-300">Connect a real wallet</p>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-neon-sol bg-opacity-20 text-neon-sol flex items-center justify-center mr-3">
                    <Zap size={16} />
                  </div>
                  <p className="text-gray-300">Make predictions with real crypto</p>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-neon-sol bg-opacity-20 text-neon-sol flex items-center justify-center mr-3">
                    <Zap size={16} />
                  </div>
                  <p className="text-gray-300">Earn rewards and climb the leaderboard</p>
                </div>
              </div>
              <div  className="mt-8">
              {isConnected ? (
                <Link to={hasCompletedOnboarding ? "/app" : "/onboarding"}>
                  <NeonButton color="sol">
                    {hasCompletedOnboarding ? 'Go to App' : 'Complete Setup'}
                  </NeonButton>
                </Link>
              ) : (
                <NeonButton color="sol" className="w-full" onClick={handleConnect}>
                  Switch to Real Mode
                </NeonButton>
              )}
            </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};
export default TestnetMode;