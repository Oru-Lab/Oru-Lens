
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NETWORKS, DEMO_ABI, DEMO_ADDRESS } from '../constants';

const Scan: React.FC = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [abi, setAbi] = useState('');
  const [network, setNetwork] = useState(NETWORKS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !abi) return;

    try {
      const parsedAbi = JSON.parse(abi);
      const id = Date.now().toString();
      const contractData = {
        id,
        name: "Lensed Artifact",
        address,
        network,
        abi: parsedAbi
      };
      
      localStorage.setItem(`oru-contract-${id}`, JSON.stringify(contractData));
      navigate(`/view/${id}`);
    } catch (err) {
      alert("System Integrity Alert: ABI JSON format invalid.");
    }
  };

  return (
    <div className="px-6 md:px-12 max-w-4xl mx-auto py-20 md:py-40">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-24"
      >
        <h2 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter mb-8 italic">Initialization</h2>
        <p className="opacity-30 text-[10px] font-bold uppercase tracking-[0.5em]">Input contract parameters to calibrate the lens</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-30 ml-6">Contract Address</label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="0x..."
              className="w-full bg-transparent border border-current/10 rounded-[2rem] px-10 py-6 focus:outline-none focus:border-current/40 transition-all mono text-sm font-medium"
            />
          </div>
          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-30 ml-6">Network Architecture</label>
            <div className="relative">
              <select
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
                className="w-full bg-transparent border border-current/10 rounded-[2rem] px-10 py-6 focus:outline-none focus:border-current/40 transition-all text-xs font-bold uppercase tracking-widest appearance-none cursor-pointer"
              >
                {NETWORKS.map(net => <option key={net} value={net} className="bg-white dark:bg-black text-current">{net}</option>)}
              </select>
              <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none opacity-20">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center px-6">
            <label className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-30">ABI Interface Defintion</label>
            <button
              type="button"
              onClick={() => {
                setAddress(DEMO_ADDRESS);
                setAbi(JSON.stringify(DEMO_ABI, null, 2));
              }}
              className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity border-b border-current/20 pb-1"
            >
              Load Development Stub
            </button>
          </div>
          <textarea
            required
            value={abi}
            onChange={(e) => setAbi(e.target.value)}
            rows={12}
            placeholder='Paste JSON Data Artifact...'
            className="w-full bg-transparent border border-current/10 rounded-[3rem] px-10 py-8 focus:outline-none focus:border-current/40 transition-all mono text-[12px] leading-relaxed resize-none"
          ></textarea>
        </div>

        <div className="pt-12 flex flex-col items-center gap-10">
          <button
            type="submit"
            className="w-full md:w-auto md:px-32 bg-current text-inverted font-bold py-8 rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-current/10 uppercase tracking-[0.3em] text-sm"
            style={{ backgroundColor: 'var(--text-color)', color: 'var(--bg-color)' }}
          >
            Execute Calibration
          </button>
          <div className="flex items-center gap-6 opacity-10">
            <div className="w-16 h-px bg-current"></div>
            <span className="text-[8px] font-bold uppercase tracking-[0.6em] whitespace-nowrap">Hardware Verification Required</span>
            <div className="w-16 h-px bg-current"></div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Scan;
