import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ContractData, AbiItem, Framework } from '../types';
import { FRAMEWORKS } from '../constants';
import { generateSnippet } from '../utils/snippetGenerator';
import CodeBlock from '../components/CodeBlock';

const FunctionCard: React.FC<{ item: AbiItem; address: string }> = ({ item, address }) => {
  const [activeView, setActiveView] = useState<'code' | 'guide'>('code');
  const [activeFramework, setActiveFramework] = useState<Framework>('wagmi');
  const isRead = item.stateMutability === 'view' || item.stateMutability === 'pure';

  const getGuidelines = () => {
    if (item.type === 'event') return "Event listeners are essential for UI reactivity. Use 'watchContractEvent' for seamless real-time state synchronization.";
    if (isRead) return "Safe, gas-less query. Ideal for component initialization and data validation without user transaction costs.";
    return "Transactional mutation. Requires user signature and gas execution. Always implement robust error handling for user rejections.";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="glass rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] p-4 sm:p-6 md:p-8 lg:p-12 border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 transition-all mb-6 sm:mb-8 md:mb-12"
    >
      <div className="flex flex-col xl:flex-row gap-6 sm:gap-8 md:gap-10 xl:gap-20">
        {/* Metadata Sidebar */}
        <div className="xl:w-[30%] space-y-6 sm:space-y-8">
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
              <span className={`text-[7px] sm:text-[8px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] px-2 sm:px-3 py-0.5 sm:py-1 rounded-full ${
                isRead ? 'bg-blue-500/10 text-blue-500' : 'bg-orange-500/10 text-orange-500'
              }`}>
                {isRead ? 'Read' : 'Write'}
              </span>
              <span className="text-[7px] sm:text-[8px] opacity-20 font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em]">
                {item.stateMutability || 'Standard'}
              </span>
            </div>
            <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tighter mb-3 sm:mb-4 italic break-all">{item.name}</h4>
            <div className="h-px w-12 sm:w-16 bg-current opacity-10" />
          </div>

          <div className="space-y-4 sm:space-y-6">
            <h5 className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] opacity-30">Parameters</h5>
            {item.inputs && item.inputs.length > 0 ? (
              <div className="grid gap-1.5 sm:gap-2">
                {item.inputs.map((input, idx) => (
                  <div key={idx} className="flex flex-col p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-current/[0.02] border border-current/[0.04]">
                    <span className="mono text-[10px] sm:text-[11px] font-bold opacity-70">{input.name || `arg${idx}`}</span>
                    <span className="mono text-[8px] sm:text-[9px] opacity-30 mt-0.5 sm:mt-1 uppercase font-bold tracking-wider sm:tracking-widest">{input.type}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[10px] sm:text-[11px] opacity-20 italic">No input parameters</p>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="xl:w-[70%] flex flex-col">
          <div className="flex items-center justify-between mb-6 sm:mb-8 overflow-x-auto scrollbar-hide -mx-4 sm:mx-0 px-4 sm:px-0">
            <div className="flex gap-4 sm:gap-6 md:gap-8 border-b border-current/5 w-full min-w-max sm:min-w-0">
              <button 
                onClick={() => setActiveView('code')}
                className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] pb-3 sm:pb-4 border-b-2 transition-all whitespace-nowrap ${activeView === 'code' ? 'border-current opacity-100' : 'border-transparent opacity-20 hover:opacity-40'}`}
              >
                Code
              </button>
              <button 
                onClick={() => setActiveView('guide')}
                className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] pb-3 sm:pb-4 border-b-2 transition-all whitespace-nowrap ${activeView === 'guide' ? 'border-current opacity-100' : 'border-transparent opacity-20 hover:opacity-40'}`}
              >
                Guide
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeView === 'code' ? (
              <motion.div 
                key="code"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="flex gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 overflow-x-auto pb-3 sm:pb-4 scrollbar-hide -mx-1 px-1 sm:mx-0 sm:px-0">
                  {FRAMEWORKS.map(f => (
                    <button
                      key={f.id}
                      onClick={() => setActiveFramework(f.id as Framework)}
                      className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all whitespace-nowrap px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-lg sm:rounded-xl ${
                        activeFramework === f.id ? 'bg-current text-inverted' : 'opacity-20 hover:opacity-40 border border-current/5'
                      }`}
                      style={activeFramework === f.id ? { backgroundColor: 'var(--text-color)', color: 'var(--bg-color)' } : {}}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
                <CodeBlock code={generateSnippet(activeFramework, address, item)} framework={activeFramework} itemName={item.name} />
              </motion.div>
            ) : (
              <motion.div 
                key="guide"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 sm:p-6 md:p-8 lg:p-12 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] bg-current/[0.02] border border-current/5 space-y-6 sm:space-y-8 md:space-y-10"
              >
                <div className="space-y-3 sm:space-y-4">
                  <h6 className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] opacity-30">Advisory Note</h6>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed opacity-60 font-medium italic">
                    {getGuidelines()}
                  </p>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 pt-6 sm:pt-8 md:pt-10 border-t border-current/5">
                  <div className="space-y-2 sm:space-y-3">
                    <span className="text-[7px] sm:text-[8px] font-bold uppercase opacity-20 tracking-wider sm:tracking-widest">Provider</span>
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest">{isRead ? 'Global JSON-RPC' : 'Wallet Injection'}</p>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <span className="text-[7px] sm:text-[8px] font-bold uppercase opacity-20 tracking-wider sm:tracking-widest">Execution</span>
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest">{isRead ? 'Query' : 'Consensus Transaction'}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const Dashboard: React.FC = () => {
  const { contractId } = useParams<{ contractId: string }>();
  const [data, setData] = useState<ContractData | null>(null);
  const [activeCat, setActiveCat] = useState<'read' | 'write' | 'events'>('read');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const raw = localStorage.getItem(`oru-contract-${contractId}`);
    if (raw) setData(JSON.parse(raw));
  }, [contractId]);

  const categorized = useMemo(() => {
    if (!data) return { read: [], write: [], events: [] };
    const filter = (i: AbiItem) => !search || i.name?.toLowerCase().includes(search.toLowerCase());
    
    return {
      read: data.abi.filter(i => i.type === 'function' && (i.stateMutability === 'view' || i.stateMutability === 'pure')).filter(filter),
      write: data.abi.filter(i => i.type === 'function' && !(i.stateMutability === 'view' || i.stateMutability === 'pure')).filter(filter),
      events: data.abi.filter(i => i.type === 'event').filter(filter),
    };
  }, [data, search]);

  if (!data) return (
    <div className="flex flex-col items-center justify-center h-[70vh] gap-8 sm:gap-10 md:gap-12">
      <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
        <div className="absolute inset-0 border border-current opacity-10 rounded-full" />
        <div className="absolute inset-0 border-t border-current rounded-full animate-spin" />
      </div>
      <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.4em] sm:tracking-[0.6em] opacity-30">Loading...</span>
    </div>
  );

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1440px] mx-auto pb-20 sm:pb-32 md:pb-40 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] lg:rounded-[4rem] p-6 sm:p-8 md:p-12 lg:p-16 mb-8 sm:mb-10 md:mb-12 border border-current/5 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 sm:gap-8 md:gap-12"
      >
        <div className="flex-1 w-full overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter uppercase italic break-all">{data.name}</h2>
            <div className="flex items-center gap-2 sm:gap-3 glass px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full border-current/10">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
              <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] opacity-40">{data.network}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="mono text-[10px] sm:text-[11px] md:text-sm opacity-30 select-all truncate max-w-full hover:opacity-100 transition-opacity">
              {data.address}
            </span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full xl:w-auto mt-4 sm:mt-0">
          <div className="relative flex-1 sm:w-64 md:w-80">
            <input 
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent border border-current/10 rounded-xl sm:rounded-2xl px-10 sm:px-12 py-3 sm:py-4 md:py-5 text-[10px] sm:text-[11px] font-bold focus:outline-none focus:border-current/30 transition-all placeholder:opacity-30 uppercase tracking-wider sm:tracking-widest"
            />
            <svg className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <Link to="/scan" className="text-center text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] border border-current/10 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl hover:bg-current/5 transition-all">
            Rescan
          </Link>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-1 space-y-4 sm:space-y-6 lg:sticky lg:top-24 h-fit order-first lg:order-none">
          <div className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] opacity-20 mb-4 sm:mb-6 hidden lg:block">Navigation</div>
          <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-1.5 sm:gap-2 pb-3 sm:pb-4 lg:pb-0 scrollbar-hide -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
            {[
              { id: 'read', label: 'Read', count: categorized.read.length },
              { id: 'write', label: 'Write', count: categorized.write.length },
              { id: 'events', label: 'Events', count: categorized.events.length }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id as any)}
                className={`flex-1 lg:w-full text-left px-4 sm:px-5 md:px-6 lg:px-7 py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl transition-all flex justify-between items-center whitespace-nowrap gap-2 sm:gap-3 md:gap-4 ${
                  activeCat === cat.id 
                  ? 'bg-current text-inverted font-bold' 
                  : 'opacity-30 hover:opacity-60 border border-current/5'
                }`}
                style={activeCat === cat.id ? { backgroundColor: 'var(--text-color)', color: 'var(--bg-color)' } : {}}
              >
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.15em] sm:tracking-[0.2em]">{cat.label}</span>
                <span className="mono text-[8px] sm:text-[9px] opacity-40">{cat.count}</span>
              </button>
            ))}
          </div>
          
          <div className="hidden lg:block p-6 sm:p-8 md:p-10 glass rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] border border-current/5 mt-8 sm:mt-10">
            <h5 className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] opacity-30 mb-4 sm:mb-6">Status</h5>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between text-[8px] sm:text-[9px] font-bold opacity-30 uppercase tracking-wider sm:tracking-widest">
                <span>Loaded</span>
                <span>✓</span>
              </div>
              <div className="w-full h-1 bg-current/5 rounded-full overflow-hidden">
                <div className="h-full w-full bg-current opacity-20" />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3">
          <div className="mb-10 sm:mb-14 md:mb-16 lg:mb-20 md:border-l-2 md:border-current/10 md:pl-6 lg:pl-8 xl:pl-12 py-3 sm:py-4">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold uppercase italic tracking-tighter mb-3 sm:mb-4">
              {activeCat === 'read' ? 'Read Functions' : activeCat === 'write' ? 'Write Functions' : 'Events'}
            </h3>
            <p className="opacity-30 text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] max-w-xl leading-relaxed">
              {activeCat === 'read' 
                ? 'Query state without gas costs' 
                : activeCat === 'write' 
                ? 'Transactions requiring gas and signatures' 
                : 'Real-time event listeners'}
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12">
            <AnimatePresence mode="popLayout">
              {categorized[activeCat].length > 0 ? (
                categorized[activeCat].map((item, idx) => (
                  <FunctionCard key={`${item.name}-${idx}`} item={item} address={data.address} />
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass p-12 sm:p-16 md:p-20 lg:p-24 xl:p-40 rounded-[2rem] sm:rounded-[3rem] md:rounded-[4rem] text-center border border-dashed border-current/5 opacity-10 flex flex-col items-center gap-6 sm:gap-8"
                >
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.4em] sm:tracking-[0.6em]">No results</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;