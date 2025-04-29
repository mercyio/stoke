import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Wallet, ArrowRight, Users, Zap, TrendingUp, TrendingDown } from 'lucide-react';
import NeonButton from '../components/ui/NeonButton';
import NeonHeading from '../components/ui/NeonHeading';
import TokenBadge from '../components/ui/TokenBadge';
import { useUser } from '../contexts/UserContext';

const LandingPage: React.FC = () => {
  const { isConnected, connectWallet, hasCompletedOnboarding } = useUser();
  const navigate = useNavigate();
  
  const handleConnect = () => {
    connectWallet();
    navigate('/onboarding');
  };
  
  return (
    <div className="min-h-screen bg-background-dark text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-10 transition duration-500 bg-background-darker bg-opacity-80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span 
                  className="ml-2 font-orbitron font-bold text-xl" 
                  style={{ 
                    background: 'linear-gradient(90deg, #9B5DE5, #00F5D4, #FFA500)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  STOKE
                </span>
              </Link>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/#how-it-works" className="text-gray-300 hover:text-white">How It Works</Link>
              <Link to="/app/leaderboard" className="text-gray-300 hover:text-white">Leaderboard</Link>
              <Link to="/testnet" className="text-gray-300 hover:text-white">Try Demo</Link>
            </nav>
            
            <div>
              {isConnected ? (
                <Link to={hasCompletedOnboarding ? "/app" : "/onboarding"}>
                  <NeonButton color="sol">
                    {hasCompletedOnboarding ? 'Go to App' : 'Start Predicting'}
                  </NeonButton>
                </Link>
              ) : (
                <NeonButton color="sol" onClick={handleConnect} icon={<Wallet size={18} />}>
                  Connect Wallet
                </NeonButton>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <motion.section 
        className="relative pt-32 pb-20 md:pt-40 md:pb-28"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-orbitron font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span style={{ color: '#9B5DE5' }}>Predict.</span>{' '}
              <span style={{ color: '#00F5D4' }}>Stake.</span>{' '}
              <span style={{ color: '#FFA500' }}>Win.</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Turn your crypto instincts into rewards with our gamified prediction platform.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
             <div>
              {isConnected ? (
                <Link to={hasCompletedOnboarding ? "/app" : "/onboarding"}>
                  <NeonButton color="sol">
                    {hasCompletedOnboarding ? 'Go to App' : 'Start Predicting'}
                  </NeonButton>
                </Link>
              ) : (
                <NeonButton color="sol"  size="lg" 
                pulse 
                className="mt-4"
                icon={<ChevronRight />} onClick={handleConnect}>
                 Start Predicting
                </NeonButton>
              )}
            </div>
            </motion.div>
          </div>
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background-dark to-transparent"></div>
      </motion.section>
      
      {/* How It Works */}
      <section id="how-it-works" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <NeonHeading color="eth" level={2}>
              How It Works
            </NeonHeading>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              A simple three-step process to start earning crypto rewards
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: "Connect Wallet",
                description: "Link your web3 wallet securely to start your prediction journey",
                icon: <Wallet size={32} />,
                color: "eth"
              },
              {
                title: "Make Predictions",
                description: "Select a token, timeframe, and predict if the price will go up or down",
                icon: <TrendingUp size={32} />,
                color: "sol"
              },
              {
                title: "Earn Rewards",
                description: "Win crypto when your predictions are correct and level up your profile",
                icon: <Zap size={32} />,
                color: "btc"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className={`
                  p-6 rounded-lg 
                  bg-background-card border-2 border-neon-${step.color}
                  flex flex-col items-center text-center
                  hover:shadow-neon hover:shadow-${step.color}
                  transition-all duration-300
                `}
                style={{ 
                  '--neon-color': `var(--tw-neon-${step.color})` 
                } as React.CSSProperties}>
                  <div className={`
                    w-16 h-16 rounded-full flex items-center justify-center mb-4
                    bg-neon-${step.color} bg-opacity-10 text-neon-${step.color}
                  `}>
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-orbitron font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
                
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="text-gray-600" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Leaderboard Preview */}
      <section className="py-16 md:py-24 bg-background-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <NeonHeading color="sol" level={2}>
                Top Predictors
              </NeonHeading>
              <p className="mt-4 text-gray-400 max-w-2xl">
                See who's leading the pack with the most accurate crypto predictions
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <Link to="/app/leaderboard">
                <NeonButton color="sol" icon={<Users size={18} />}>
                  View Full Leaderboard
                </NeonButton>
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                rank: 1,
                username: "CryptoWizard",
                avatar: "https://i.pravatar.cc/150?u=cryptowizard",
                winnings: 145.32,
                token: "ETH",
                winRate: 78,
              },
              {
                rank: 2,
                username: "TokenTitan",
                avatar: "https://i.pravatar.cc/150?u=tokentitan",
                winnings: 118.45,
                token: "BTC",
                winRate: 72,
              },
              {
                rank: 3,
                username: "BlockchainBaron",
                avatar: "https://i.pravatar.cc/150?u=blockchainbaron",
                winnings: 94.21,
                token: "SOL",
                winRate: 69,
              }
            ].map((leader, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className={`
                  p-6 rounded-lg 
                  bg-background-card border border-gray-750
                  relative overflow-hidden
                `}>
                  <div className={`
                    absolute top-0 left-0 w-full h-1
                    ${index === 0 ? 'bg-yellow-500' : ''}
                    ${index === 1 ? 'bg-gray-400' : ''}
                    ${index === 2 ? 'bg-amber-700' : ''}
                  `}></div>
                  
                  <div className="flex items-center mb-4">
                    <div className={`
                      flex items-center justify-center w-8 h-8 rounded-full font-bold mr-3
                      ${index === 0 ? 'bg-yellow-500 text-black' : ''}
                      ${index === 1 ? 'bg-gray-400 text-black' : ''}
                      ${index === 2 ? 'bg-amber-700 text-white' : ''}
                    `}>
                      {leader.rank}
                    </div>
                    
                    <div className="flex items-center">
                      <img 
                        src={leader.avatar} 
                        alt={leader.username} 
                        className="w-10 h-10 rounded-full mr-3 border border-gray-750"
                      />
                      <div>
                        <div className="font-medium text-white">{leader.username}</div>
                        <div className="flex items-center mt-1">
                          <TokenBadge token={leader.token as any} size="sm" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="text-sm text-gray-400 mb-1">Win Rate</div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5 mb-1">
                      <div 
                        className="h-2.5 rounded-full" 
                        style={{ 
                          width: `${leader.winRate}%`,
                          backgroundColor: `var(--tw-neon-${
                            leader.token === 'BTC' ? 'btc' : 
                            leader.token === 'ETH' ? 'eth' : 
                            leader.token === 'SOL' ? 'sol' : 'matic'
                          })`,
                        }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {leader.winRate}%
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-400">Total Winnings</div>
                    <div className="font-medium text-white">{leader.winnings.toFixed(2)} ETH</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-background-card rounded-lg py-12 px-6 sm:px-12 relative overflow-hidden border-2 border-neon-sol shadow-neon shadow-sol"
            style={{ '--neon-color': 'var(--tw-neon-sol)' } as React.CSSProperties}>
            
            <div className="relative z-10 text-center">
              <NeonHeading color="sol" level={2}>
                Ready to Start Predicting?
              </NeonHeading>
              <p className="mt-4 text-gray-300 max-w-2xl mx-auto text-lg">
                Join thousands of traders who are already turning their market knowledge into crypto rewards.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/app">
                  <NeonButton color="sol" size="lg" pulse>
                    Start Predicting Now
                  </NeonButton>
                </Link>
                <Link to="/testnet">
                  <NeonButton color="eth" size="lg">
                    Try Demo
                  </NeonButton>
                </Link>
              </div>
            </div>
            
            {/* Background effects */}
            <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-neon-sol opacity-20 blur-2xl"></div>
            <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-neon-btc opacity-20 blur-2xl"></div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-background-darker py-12 border-t border-gray-750">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center">
                <span 
                  className="ml-2 font-orbitron font-bold text-xl" 
                  style={{ 
                    background: 'linear-gradient(90deg, #9B5DE5, #00F5D4, #FFA500)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  STOKE
                </span>
              </Link>
              <p className="text-gray-400 mt-4 max-w-md">
                Turn your crypto instincts into rewards with our prediction platform.
              </p>
            </div>
            
            <div>
              <h3 className="font-orbitron text-white mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><Link to="/app" className="text-gray-400 hover:text-white">Dashboard</Link></li>
                <li><Link to="/app/leaderboard" className="text-gray-400 hover:text-white">Leaderboard</Link></li>
                <li><Link to="/testnet" className="text-gray-400 hover:text-white">Demo Mode</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-orbitron text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-750 text-center text-gray-500 text-sm">
            <p>© 2025 STOKE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;