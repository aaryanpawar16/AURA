import React, { useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import { Search, ShoppingBag, Menu, Wallet } from 'lucide-react';

/**
 * Hook internalized to resolve import dependency issues in this environment.
 * Handles the logic for the premium glowing cursor effect.
 */
const useAuraCursor = () => {
  const mouseX = useSpring(0, { damping: 30, stiffness: 200 });
  const mouseY = useSpring(0, { damping: 30, stiffness: 200 });

  useEffect(() => {
    const handleMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  return { x: mouseX, y: mouseY };
};

export const AuraCursor = () => {
  const { x, y } = useAuraCursor();
  return (
    <motion.div 
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      className="fixed top-0 left-0 w-8 h-8 rounded-full bg-violet-500/30 blur-xl pointer-events-none z-[9999] hidden md:block"
    />
  );
};

export const MarketChart = ({ data, color = "#8B5CF6" }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  
  return (
    <div className="flex items-end gap-1 h-12 w-full">
      {data.map((val, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${((val - min) / range) * 80 + 20}%` }}
          className="flex-1 rounded-t-sm"
          style={{ backgroundColor: color, opacity: 0.3 + (i / data.length) * 0.7 }}
        />
      ))}
    </div>
  );
};

export const Navbar = ({ view, setView }) => {
  const navItems = [
    { id: 'home', label: 'Catalog' },
    { id: 'vault', label: 'Vault', icon: <Wallet size={14} /> },
    { id: 'tracking', label: 'Tracking' }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-10">
        <h1 onClick={() => setView('home')} className="text-2xl font-black tracking-tighter text-white cursor-pointer italic">AURA</h1>
        <div className="hidden md:flex gap-8 text-xs font-black uppercase tracking-widest text-gray-400">
          {navItems.map(item => (
            <button 
              key={item.id} 
              onClick={() => setView(item.id)} 
              className={`hover:text-white transition flex items-center gap-2 ${view === item.id ? 'text-white' : ''}`}
            >
              {item.icon}{item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4 text-white">
        <Search size={18} className="cursor-pointer hover:text-violet-400 transition" />
        <ShoppingBag size={18} className="cursor-pointer hover:text-violet-400 transition" />
      </div>
    </nav>
  );
};