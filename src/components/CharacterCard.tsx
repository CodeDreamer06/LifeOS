import { useState } from 'react';
import { useGameStore } from '../store';
import { motion } from 'framer-motion';
import { Heart, Zap, Star, Coins } from 'lucide-react';

export default function CharacterCard() {
  const { level, exp, maxExp, hp, maxHp, avatarUrl, dollars } = useGameStore();

  const expPercentage = (exp / maxExp) * 100;
  const hpPercentage = (hp / maxHp) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute top-4 left-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 dark:border-slate-700 w-72"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <img 
            src={avatarUrl} 
            alt="Avatar" 
            className="w-16 h-16 rounded-full border-4 border-purple-400 dark:border-purple-500 object-cover shadow-md"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full border-2 border-white dark:border-slate-800 shadow-sm flex items-center gap-1">
            <Star size={10} /> {level}
          </div>
        </div>
        <div className="flex-1">
          <h2 className="font-bold text-gray-800 dark:text-gray-100 text-lg">Wanderer</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis w-[100px]">Life Architect</p>
          <div className="mt-1 flex items-center gap-1 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full text-xs font-bold w-max">
            <Coins size={12} /> ${dollars}
          </div>
        </div>
        <button 
          onClick={useGameStore(state => state.usePotion)}
          className="bg-pink-100 dark:bg-pink-900/50 hover:bg-pink-200 dark:hover:bg-pink-800/50 text-pink-600 dark:text-pink-400 p-2 rounded-full transition-colors relative"
          title="Use Health Potion"
        >
          <Heart size={16} className="fill-pink-500 dark:fill-pink-400" />
          <span className="absolute -top-1 -right-1 bg-pink-500 dark:bg-pink-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {useGameStore(state => state.potions)}
          </span>
        </button>
      </div>

      <div className="space-y-3">
        {/* HP Bar */}
        <div>
          <div className="flex justify-between text-xs font-bold text-red-500 dark:text-red-400 mb-1">
            <span className="flex items-center gap-1"><Heart size={12} /> HP</span>
            <span>{hp}/{maxHp}</span>
          </div>
          <div className="h-2 bg-red-100 dark:bg-red-950 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-red-500 dark:bg-red-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${hpPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* EXP Bar */}
        <div>
          <div className="flex justify-between text-xs font-bold text-purple-500 dark:text-purple-400 mb-1">
            <span className="flex items-center gap-1"><Zap size={12} /> EXP</span>
            <span>{exp}/{maxExp}</span>
          </div>
          <div className="h-2 bg-purple-100 dark:bg-purple-950 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-purple-500 dark:bg-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${expPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
