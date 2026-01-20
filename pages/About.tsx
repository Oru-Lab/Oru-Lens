
import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <div className="px-6 max-w-4xl mx-auto py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <div className="text-center">
          <h2 className="text-5xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-white/50 leading-relaxed">
            Democratizing smart contract integration. We believe the distance between a contract deployment 
            and a functional UI should be measured in seconds, not hours.
          </p>
        </div>

        <div className="glass rounded-[2.5rem] p-12 border border-white/10 space-y-8">
          <h3 className="text-3xl font-bold italic">The "Oru" Philosophy</h3>
          <p className="text-gray/400 leading-relaxed">
            Derived from the word for "Work" in Igbo language, **Oru Lens** focuses on creating a single, 
            immutable source of truth for frontend developers. In a landscape filled with scattered documentation 
            and stale ABI artifacts, we provide the definitive lens through which you view your on-chain logic.
          </p>
          <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
            <div>
              <h4 className="font-bold mb-2">Eliminate Friction</h4>
              <p className="text-sm text-gray/400">Manual ABI parsing is prone to error and fatigue. We automate the mundane so you can build the revolutionary.</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Bridge the Gap</h4>
              <p className="text-sm text-gray/300">We translate complex Solidity signatures into actionable frontend code that developers actually use.</p>
            </div>
          </div>
        </div>

        <div className="text-center space-y-6">
          <h3 className="text-2xl font-bold">Part of the Oru Labs Ecosystem</h3>
          <p className="text-gray/300 italic">Building the next generation of developer primitives for the decentralized web.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
