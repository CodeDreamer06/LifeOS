import { useState } from 'react';
import { useGameStore, getLevelTitle } from '../store';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Heart, Zap, ShieldAlert, Skull, Flame } from 'lucide-react';

export default function SkillsModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { skills, vices, cureVice, potions } = useGameStore();

  const viceConfig = [
    { id: 'doomscrolling', name: 'Doomscrolling', icon: <Zap size={16} />, color: 'bg-indigo-500' },
    { id: 'bingeEating', name: 'Binge Eating', icon: <Heart size={16} />, color: 'bg-rose-500' },
    { id: 'burnout', name: 'Burnout', icon: <Flame size={16} />, color: 'bg-orange-500' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-3xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3 shadow-sm">
                <Sparkles className="text-purple-500" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Skill Tree</h2>
              <p className="text-gray-500 text-sm mt-2 font-medium">
                Track your life progress and manage your vices.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Skills Section */}
              <div className="md:col-span-2 space-y-6">
                <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2 border-b pb-2">
                  <span className="text-2xl">🌟</span> Life Skills
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {skills.map(skill => {
                    const progress = (skill.exp / skill.maxExp) * 100;
                    const title = getLevelTitle(skill.level);
                    
                    return (
                      <div key={skill.id} className="bg-gray-50 p-4 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 rounded-xl ${skill.color} text-white flex items-center justify-center text-xl shadow-sm`}>
                            {skill.icon}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800 text-sm leading-tight">{skill.name}</h4>
                            <p className="text-xs text-gray-500 font-medium">{title} (Lv.{skill.level})</p>
                          </div>
                        </div>
                        
                        <div className="relative pt-1">
                          <div className="flex mb-1 items-center justify-between">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">EXP</span>
                            <span className="text-[10px] font-bold text-gray-500">{skill.exp}/{skill.maxExp}</span>
                          </div>
                          <div className="overflow-hidden h-2.5 mb-1 text-xs flex rounded-full bg-gray-200">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${progress}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${skill.color}`}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Vices Section */}
              <div className="space-y-6">
                <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2 border-b pb-2">
                  <span className="text-2xl">⚠️</span> Vices
                </h3>
                
                <div className="space-y-4">
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    Vices build up over time. Use health potions to clear them and prevent negative effects!
                  </p>
                  
                  {viceConfig.map(vice => {
                    const value = vices[vice.id as keyof typeof vices];
                    const isDanger = value > 70;
                    
                    return (
                      <div key={vice.id} className={`p-4 rounded-2xl border ${isDanger ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-100'} shadow-sm transition-colors`}>
                        <div className="flex justify-between items-center mb-2">
                          <h4 className={`font-bold text-sm flex items-center gap-1 ${isDanger ? 'text-red-700' : 'text-gray-700'}`}>
                            {isDanger ? <Skull size={14} className="text-red-500" /> : vice.icon}
                            {vice.name}
                          </h4>
                          <span className={`text-xs font-bold ${isDanger ? 'text-red-600' : 'text-gray-500'}`}>
                            {value}%
                          </span>
                        </div>
                        
                        <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden mb-3">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${value}%` }}
                            className={`h-full ${isDanger ? 'bg-red-500 animate-pulse' : vice.color}`}
                          />
                        </div>

                        <button 
                          onClick={() => cureVice(vice.id as keyof typeof vices)}
                          disabled={potions <= 0 || value === 0}
                          className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                            potions > 0 && value > 0 
                              ? 'bg-pink-100 text-pink-600 hover:bg-pink-200 cursor-pointer' 
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          <Heart size={14} className={potions > 0 && value > 0 ? "fill-pink-500" : ""} />
                          Use Potion (-40%)
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
