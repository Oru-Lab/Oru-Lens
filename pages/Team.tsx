
import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';


const Team: React.FC = () => {
  const team = [
    { 
      name: "Nworah C. Gabriel", 
      role: "Lead Architect", 
      bio: "Founder Oru Labs, Protocol-level strategist with obsession for DX optimization.",
      img: "images/Saggio.png"
    },
    { 
      name: "KarlaGod", 
      role: "Advisor", 
      bio: "Business Developer on web3, Founder Bitsave Protocol, building and helping businesses grow onchain and offchain.",
      img: "images/KarlaGod.jpeg"
    },
    { 
      name: "Borderless Dev", 
      role: "Web3 Communtiy", 
      bio: "Borderless is a public-good builder institution that turns first-time builders into sustainable founders",
      img: "images/BorderlessDev.jpg"
    }
  ];

  return (
    <div className="px-6 md:px-16 max-w-7xl mx-auto py-3 md:py-6">
      <div className="text-center mb-32 space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block glass px-6 py-2 rounded-full border border-current/10 text-[9px] font-bold uppercase tracking-[0.5em] opacity-40"
        >
          Human Capital
        </motion.div>
        <h2 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase italic leading-none">The Foundry</h2>
        <p className="text-lg md:text-xl opacity-30 max-w-2xl mx-auto font-medium leading-relaxed">
          Distributed engineers at Oru Labs dedicated to making the blockchain developer experience absolute world-class.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-10 md:gap-16">
        {team.map((member, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="glass p-10 md:p-14 rounded-[3.5rem] border border-black/5 dark:border-white/5 hover:border-black/15 dark:hover:border-white/15 transition-all group hover:scale-[1.02] shadow-sm"
          >
            <div className="w-48 h-48 rounded-full mx-auto mb-10 overflow-hidden border-2 border-current/10 grayscale group-hover:grayscale-0 transition-all duration-700 shadow-xl group-hover:shadow-current/5">
              <img src={member.img} alt={member.name} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" />
            </div>
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold italic tracking-tight">{member.name}</h3>
              <p className="text-[9px] font-bold uppercase tracking-[0.4em] opacity-30 group-hover:opacity-100 transition-opacity">{member.role}</p>
              <div className="h-px w-8 bg-current opacity-10 mx-auto" />
              <p className="text-sm opacity-50 font-medium leading-relaxed">"{member.bio}"</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-40 glass p-16 md:p-24 rounded-[4rem] border border-current/5 text-center relative overflow-hidden group"
      >
        <div className="absolute inset-0 opacity-5 pointer-events-none grid-pattern group-hover:scale-110 transition-transform duration-[3s]" />
        <h3 className="text-4xl md:text-6xl font-bold mb-8 italic tracking-tighter uppercase">Join the Collective</h3>
        <p className="text-lg opacity-30 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
          Oru Lens is an open-source spirit initiative. Contribute to the future of decentralized developer primitives.
        </p>
        <Link to="https://github.com/Oru-Lab/Oru-Lens" className="bg-current text-inverted px-16 py-6 rounded-full font-bold uppercase tracking-[0.3em] text-xs shadow-2xl shadow-current/20 hover:scale-105 active:scale-95 transition-all" style={{ backgroundColor: 'var(--text-color)', color: 'var(--bg-color)' }} onCl>
          Access Repository
        </Link>
      </motion.div>
    </div>
  );
};

export default Team;
