import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Bell } from 'lucide-react';
import NeonButton from '../components/ui/NeonButton';
import NeonHeading from '../components/ui/NeonHeading';
import { useUser } from '../contexts/UserContext';
import TokenBadge from '../components/ui/TokenBadge';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { completeOnboarding } = useUser();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    notifications: true,
    riskLevel: 'moderate',
    favoriteTokens: ['BTC', 'ETH'],
    walletAddress: ''
  });

  const handleSubmit = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      completeOnboarding(formData.username);
      navigate('/app');
    }
  };

  const handleWalletChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, walletAddress: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="bg-background-card rounded-lg border border-gray-750 p-8">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {[1, 2, 3, 4, 5].map((number) => (
                <div
                  key={number}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= number ? 'bg-neon-sol text-black' : 'bg-gray-800 text-gray-400'
                  }`}
                >
                  {number}
                </div>
              ))}
            </div>
            <div className="h-2 bg-gray-800 rounded-full">
              <div
                className="h-2 bg-neon-sol rounded-full transition-all duration-300"
                style={{ width: `${((step - 1) / 4) * 100}%` }}
              ></div>
            </div>
          </div>

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <NeonHeading color="sol" level={2} className="mb-6">
                Enter Your Wallet Address
              </NeonHeading>
              <p className="text-gray-400 mb-6">
                Please paste your wallet address to proceed with the onboarding.
              </p>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Wallet Address
                </label>
                <input
                  type="text"
                  value={formData.walletAddress}
                  onChange={handleWalletChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-neon-sol"
                  placeholder="0x1234567890abcdef..."
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <NeonHeading color="sol" level={2} className="mb-6">
                Choose Your Username
              </NeonHeading>
              <p className="text-gray-400 mb-6">
                Pick a unique username for your crypto prediction journey.
              </p>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-neon-sol"
                  placeholder="e.g., CryptoMaster"
                />
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <NeonHeading color="sol" level={2} className="mb-6">
                Trading Preferences
              </NeonHeading>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Risk Level
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['conservative', 'moderate', 'aggressive'].map((risk) => (
                      <button
                        key={risk}
                        onClick={() => setFormData({ ...formData, riskLevel: risk })}
                        className={`
                          px-4 py-2 rounded-md capitalize
                          ${formData.riskLevel === risk
                            ? 'bg-neon-sol bg-opacity-20 border border-neon-sol text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                          }
                        `}
                      >
                        {risk}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Favorite Tokens
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {(['BTC', 'ETH', 'SOL', 'MATIC'] as const).map((token) => (
                      <button
                        key={token}
                        onClick={() => {
                          const tokens = formData.favoriteTokens.includes(token)
                            ? formData.favoriteTokens.filter(t => t !== token)
                            : [...formData.favoriteTokens, token];
                          setFormData({ ...formData, favoriteTokens: tokens });
                        }}
                        className={`
                          p-3 rounded-md flex items-center justify-center
                          ${formData.favoriteTokens.includes(token)
                            ? 'bg-background-darker border border-neon-sol'
                            : 'bg-gray-800 hover:bg-gray-700'
                          }
                        `}
                      >
                        <TokenBadge token={token} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <NeonHeading color="sol" level={2} className="mb-6">
                Notification Preferences
              </NeonHeading>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="text-gray-400" />
                    <div>
                      <div className="font-medium">Push Notifications</div>
                      <div className="text-sm text-gray-400">
                        Get alerts for predictions and results
                      </div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.notifications}
                      onChange={(e) => setFormData({ ...formData, notifications: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-sol"></div>
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <NeonHeading color="sol" level={2} className="mb-6">
                Review Your Information
              </NeonHeading>
              <p className="text-gray-400 mb-6">
                Please review your information before proceeding to start trading.
              </p>
              <div className="space-y-6">
                <div>
                  <p className="font-medium text-gray-300">Username: {formData.username}</p>
                  <p className="font-medium text-gray-300">Wallet Address: {formData.walletAddress}</p>
                  <p className="font-medium text-gray-300">Risk Level: {formData.riskLevel}</p>
                  <p className="font-medium text-gray-300">Notifications: {formData.notifications ? 'Enabled' : 'Disabled'}</p>
                </div>
              </div>
            </motion.div>
          )}

          <NeonButton color="sol" onClick={handleSubmit} className="w-full mt-6 flex items-center justify-center">
            {step < 5 ? (
              <>
                Next <ChevronRight className="ml-2" />
              </>
            ) : (
              'Start Trading'
            )}
          </NeonButton>
        </div>
      </motion.div>
    </div>
  );
};

export default Onboarding;
