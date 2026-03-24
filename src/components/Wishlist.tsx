import { useState } from 'react';
import { useGameStore } from '../store';
import { motion } from 'framer-motion';
import { Gift, Plus, Target, X, Coins } from 'lucide-react';

export default function Wishlist() {
  const wishlist = useGameStore(state => state.wishlist);
  const dollars = useGameStore(state => state.dollars);
  const addWishlistProgress = useGameStore(state => state.addWishlistProgress);
  const addWishlistItem = useGameStore(state => state.addWishlistItem);

  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTarget, setNewTarget] = useState(100);
  const [newCategory, setNewCategory] = useState('general');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || newTarget <= 0) return;
    addWishlistItem({
      title: newTitle,
      targetAmount: newTarget,
      category: newCategory
    });
    setNewTitle('');
    setNewTarget(100);
    setIsAdding(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bottom-4 right-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 dark:border-slate-700 w-80 max-h-[500px] flex flex-col"
    >
      <div className="flex justify-between items-center mb-4 border-b border-gray-100 dark:border-slate-700 pb-2">
        <h3 className="font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <Target className="text-red-500" size={20} /> Wishlist Goals
        </h3>
        <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-sm font-bold shadow-sm">
          <Coins size={14} /> ${dollars}
        </div>
      </div>
      
      <div className="space-y-4 overflow-y-auto flex-1 pr-1 pb-2">
        {wishlist.map(item => {
          const progress = (item.currentAmount / item.targetAmount) * 100;
          const isComplete = progress >= 100;
          const canAfford = dollars >= 10;

          return (
            <div key={item.id} className="bg-white dark:bg-slate-700 p-3 rounded-xl border border-gray-200 dark:border-slate-600 shadow-sm relative overflow-hidden">
              {isComplete && (
                <div className="absolute inset-0 bg-green-500/10 flex items-center justify-center backdrop-blur-[1px] z-10">
                  <span className="bg-white dark:bg-slate-800 px-3 py-1 rounded-full text-green-600 dark:text-green-500 font-bold text-sm shadow-md flex items-center gap-1">
                    <Gift size={14} /> Unlocked!
                  </span>
                </div>
              )}
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-sm text-gray-800 dark:text-gray-200">{item.title}</h4>
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-600 px-2 py-1 rounded-md">
                  ${item.currentAmount} / ${item.targetAmount}
                </span>
              </div>
              
              <div className="h-2 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden mb-3">
                <motion.div 
                  className={`h-full ${isComplete ? 'bg-green-500' : 'bg-blue-500'} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {!isComplete && (
                <button 
                  onClick={() => addWishlistProgress(item.id, 10)}
                  disabled={!canAfford}
                  className={`w-full py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-colors ${
                    canAfford 
                      ? 'bg-blue-50 dark:bg-blue-900/50 hover:bg-blue-100 dark:hover:bg-blue-800/50 text-blue-600 dark:text-blue-400' 
                      : 'bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Plus size={14} /> Spend $10
                </button>
              )}
            </div>
          );
        })}
        {wishlist.length === 0 && (
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">No wishlist items. Add one!</p>
        )}
      </div>

      <div className="mt-2 pt-2 border-t border-gray-100 dark:border-slate-700">
        {isAdding ? (
          <motion.form 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-gray-50 dark:bg-slate-700 p-3 rounded-xl border border-gray-200 dark:border-slate-600 space-y-2"
            onSubmit={handleAdd}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-gray-600 dark:text-gray-300">New Goal</span>
              <button type="button" onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-red-500"><X size={14} /></button>
            </div>
            <input required value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Item Name (e.g. Guitar)" className="w-full text-sm p-2 rounded-lg bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-2 top-2 text-gray-400 text-xs">$</span>
                <input type="number" required value={newTarget} onChange={e => setNewTarget(Number(e.target.value))} className="w-full text-xs p-2 pl-6 rounded-lg bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Target Amount" />
              </div>
              <select value={newCategory} onChange={e => setNewCategory(e.target.value)} className="flex-1 text-xs p-2 rounded-lg bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="general">General</option>
                <option value="fitness">Fitness</option>
                <option value="reading">Reading</option>
                <option value="travel">Travel</option>
                <option value="arts">Arts</option>
              </select>
            </div>
            <button type="submit" className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-bold transition-colors">
              Save Goal
            </button>
          </motion.form>
        ) : (
          <button 
            onClick={() => setIsAdding(true)}
            className="w-full py-2 border-2 border-dashed border-gray-300 dark:border-slate-600 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 text-gray-500 dark:text-gray-400 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <Plus size={16} /> Add New Goal
          </button>
        )}
      </div>
    </motion.div>
  );
}
