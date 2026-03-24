import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Shield, CheckCircle2, ChevronRight, Activity, Brain, Palette, Book, Globe, Smartphone, HeartPulse, Plus, X, ListTodo } from 'lucide-react';
import { useGameStore, Skill, SubGoal } from '../store';

const ALL_SKILLS = [
  { id: 's1', name: 'Sports & Games', category: 'fitness', icon: '🏃', color: 'bg-orange-500', desc: 'Active sports, competitive games' },
  { id: 's2', name: 'Fitness', category: 'fitness', icon: '💪', color: 'bg-red-500', desc: 'Workout, running, lifting' },
  { id: 's3', name: 'Diet', category: 'fitness', icon: '🥗', color: 'bg-green-500', desc: 'Healthy eating, nutrition' },
  { id: 's4', name: 'Mental Health', category: 'mentalHealth', icon: '🧠', color: 'bg-purple-500', desc: 'Stress management, therapy, journaling' },
  { id: 's5', name: 'Self-Care', category: 'mentalHealth', icon: '✨', color: 'bg-pink-400', desc: 'Skincare, sleep, beauty' },
  { id: 's6', name: 'Arts', category: 'arts', icon: '🎨', color: 'bg-rose-500', desc: 'Painting, music, dance, writing' },
  { id: 's7', name: 'Academics', category: 'reading', icon: '🔬', color: 'bg-blue-600', desc: 'Science, business, humanities' },
  { id: 's8', name: 'Life Experiences', category: 'travel', icon: '🌍', color: 'bg-teal-500', desc: 'Traveling, escape rooms, trekking' },
  { id: 's9', name: 'Performative Arts', category: 'arts', icon: '🎭', color: 'bg-yellow-500', desc: 'Fast typing, juggling, cubing' },
  { id: 's10', name: 'Reading Books', category: 'reading', icon: '📚', color: 'bg-indigo-400', desc: 'Fiction, non-fiction reading' },
  { id: 's11', name: 'Language Learning', category: 'reading', icon: '🗣️', color: 'bg-indigo-600', desc: 'Learning new languages' },
  { id: 's12', name: 'Social Media Creation', category: 'social', icon: '📱', color: 'bg-sky-500', desc: 'Content creation, video editing' },
  { id: 's13', name: 'Practical Skills', category: 'practical', icon: '🛠️', color: 'bg-slate-600', desc: 'First aid, finances, investing' },
];

const ALL_VICES = [
  { id: 'bingeEating', name: 'Binge Eating', icon: '🍔', desc: 'Cheat days managed with potions' },
  { id: 'doomscrolling', name: 'Doomscrolling / Netflix', icon: '📱', desc: 'Tracked time, costs potions for overdosing' },
  { id: 'burnout', name: 'Workaholism / Burnout', icon: '🧨', desc: 'Working without breaks / self-care' },
];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(new Set());
  const [selectedVices, setSelectedVices] = useState<Set<string>>(new Set());
  const [subGoals, setSubGoals] = useState<Record<string, string[]>>({});
  const [newSubGoalInputs, setNewSubGoalInputs] = useState<Record<string, string>>({});
  
  const completeOnboarding = useGameStore((state) => state.completeOnboarding);

  const toggleSkill = (id: string) => {
    const next = new Set(selectedSkills);
    if (next.has(id)) {
      next.delete(id);
      setSubGoals(prev => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    } else {
      next.add(id);
    }
    setSelectedSkills(next);
  };

  const toggleVice = (id: string) => {
    const next = new Set(selectedVices);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedVices(next);
  };

  const handleAddSubGoal = (e: React.FormEvent, skillId: string) => {
    e.preventDefault();
    const title = newSubGoalInputs[skillId];
    if (!title || !title.trim()) return;
    
    setSubGoals(prev => ({
      ...prev,
      [skillId]: [...(prev[skillId] || []), title.trim()]
    }));
    
    setNewSubGoalInputs(prev => ({
      ...prev,
      [skillId]: ''
    }));
  };

  const handleRemoveSubGoal = (skillId: string, index: number) => {
    setSubGoals(prev => ({
      ...prev,
      [skillId]: prev[skillId].filter((_, i) => i !== index)
    }));
  };

  const handleFinish = () => {
    const initialSkills: Skill[] = ALL_SKILLS.filter(s => selectedSkills.has(s.id)).map(s => ({
      id: s.id,
      name: s.name,
      level: 1,
      exp: 0,
      maxExp: 100,
      category: s.category,
      icon: s.icon,
      color: s.color,
    }));
    
    const formattedSubGoals: SubGoal[] = [];
    Object.entries(subGoals).forEach(([skillId, titles]) => {
      titles.forEach(title => {
        formattedSubGoals.push({
          id: Math.random().toString(36).substr(2, 9),
          skillId,
          title
        });
      });
    });
    
    completeOnboarding(initialSkills, Array.from(selectedVices), formattedSubGoals);
  };

  return (
    <div className="fixed inset-0 bg-slate-900 z-50 flex flex-col items-center justify-center p-4 sm:p-8 font-sans overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 blur-[120px] rounded-full"></div>
      </div>

      <motion.div 
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-4xl max-h-[90vh] flex flex-col bg-slate-800/80 backdrop-blur-xl border border-slate-700 shadow-2xl rounded-3xl overflow-hidden relative"
      >
        <div className="p-8 sm:p-12 overflow-y-auto custom-scrollbar flex-1">
          
          {/* STEP 1: WELCOME & SKILLS */}
          {step === 1 && (
            <>
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center p-4 bg-blue-500/20 text-blue-400 rounded-full mb-6">
                  <Target size={40} />
                </div>
                <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Design Your Character</h1>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                  Welcome to LifeOS. Select the areas of your life you want to actively improve. These will become your core skill trees.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {ALL_SKILLS.map((skill) => {
                  const isSelected = selectedSkills.has(skill.id);
                  return (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      key={skill.id}
                      onClick={() => toggleSkill(skill.id)}
                      className={`relative flex items-center p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                        isSelected 
                          ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.2)]' 
                          : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mr-4 ${skill.color}`}>
                        {skill.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                          {skill.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{skill.desc}</p>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="absolute top-3 right-3 text-blue-500" size={18} />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex justify-between items-center mt-10 p-6 bg-slate-800/80 rounded-2xl border border-slate-700 sticky bottom-0">
                <p className="text-slate-400 font-medium">
                  <span className="text-white bg-slate-700 px-3 py-1 rounded-full mr-2">{selectedSkills.size}</span>
                  paths selected
                </p>
                <button 
                  onClick={() => setStep(2)}
                  disabled={selectedSkills.size === 0}
                  className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold flex items-center shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all"
                >
                  Next Phase <ChevronRight className="ml-2" size={20} />
                </button>
              </div>
            </>
          )}

          {/* STEP 2: VICES */}
          {step === 2 && (
            <>
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center p-4 bg-red-500/20 text-red-500 rounded-full mb-6 relative">
                  <Shield size={40} />
                  <div className="absolute inset-0 bg-red-500/20 animate-ping rounded-full blur-xl"></div>
                </div>
                <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Identify Your Debuffs</h1>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                  To grow, we must first identify our weaknesses. Select the bad habits you want to break. These will cost HP or potions to indulge in.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {ALL_VICES.map((vice) => {
                  const isSelected = selectedVices.has(vice.id);
                  return (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      key={vice.id}
                      onClick={() => toggleVice(vice.id)}
                      className={`relative flex flex-col items-center p-8 rounded-3xl border-2 transition-all duration-300 ${
                        isSelected 
                          ? 'border-red-500 bg-red-500/10 shadow-[0_0_30px_rgba(239,68,68,0.2)]' 
                          : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                      }`}
                    >
                      <div className={`text-6xl mb-6 ${isSelected ? 'animate-bounce' : ''}`}>
                        {vice.icon}
                      </div>
                      <h3 className={`text-xl font-black text-center mb-3 ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                        {vice.name}
                      </h3>
                      <p className="text-sm text-slate-500 text-center leading-relaxed">
                        {vice.desc}
                      </p>
                      {isSelected && (
                        <div className="absolute top-4 right-4 bg-red-500 rounded-full p-1 text-white">
                          <CheckCircle2 size={24} />
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center mt-10 p-6 bg-slate-800/80 rounded-2xl border border-slate-700 sticky bottom-0 gap-4">
                <button 
                  onClick={() => setStep(1)}
                  className="text-slate-400 hover:text-white px-6 py-3 rounded-xl font-medium transition-colors"
                >
                  Back
                </button>
                <div className="flex-1"></div>
                <button 
                  onClick={() => setStep(3)}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold flex items-center shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all"
                >
                  Next Phase <ChevronRight className="ml-2" size={20} />
                </button>
              </div>
            </>
          )}

          {/* STEP 3: SUB-GOALS */}
          {step === 3 && (
            <>
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center p-4 bg-emerald-500/20 text-emerald-400 rounded-full mb-6">
                  <ListTodo size={40} />
                </div>
                <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Define Your Targets</h1>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                  Break down your selected skills into actionable, concrete sub-goals. What exactly do you want to achieve?
                </p>
              </div>

              <div className="space-y-6 mb-12">
                {ALL_SKILLS.filter(s => selectedSkills.has(s.id)).map(skill => (
                  <div key={skill.id} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${skill.color}`}>
                        {skill.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                    </div>

                    <div className="space-y-3 mb-4">
                      {(subGoals[skill.id] || []).map((goal, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-slate-800 p-3 rounded-xl border border-slate-600">
                          <span className="text-slate-200 text-sm font-medium">{goal}</span>
                          <button onClick={() => handleRemoveSubGoal(skill.id, idx)} className="text-slate-400 hover:text-red-500 transition-colors">
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={(e) => handleAddSubGoal(e, skill.id)} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="E.g. Bench press 225 lbs"
                        value={newSubGoalInputs[skill.id] || ''}
                        onChange={(e) => setNewSubGoalInputs(prev => ({ ...prev, [skill.id]: e.target.value }))}
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                      />
                      <button type="submit" className="bg-slate-700 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl transition-colors flex items-center justify-center">
                        <Plus size={20} />
                      </button>
                    </form>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center mt-10 p-6 bg-slate-800/80 rounded-2xl border border-slate-700 sticky bottom-0 gap-4">
                <button 
                  onClick={() => setStep(2)}
                  className="text-slate-400 hover:text-white px-6 py-3 rounded-xl font-medium transition-colors"
                >
                  Back
                </button>
                <div className="flex-1"></div>
                <button 
                  onClick={handleFinish}
                  className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-10 py-4 rounded-xl font-black text-lg shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all transform hover:scale-105"
                >
                  Initialize Protocol
                </button>
              </div>
            </>
          )}

        </div>
      </motion.div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(71, 85, 105, 0.8);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 1);
        }
      `}</style>
    </div>
  );
}
