import { useState } from 'react';
import { useGameStore, getLevelTitle } from '../store';
import { motion } from 'framer-motion';
import { Dumbbell, BookOpen, Plane, ChefHat, Brain, BarChart2, ChevronRight, Palette, Smartphone, Hammer } from 'lucide-react';
import SkillsModal from './SkillsModal';

const statIcons: Record<string, React.ReactNode> = {
  fitness: <Dumbbell size={16} className="text-orange-500 dark:text-orange-400" />,
  reading: <BookOpen size={16} className="text-blue-500 dark:text-blue-400" />,
  travel: <Plane size={16} className="text-teal-500 dark:text-teal-400" />,
  cooking: <ChefHat size={16} className="text-yellow-500 dark:text-yellow-400" />,
  mentalHealth: <Brain size={16} className="text-pink-500 dark:text-pink-400" />,
  arts: <Palette size={16} className="text-rose-500 dark:text-rose-400" />,
  social: <Smartphone size={16} className="text-sky-500 dark:text-sky-400" />,
  practical: <Hammer size={16} className="text-slate-500 dark:text-slate-400" />
};

const statColors: Record<string, string> = {
  fitness: 'bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-300',
  reading: 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300',
  travel: 'bg-teal-100 text-teal-700 dark:bg-teal-950/50 dark:text-teal-300',
  cooking: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-300',
  mentalHealth: 'bg-pink-100 text-pink-700 dark:bg-pink-950/50 dark:text-pink-300',
  arts: 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300',
  social: 'bg-sky-100 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300',
  practical: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
};

export default function StatsPanel() {
  const stats = useGameStore(state => state.stats);
  const skills = useGameStore(state => state.skills);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);

  const activeCategories = Array.from(new Set(skills.map(s => s.category)));

  return (
    <>
      <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 dark:border-slate-700 w-72"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <BarChart2 className="text-blue-500" size={20} /> Life Stats
            </h3>
            <button 
              onClick={() => setIsSkillsOpen(true)}
              className="text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/50 hover:bg-purple-200 dark:hover:bg-purple-800/50 px-2 py-1 rounded-lg transition-colors flex items-center"
            >
              All Skills <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-3">
            {Object.entries(stats)
              .filter(([key]) => activeCategories.includes(key))
              .sort(([, valA], [, valB]) => valB - valA)
              .map(([key, value]) => {
                const title = getLevelTitle(value);
                const colorClass = statColors[key as keyof typeof statColors] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
                const icon = statIcons[key as keyof typeof statIcons] || <BarChart2 size={16} />;
                
                return (
                  <div key={key} className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700/50 p-1.5 -mx-1.5 rounded-lg transition-colors" onClick={() => setIsSkillsOpen(true)}>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${colorClass} font-medium text-sm capitalize w-36 shadow-sm`}>
                      {icon}
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-700 dark:text-gray-200 text-sm">
                        Lv. {value}
                      </div>
                      <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                        {title}
                      </div>
                    </div>
                  </div>
                );
            })}
          </div>
        </motion.div>
      </div>

      <SkillsModal isOpen={isSkillsOpen} onClose={() => setIsSkillsOpen(false)} />
    </>
  );
}
