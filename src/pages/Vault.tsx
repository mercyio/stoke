import React from 'react';
import { motion } from 'framer-motion';
import { Vault as VaultIcon } from 'lucide-react';

const Vault = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <VaultIcon className="w-8 h-8 text-purple-500" />
        <h1 className="text-3xl font-bold">Vault</h1>
      </div>
      
      <div className="grid gap-6">
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Your Assets</h2>
          <p className="text-gray-400">Your secure vault for managing digital assets.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Vault;