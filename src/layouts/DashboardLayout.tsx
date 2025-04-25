import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bell, Wallet } from 'lucide-react';
import NavSidebar from '../components/NavSidebar';
import { useUser } from '../contexts/UserContext';
import NeonButton from '../components/ui/NeonButton';

const DashboardLayout: React.FC = () => {
  const { isConnected, user, connectWallet } = useUser();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<{ id: string; message: string }[]>([]);
  
  // Redirect if not connected
  useEffect(() => {
    if (!isConnected && !user) {
      // We'll allow the page to render, but show a connect prompt
      // This is just for demo purposes
    }
  }, [isConnected, user, navigate]);
  
  // Simulate notifications
  useEffect(() => {
    if (isConnected && user) {
      const timeout = setTimeout(() => {
        setNotifications([
          { id: '1', message: '🏆 New tournament starts in 2 hours!' },
          { id: '2', message: '💰 You have unclaimed rewards' },
        ]);
      }, 5000);
      
      return () => clearTimeout(timeout);
    }
  }, [isConnected, user]);
  
  if (!isConnected || !user) {
    return (
      <div className="min-h-screen bg-background-dark flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full p-6 rounded-lg bg-background-card border border-gray-750"
        >
          <h1 className="text-2xl font-orbitron text-center mb-6">
            <span 
              style={{ 
                background: 'linear-gradient(90deg, #9B5DE5, #00F5D4, #FFA500)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              STOKE
            </span>
          </h1>
          <p className="text-gray-400 text-center mb-8">
            Connect your wallet to start making crypto predictions
          </p>
          <div className="flex justify-center">
            <NeonButton 
              color="sol" 
              onClick={connectWallet}
              icon={<Wallet />}
              pulse
            >
              Connect Wallet
            </NeonButton>
          </div>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background-dark">
      <NavSidebar />
      
      <div className="md:pl-[220px] transition-all duration-300">
        <header className="h-16 border-b border-gray-750 flex items-center justify-between px-4">
          <div></div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-2 rounded-full hover:bg-gray-800 transition-colors relative">
                <Bell size={20} className="text-gray-400" />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-neon-btc text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
            </div>
            
            <div className="flex items-center">
              <div className="mr-3 text-right hidden sm:block">
                <div className="text-sm font-medium">{user.username}</div>
                <div className="text-xs text-gray-500">
                  Level {user.level} · {user.xp} XP
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-neon-eth flex items-center justify-center text-black font-bold">
                {user.username.slice(0, 1).toUpperCase()}
              </div>
            </div>
          </div>
        </header>
        
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;