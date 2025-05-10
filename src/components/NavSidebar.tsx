import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Trophy, Clock, Briefcase, 
  Swords, Medal, UserCircle, User, LogOut
} from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const NavSidebar: React.FC = () => {
  const { isConnected, user, disconnectWallet } = useUser();
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  
  const navItems = [
    { path: '/app', icon: <LayoutDashboard size={20} />, label: 'Predict' },
    { path: '/app/leaderboard', icon: <Trophy size={20} />, label: 'Leaderboard' },
    { path: '/app/history', icon: <Clock size={20} />, label: 'History' },
    { path: '/app/vault', icon: <Briefcase size={20} />, label: 'Vaults' },
    { path: '/app/tournaments', icon: <Medal size={20} />, label: 'Tournaments' },
    { path: '/app/duel', icon: <Swords size={20} />, label: 'Duel' },
    { path: '/app/profile', icon: <UserCircle size={20} />, label: 'Profile' },
  ];
  
  const sidebarVariants = {
    closed: { width: 70 },
    open: { width: 220 }
  };
  
  const [isOpen, setIsOpen] = React.useState(true);
  
  // Close sidebar on mobile by default
  React.useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth > 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleDisconnectClick = () => {
    setShowDisconnectModal(true);
  };
  
  const handleConfirmDisconnect = () => {
    disconnectWallet();
    setShowDisconnectModal(false);
  };
  
  const handleCancelDisconnect = () => {
    setShowDisconnectModal(false);
  };
  
  return (
    <>
      <motion.div
        className="h-screen bg-background-darker fixed left-0 top-0 flex flex-col border-r border-gray-750 z-10"
        variants={sidebarVariants}
        initial={isOpen ? 'open' : 'closed'}
        animate={isOpen ? 'open' : 'closed'}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="h-16 flex items-center justify-center border-b border-gray-750 relative">
          <NavLink to="/" className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12">
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="8" fill="#0A0A0A"/>
                <path d="M15 13C15 11.8954 15.8954 11 17 11H31C32.1046 11 33 11.8954 33 13V35C33 36.1046 32.1046 37 31 37H17C15.8954 37 15 36.1046 15 35V13Z" stroke="#9B5DE5" strokeWidth="2"/>
                <path d="M21 19L27 19" stroke="#00F5D4" strokeWidth="2" strokeLinecap="round"/>
                <path d="M24 14V34" stroke="#FFA500" strokeWidth="2" strokeLinecap="round"/>
                <path d="M21 29L27 29" stroke="#845EC2" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="24" cy="24" r="3" stroke="#FFA500" strokeWidth="2"/>
              </svg>
            </div>
            {isOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="ml-1 font-orbitron font-bold text-xl"
                style={{ 
                  background: 'linear-gradient(90deg, #9B5DE5, #00F5D4, #FFA500)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                STOKE
              </motion.span>
            )}
          </NavLink>
          
          <button 
            className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-background-darker border border-gray-750 rounded-full flex items-center justify-center hover:border-gray-600 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 1L1 6L7 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L7 6L1 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink 
                    to={item.path}
                    className={({ isActive }) => `
                      flex items-center px-3 py-2 rounded-md transition-all duration-200
                      ${isActive 
                        ? 'bg-gray-750 text-neon-sol shadow-[0_0_5px_rgba(0,245,212,0.3)]' 
                        : 'text-gray-400 hover:bg-gray-850 hover:text-white'
                      }
                    `}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    {isOpen && (
                      <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="ml-3"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        {isConnected && user && (
          <div className="px-2 py-4 border-t border-gray-750">
            <div className="flex items-center px-2">
              <div className="flex-shrink-0">
                <User size={20} className="text-gray-400" />
              </div>
              {isOpen && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="ml-3 flex-1 min-w-0"
                >
                  <div className="text-sm font-medium text-white truncate">
                    {user.username}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    Level {user.level}
                  </div>
                </motion.div>
              )}
            </div>
            
            <button
              onClick={handleDisconnectClick}
              className="mt-3 w-full flex items-center px-3 py-2 text-sm rounded-md text-gray-400 hover:bg-gray-850 hover:text-white transition-colors"
            >
              <LogOut size={18} />
              {isOpen && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="ml-3"
                >
                  Disconnect
                </motion.span>
              )}
            </button>
          </div>
        )}
      </motion.div>
      
      {/* Disconnect Confirmation Modal */}
      {showDisconnectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background-card border border-gray-750 rounded-lg p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-xl font-semibold mb-4">Disconnect Wallet</h3>
            <p className="text-gray-400 mb-6">
              You are about to disconnect your Sui wallet from Stoke. You will need to reconnect your wallet to continue using the platform.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelDisconnect}
                className="px-4 py-2 rounded-md border border-gray-750 text-gray-400 hover:bg-gray-850 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDisconnect}
                className="px-4 py-2 rounded-md bg-red-500 bg-opacity-20 border border-red-500 text-red-500 hover:bg-opacity-30 transition-colors"
              >
                Disconnect Wallet
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default NavSidebar;
