import { useState } from 'react';
import { useGameStore } from '../store';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Circle, Zap, ScrollText, FlaskConical, Map, Plus, X, Tag } from 'lucide-react';

export default function QuestList() {
  const quests = useGameStore(state => state.quests);
  const completeQuest = useGameStore(state => state.completeQuest);
  const addQuest = useGameStore(state => state.addQuest);
  const subGoals = useGameStore(state => state.subGoals);
  
  const [activeTab, setActiveTab] = useState<'daily' | 'side' | 'experiment'>('daily');
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState('fitness');
  const [newExp, setNewExp] = useState(50);
  const [newSubGoalId, setNewSubGoalId] = useState<string>('');

  const handleAddQuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addQuest({
      title: newTitle,
      description: newDesc,
      category: newCategory,
      expReward: newExp,
      type: activeTab,
      subGoalId: newSubGoalId || undefined
    });
    setNewTitle('');
    setNewDesc('');
    setNewSubGoalId('');
    setIsAdding(false);
  };

  const getSubGoalName = (id?: string) => {
    if (!id) return null;
    return subGoals.find(sg => sg.id === id)?.title;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bottom-4 left-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 dark:border-slate-700 w-80 max-h-[500px] flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          {activeTab === 'daily' && <ScrollText className="text-amber-600 dark:text-amber-400" size={20} />}
          {activeTab === 'side' && <Map className="text-emerald-600 dark:text-emerald-400" size={20} />}
          {activeTab === 'experiment' && <FlaskConical className="text-indigo-600 dark:text-indigo-400" size={20} />}
          <span className="capitalize">{activeTab}</span>
        </h3>
        <div className="flex bg-gray-100 dark:bg-slate-700 p-1 rounded-lg">
          <button onClick={() => setActiveTab('daily')} className={`p-1.5 rounded-md transition-colors ${activeTab === 'daily' ? 'bg-white dark:bg-slate-600 shadow-sm text-amber-600 dark:text-amber-400' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}>
            <ScrollText size={16} />
          </button>
          <button onClick={() => setActiveTab('side')} className={`p-1.5 rounded-md transition-colors ${activeTab === 'side' ? 'bg-white dark:bg-slate-600 shadow-sm text-emerald-600 dark:text-emerald-400' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}>
            <Map size={16} />
          </button>
          <button onClick={() => setActiveTab('experiment')} className={`p-1.5 rounded-md transition-colors ${activeTab === 'experiment' ? 'bg-white dark:bg-slate-600 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}>
            <FlaskConical size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-3 overflow-y-auto flex-1 pr-1 pb-2">
        <AnimatePresence mode="popLayout">
          {quests.filter(q => q.type === activeTab).map(quest => (
            <motion.div 
              key={quest.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`p-3 rounded-xl border ${quest.completed ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600'} shadow-sm flex items-start gap-3 transition-colors`}
            >
              <button 
                onClick={() => completeQuest(quest.id)}
                disabled={quest.completed}
                className={`mt-0.5 flex-shrink-0 ${quest.completed ? 'text-green-500' : 'text-gray-300 dark:text-gray-500 hover:text-purple-500 dark:hover:text-purple-400 transition-colors'}`}
              >
                {quest.completed ? <CheckCircle size={20} /> : <Circle size={20} />}
              </button>
              <div className="flex-1">
                <h4 className={`font-bold text-sm ${quest.completed ? 'text-green-800 dark:text-green-400 line-through opacity-70' : 'text-gray-800 dark:text-gray-100'}`}>
                  {quest.title}
                </h4>
                {quest.description && (
                  <p className={`text-xs mt-1 ${quest.completed ? 'text-green-600 dark:text-green-500 opacity-70' : 'text-gray-500 dark:text-gray-400'}`}>
                    {quest.description}
                  </p>
                )}
                {getSubGoalName(quest.subGoalId) && (
                  <div className={`flex items-center gap-1 mt-1 text-[10px] uppercase tracking-wider font-bold ${quest.completed ? 'text-green-600 dark:text-green-500 opacity-70' : 'text-blue-500 dark:text-blue-400'}`}>
                    <Tag size={10} /> {getSubGoalName(quest.subGoalId)}
                  </div>
                )}
                {!quest.completed && (
                  <div className="flex items-center gap-1 mt-2 text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/50 px-2 py-1 rounded-md w-max">
                    <Zap size={10} /> +{quest.expReward} EXP
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          
          {quests.filter(q => q.type === activeTab).length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
              {activeTab === 'daily' && <><ScrollText className="mx-auto mb-2 opacity-50" size={32} />No daily quests.<br/>Take a break or add one!</>}
              {activeTab === 'side' && <><Map className="mx-auto mb-2 opacity-50" size={32} />No active side quests.<br/>Explore the world to find some!</>}
              {activeTab === 'experiment' && <><FlaskConical className="mx-auto mb-2 opacity-50" size={32} />No active experiments.<br/>Try analyzing your sleep patterns!</>}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Add Custom Quest Form */}
      <div className="mt-2 pt-2 border-t border-gray-100 dark:border-slate-700">
        {isAdding ? (
          <motion.form 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-gray-50 dark:bg-slate-700 p-3 rounded-xl border border-gray-200 dark:border-slate-600 space-y-2"
            onSubmit={handleAddQuest}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-gray-600 dark:text-gray-300">New {activeTab === 'experiment' ? 'Experiment' : activeTab === 'side' ? 'Side Quest' : 'Quest'}</span>
              <button type="button" onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-red-500"><X size={14} /></button>
            </div>
            <input required value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Title" className="w-full text-sm p-2 rounded-lg bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            <input value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="Description (optional)" className="w-full text-xs p-2 rounded-lg bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            
            {subGoals.length > 0 && (
              <select value={newSubGoalId} onChange={e => setNewSubGoalId(e.target.value)} className="w-full text-xs p-2 rounded-lg bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400">
                <option value="">No specific sub-goal</option>
                {subGoals.map(sg => (
                  <option key={sg.id} value={sg.id}>{sg.title}</option>
                ))}
              </select>
            )}

            <div className="flex gap-2">
              <select value={newCategory} onChange={e => setNewCategory(e.target.value)} className="flex-1 text-xs p-2 rounded-lg bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400">
                <option value="fitness">Fitness</option>
                <option value="reading">Reading</option>
                <option value="travel">Travel</option>
                <option value="cooking">Cooking</option>
                <option value="mentalHealth">Mental Health</option>
                <option value="arts">Arts</option>
                <option value="social">Social</option>
                <option value="practical">Practical</option>
              </select>
              <input type="number" value={newExp} onChange={e => setNewExp(Number(e.target.value))} className="w-20 text-xs p-2 rounded-lg bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="EXP" />
            </div>
            
            <button type="submit" className="w-full py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-xs font-bold transition-colors">
              Save {activeTab === 'experiment' ? 'Experiment' : activeTab === 'side' ? 'Side Quest' : 'Quest'}
            </button>
          </motion.form>
        ) : (
          <button 
            onClick={() => setIsAdding(true)}
            className="w-full py-2 border-2 border-dashed border-gray-300 dark:border-slate-600 hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 text-gray-500 dark:text-gray-400 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <Plus size={16} /> Add Custom {activeTab === 'experiment' ? 'Experiment' : activeTab === 'side' ? 'Side Quest' : 'Quest'}
          </button>
        )}
      </div>
    </motion.div>
  );
}
