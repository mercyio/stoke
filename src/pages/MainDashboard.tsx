import React from 'react';
import { motion } from 'framer-motion';
import PredictionForm from '../components/PredictionForm';
import LiveFeed from '../components/LiveFeed';
import NeonHeading from '../components/ui/NeonHeading';
import { useUser } from '../contexts/UserContext';
import MarketChart from './marketChart';

const MainDashboard: React.FC = () => {
  const { mockPredictionHistory } = useUser();
  
  // Handler for when a prediction is made
  const handlePredictionMade = (prediction: any) => {
    console.log('Prediction made:', prediction);
    // In a real app, this would call an API to submit the prediction
  };
  
  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
  {/* Market Chart section */}
  <div className="mb-8">
    <MarketChart />
          </div>
          
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main prediction form */}
          <div className="flex-1">
            <PredictionForm onPredictionMade={handlePredictionMade} />
            
            {/* Recent activity */}
            <div className="mt-8">
              <NeonHeading color="eth" level={3} className="mb-6">
                Your Recent Activity
              </NeonHeading>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mockPredictionHistory.slice(0, 4).map((prediction) => (
                  <motion.div 
                    key={prediction.id}
                    className={`
                      p-4 rounded-lg border 
                      ${prediction.result === 'win' 
                        ? 'border-neon-sol bg-neon-sol bg-opacity-5' 
                        : prediction.result === 'loss'
                        ? 'border-neon-btc bg-neon-btc bg-opacity-5' 
                        : 'border-gray-750 bg-background-card'
                      }
                    `}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <span className={`
                          text-2xl mr-1
                          ${prediction.direction === 'up' ? 'text-success' : 'text-error'}
                        `}>
                          {prediction.direction === 'up' ? '↑' : '↓'}
                        </span>
                        <span className="font-medium">
                          {prediction.token}
                        </span>
                      </div>
                      <span className={`
                        px-2 py-1 rounded text-xs font-medium
                        ${prediction.result === 'win' 
                          ? 'bg-success bg-opacity-20 text-success' 
                          : prediction.result === 'loss' 
                          ? 'bg-error bg-opacity-20 text-error' 
                          : 'bg-gray-700 text-gray-300'}
                      `}>
                        {prediction.result === 'win' 
                          ? 'Win' 
                          : prediction.result === 'loss' 
                          ? 'Loss' 
                          : 'Pending'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <div className="text-gray-400">
                        {prediction.timeframe} timeframe
                      </div>
                      <div className="font-medium">
                        {prediction.stake} ETH
                        {prediction.payout && (
                          <span className="text-success ml-1">
                            +{prediction.payout}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Live feed sidebar */}
          <div className="w-full lg:w-80">
            <LiveFeed />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MainDashboard;