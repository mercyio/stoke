import { motion } from 'framer-motion';
import NeonHeading from '../components/ui/NeonHeading';
import NeonButton from '../components/ui/NeonButton';
import NeonCard from '../components/ui/NeonCard';

const Duel: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="mb-8">
        <NeonHeading color="sol" level={2} className="mb-4">
          Crypto Duels
        </NeonHeading>
        <p className="text-gray-400">
          Challenge other traders to head-to-head prediction battles
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NeonCard color="sol" className="p-6">
          <h3 className="text-xl font-semibold mb-4">Create a Duel</h3>
          <p className="text-gray-400 mb-6">Set up a challenge and invite others to compete</p>
          <NeonButton color="sol" className="w-full">
            Create New Duel
          </NeonButton>
        </NeonCard>
        
        <NeonCard color="eth" className="p-6">
          <h3 className="text-xl font-semibold mb-4">Join a Duel</h3>
          <p className="text-gray-400 mb-6">Browse open challenges and join the competition</p>
          <NeonButton color="eth" className="w-full">
            Find Open Duels
          </NeonButton>
        </NeonCard>
      </div>
      
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Your Active Duels</h3>
        <p className="text-gray-500">You don't have any active duels yet.</p>
      </div>
    </motion.div>
  );
};

export default Duel;
