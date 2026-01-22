
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import CodeBlock from '@/components/CodeBlock';

const Landing: React.FC = () => {
  // Mouse hover 3D effect for the hero card
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="px-6 md:px-12 max-w-7xl mx-auto overflow-x-hidden">
      {/* Hero Section */}
      <section className="py-4 md:py-8 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 inline-flex items-center gap-3 px-6 py-2 rounded-full border border-black/10 dark:border-white/10 glass text-[10px] font-bold uppercase tracking-[0.3em] opacity-80"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
            Professional Integration Layer
          </motion.div>

          <h1 className="text-6xl md:text-9xl font-bold tracking-tight leading-[0.85] mb-12 uppercase">
            Contract <br />
            <span className="opacity-20 italic">Visualized.</span>
          </h1>

          <p className="text-lg md:text-2xl opacity-40 mb-16 max-w-2xl mx-auto leading-relaxed font-medium">
            The smart contract lens for senior frontend engineers. Instantly distill complex ABIs into production-ready implementation guides.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/scan"
              className="bg-current text-inverted px-12 py-6 rounded-full font-bold uppercase tracking-[0.2em] text-sm hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-current/20"
              style={{ backgroundColor: 'var(--text-color)', color: 'var(--bg-color)' }}
            >
              Start Scanning
            </Link>
            <Link
              to="/about"
              className="px-12 py-6 rounded-full border border-current/10 hover:bg-current/5 transition-all font-bold uppercase tracking-[0.2em] text-xs"
            >
              Our Engineering Standards
            </Link>
          </div>
        </motion.div>

        {/* 3D Interactive Mockup */}
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="mt-32 w-full max-w-6xl relative perspective-2000 hidden md:block"
        >
          <div className="glass rounded-[3.5rem] overflow-hidden border border-black/10 dark:border-white/10 shadow-[0_50px_120px_rgba(0,0,0,0.15)] dark:shadow-[0_50px_120px_rgba(255,255,255,0.03)] p-1 md:p-2 bg-gradient-to-br from-white/5 to-transparent">
            <div className="bg-white dark:bg-black rounded-[2.8rem] overflow-hidden">
              <div className="h-14 border-b border-black/5 dark:border-white/5 flex items-center px-8 gap-4">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
                </div>
                <div className="mx-auto text-[9px] font-bold opacity-20 tracking-[0.4em] uppercase">ORU_LENS_INTEGRATION_CORE_V2</div>
              </div>
              <div className="p-12 md:p-20 grid lg:grid-cols-5 gap-20 text-left">
                <div className="lg:col-span-2 space-y-12">
                  <div className="space-y-6">
                    <h3 className="text-4xl font-bold uppercase leading-none">The Artifact</h3>
                    <p className="opacity-30 text-base leading-relaxed">
                      Automatically maps function mutability, gas requirements, and event signatures into actionable UI logic.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="p-6 rounded-3xl border border-current/5 flex items-center justify-between glass">
                      <span className="mono text-sm opacity-60">claimRewards()</span>
                      <span className="text-[10px] font-bold px-3 py-1 rounded bg-orange-500/10 text-orange-500 uppercase tracking-widest">WRITE</span>
                    </div>
                    <div className="p-6 rounded-3xl border border-current/5 flex items-center justify-between opacity-30">
                      <span className="mono text-sm opacity-60">totalSupply()</span>
                      <span className="text-[10px] font-bold px-3 py-1 rounded bg-blue-500/10 text-blue-500 uppercase tracking-widest">READ</span>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-3 glass rounded-[2.5rem] p-10 mono text-sm leading-relaxed border border-black/5 dark:border-white/5">
                  <div className="flex gap-8 mb-8 border-b border-black/5 dark:border-white/5 pb-4">
                    <span className="border-b-2 border-current font-bold pb-4">wagmi</span>
                    <span className="opacity-20 pb-4">ethers.js</span>
                    <span className="opacity-20 pb-4">viem</span>
                  </div>
                  <pre className="opacity-60">
                    <CodeBlock code={`import { useWriteContract } from 'wagmi'

const { writeContract, isPending } = useWriteContract()

const handleClaim = () => {
  writeContract({
    address: '0x...',
    abi: LENS_ABI,
    functionName: 'claimRewards'
  })
}`} />

                  </pre>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Trust Bar */}
      <section className="py-20 border-t border-current/5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center opacity-30 grayscale hover:grayscale-0 transition-all">
          <span className="font-bold uppercase tracking-[0.3em]">Optimism</span>
          <span className="font-bold uppercase tracking-[0.3em]">Arbitrum</span>
          <span className="font-bold uppercase tracking-[0.3em]">Base</span>
          <span className="font-bold uppercase tracking-[0.3em]">Ethereum</span>
        </div>
      </section>
    </div>
  );
};

export default Landing;
