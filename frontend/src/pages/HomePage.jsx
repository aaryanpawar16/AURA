import React from 'react';
import { motion } from 'framer-motion';
import { Star, TrendingUp, TrendingDown } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants/mockData';
import { MarketChart } from '../components/AuraComponents';

export const HomePage = ({ onProductSelect }) => {
  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto">
      <header className="mb-20 text-center">
        <h2 className="text-7xl font-black tracking-tighter text-white italic leading-tight">THE PULSE OF CULTURE.</h2>
        <p className="text-gray-500 mt-4 uppercase tracking-widest text-xs font-bold">Invest in your rotation</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {MOCK_PRODUCTS.map(p => (
          <motion.div 
            key={p.id}
            whileHover={{ y: -10 }}
            onClick={() => onProductSelect(p)}
            className="bg-white/5 border border-white/10 rounded-[32px] p-6 cursor-pointer"
          >
            <img src={p.image} className="w-full h-40 object-contain mb-6" alt={p.name} />
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] text-violet-400 font-black uppercase">{p.brand}</p>
                <h4 className="text-sm font-bold text-white">{p.name}</h4>
              </div>
              <p className="text-sm font-black text-white">${p.price}</p>
            </div>
            <MarketChart data={p.marketIndex} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};