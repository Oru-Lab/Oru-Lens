
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';

const MorphingHamburger: React.FC<{ isOpen: boolean; onClick: () => void }> = ({ isOpen, onClick }) => (
  <button 
    onClick={onClick}
    className="relative z-[60] w-12 h-12 flex items-center justify-center glass rounded-full md:hidden border border-current/10 shadow-lg shadow-black/5"
    aria-label="Toggle Menu"
  >
    <div className="w-6 h-4 relative flex flex-col justify-between items-center">
      <motion.span 
        animate={isOpen ? { rotate: 45, y: 7, width: "100%" } : { rotate: 0, y: 0, width: "100%" }}
        className="block h-[2px] bg-current rounded-full"
      />
      <motion.span 
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1, width: "70%" }}
        className="block h-[2px] bg-current rounded-full"
      />
      <motion.span 
        animate={isOpen ? { rotate: -45, y: -7, width: "100%" } : { rotate: 0, y: 0, width: "100%" }}
        className="block h-[2px] bg-current rounded-full"
      />
    </div>
  </button>
);

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const navItems = [
    { name: 'Portal', path: '/' },
    { name: 'Scanner', path: '/scan' },
    { name: 'Manifesto', path: '/about' },
    { name: 'Foundry', path: '/team' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on navigate
  useEffect(() => setIsOpen(false), [location]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-6 md:px-16 py-6 flex justify-between items-center ${
        scrolled ? 'backdrop-blur-3xl glass border-b border-white/5 py-4' : 'bg-transparent'
      }`}>
        <Link to="/" className="z-[60]">
          <Logo className="h-8 md:h-10" />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-14">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-[10px] font-bold uppercase tracking-[0.4em] transition-all hover:opacity-100 relative group ${
                location.pathname === item.path ? 'opacity-100' : 'opacity-30'
              }`}
            >
              {item.name}
              <span className={`absolute -bottom-2 left-0 w-full h-[1px] bg-current transition-transform duration-500 origin-left ${location.pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
            </Link>
          ))}
          <Link
            to="/scan"
            className="bg-current text-inverted text-[10px] px-10 py-4 rounded-full font-bold uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-current/10"
            style={{ backgroundColor: 'var(--text-color)', color: 'var(--bg-color)' }}
          >
            New Lens
          </Link>
        </div>

        <MorphingHamburger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      </nav>

      {/* Immersive Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center p-12 overflow-hidden"
          >
            {/* Background elements for mobile menu */}
            <div className="absolute inset-0 opacity-10 pointer-events-none grid-pattern" />
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.05 }}
              className="absolute w-[150vw] h-[150vw] rounded-full bg-current blur-[120px] -z-10"
            />
            
            <div className="flex flex-col items-center gap-12 w-full max-w-sm">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.3, type: "spring" }}
                  className="w-full"
                >
                  <Link
                    to={item.path}
                    className={`text-4xl sm:text-5xl font-bold uppercase italic tracking-tighter text-center block transition-all ${
                      location.pathname === item.path ? 'opacity-100 scale-110' : 'opacity-20 hover:opacity-100'
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="w-full pt-10"
              >
                <Link
                  to="/scan"
                  className="w-full bg-current text-inverted text-center py-8 rounded-[2rem] font-bold uppercase tracking-[0.5em] text-sm shadow-2xl shadow-current/20 block"
                  style={{ backgroundColor: 'var(--text-color)', color: 'var(--bg-color)' }}
                >
                  Initialize System
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Footer: React.FC = () => (
  <footer className="border-t border-black/5 dark:border-white/5 py-32 px-8 md:px-16 mt-40">
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-24">
      <div className="space-y-10">
        <Logo />
        <p className="opacity-30 text-sm max-w-md leading-relaxed font-medium uppercase tracking-wide">
          Standardizing integration primitives for the global EVM ecosystem. Visualizing contract artifacts across all Solidity execution environments.
        </p>
        <div className="flex flex-wrap gap-3">
           {['Ethereum', 'Polygon', 'Arbitrum', 'Optimism', 'Base', 'ZkSync', 'Scroll'].map(n => (
             <span key={n} className="text-[8px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 glass rounded-full opacity-40 hover:opacity-100 transition-opacity cursor-default">{n}</span>
           ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-20 md:gap-32 w-full lg:w-auto">
        <div className="space-y-8">
          <h4 className="text-[9px] font-bold uppercase tracking-[0.5em] opacity-20">Protocol</h4>
          <ul className="space-y-5 text-[10px] font-bold uppercase tracking-widest opacity-50">
            <li><Link to="/scan" className="hover:opacity-100 transition-opacity">Scanner Module</Link></li>
            <li><Link to="/about" className="hover:opacity-100 transition-opacity">Manifesto</Link></li>
            <li><Link to="/" className="hover:opacity-100 transition-opacity">Lens Registry</Link></li>
          </ul>
        </div>
        <div className="space-y-8">
          <h4 className="text-[9px] font-bold uppercase tracking-[0.5em] opacity-20">Network</h4>
          <ul className="space-y-5 text-[10px] font-bold uppercase tracking-widest opacity-50">
            <li><a href="https://github.com/Oru-Lab/Oru-Lens" className="hover:opacity-100 transition-opacity">GitHub Source</a></li>
            <li><a href="https://github.com/Oru-Lab" className="hover:opacity-100 transition-opacity">Developer Hub</a></li>
            <li><a href="https://x.com/OruLabs" className="hover:opacity-100 transition-opacity">X Updates</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto pt-24 mt-24 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="text-[8px] opacity-20 uppercase tracking-[0.8em] font-bold">
        &copy; {new Date().getFullYear()} Oru Labs. Bedrock Version 2.4.0
      </div>
      <div className="flex gap-10 items-center">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-soft" />
          <span className="text-[8px] opacity-20 uppercase tracking-[0.6em] font-bold">Mainnet Node: Verified</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse-soft" />
          <span className="text-[8px] opacity-20 uppercase tracking-[0.6em] font-bold">API Latency: 4ms</span>
        </div>
      </div>
    </div>
  </footer>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen grid-pattern">
      <Navbar />
      <main className="pt-24 md:pt-32">
        {children}
      </main>
      <Footer />
    </div>
  );
};
