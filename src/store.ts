import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface SubGoal {
  id: string;
  skillId: string;
  title: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  category: string;
  expReward: number;
  completed: boolean;
  type: 'daily' | 'side' | 'experiment';
  subGoalId?: string;
}

export interface WishlistItem {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  category: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  exp: number;
  maxExp: number;
  category: string;
  icon: string;
  color: string;
}

interface GameState {
  level: number;
  exp: number;
  maxExp: number;
  hp: number;
  maxHp: number;
  dollars: number;
  stats: Record<string, number>;
  skills: Skill[];
  subGoals: SubGoal[];
  vices: {
    bingeEating: number;
    doomscrolling: number;
    burnout: number;
  };
  avatarUrl: string;
  quests: Quest[];
  wishlist: WishlistItem[];
  collections: Collection[];
  streaks: number;
  potions: number;
  isOnboarded: boolean;
  theme: 'light' | 'dark';
  
  // Actions
  toggleTheme: () => void;
  triggerEvolution: () => void;
  addExp: (amount: number) => void;
  completeQuest: (id: string) => void;
  addQuest: (quest: Omit<Quest, 'id' | 'completed'>) => void;
  updateStat: (stat: string, amount: number) => void;
  addSkillExp: (skillId: string, amount: number) => void;
  addVice: (vice: keyof GameState['vices'], amount: number) => void;
  cureVice: (vice: keyof GameState['vices']) => void;
  setAvatarUrl: (url: string) => void;
  addWishlistProgress: (id: string, amount: number) => void;
  addWishlistItem: (item: Omit<WishlistItem, 'id' | 'currentAmount'>) => void;
  usePotion: () => void;
  unlockCollection: (collection: Collection) => void;
  completeOnboarding: (skills: Skill[], vices: string[], subGoals: SubGoal[]) => void;
}

const INITIAL_QUESTS: Quest[] = [
  { id: '1', title: 'Morning Run', description: 'Run 3km', category: 'fitness', expReward: 50, completed: false, type: 'daily' },
  { id: '2', title: 'Read 20 Pages', description: 'Read a non-fiction book', category: 'reading', expReward: 30, completed: false, type: 'daily' },
  { id: '3', title: 'Cook a new recipe', description: 'Try making pasta from scratch', category: 'cooking', expReward: 60, completed: false, type: 'daily' },
  { id: '4', title: 'Meditate', description: '10 minutes of mindfulness', category: 'mentalHealth', expReward: 40, completed: false, type: 'daily' },
  { id: 'sq1', title: 'Explore the Park', description: 'Visit a new local park', category: 'travel', expReward: 100, completed: false, type: 'side' },
  { id: 'sq2', title: 'Art Gallery', description: 'Visit the local art gallery', category: 'arts', expReward: 150, completed: false, type: 'side' },
  { id: 'ex1', title: 'Sleep Tracking', description: 'Log sleep for 7 days', category: 'mentalHealth', expReward: 200, completed: false, type: 'experiment' },
  { id: 'ex2', title: 'Vegan for a Day', description: 'Eat only plant-based food', category: 'cooking', expReward: 120, completed: false, type: 'experiment' },
];

const POSSIBLE_COLLECTIONS: Collection[] = [
  { id: 'c1', name: 'Golden Dumbbell', description: 'Awarded for exceptional fitness.', icon: '🏋️', category: 'fitness' },
  { id: 'c2', name: 'Ancient Tome', description: 'A rare book of wisdom.', icon: '📖', category: 'reading' },
  { id: 'c3', name: 'Chef\'s Star', description: 'Mastery of the culinary arts.', icon: '⭐', category: 'cooking' },
  { id: 'c4', name: 'Zen Crystal', description: 'Pure peace of mind.', icon: '🔮', category: 'mentalHealth' },
  { id: 'c5', name: 'Globe Trotter', description: 'A compass that points to adventure.', icon: '🧭', category: 'travel' },
];

const INITIAL_SKILLS: Skill[] = [
  { id: 's1', name: 'Sports & Games', level: 1, exp: 0, maxExp: 100, category: 'fitness', icon: '🏃', color: 'bg-orange-500' },
  { id: 's2', name: 'Diet & Nutrition', level: 1, exp: 0, maxExp: 100, category: 'fitness', icon: '🥗', color: 'bg-green-500' },
  { id: 's3', name: 'Therapy & Journaling', level: 1, exp: 0, maxExp: 100, category: 'mentalHealth', icon: '📝', color: 'bg-pink-500' },
  { id: 's4', name: 'Self-Care (Sleep, Skincare)', level: 1, exp: 0, maxExp: 100, category: 'mentalHealth', icon: '✨', color: 'bg-purple-500' },
  { id: 's5', name: 'Fine Arts (Painting, Music)', level: 1, exp: 0, maxExp: 100, category: 'arts', icon: '🎨', color: 'bg-rose-500' },
  { id: 's6', name: 'Academics (Science, Biz)', level: 1, exp: 0, maxExp: 100, category: 'reading', icon: '🔬', color: 'bg-blue-500' },
  { id: 's7', name: 'Life Experiences (Travel)', level: 1, exp: 0, maxExp: 100, category: 'travel', icon: '🌍', color: 'bg-teal-500' },
  { id: 's8', name: 'Performative Arts', level: 1, exp: 0, maxExp: 100, category: 'arts', icon: '🎭', color: 'bg-yellow-500' },
  { id: 's9', name: 'Language Learning', level: 1, exp: 0, maxExp: 100, category: 'reading', icon: '🗣️', color: 'bg-indigo-500' },
  { id: 's10', name: 'Social Media Creation', level: 1, exp: 0, maxExp: 100, category: 'social', icon: '📱', color: 'bg-sky-500' },
  { id: 's11', name: 'Practical Skills (Finance, First Aid)', level: 1, exp: 0, maxExp: 100, category: 'practical', icon: '🛠️', color: 'bg-slate-600' },
];

export const getLevelTitle = (level: number) => {
  if (level < 5) return 'Fledgling';
  if (level < 10) return 'Novice';
  if (level < 20) return 'Apprentice';
  if (level < 30) return 'Adept';
  if (level < 40) return 'Expert';
  if (level < 50) return 'Master';
  if (level < 75) return 'Grandmaster';
  return 'Legend';
};

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      level: 1,
      exp: 0,
      maxExp: 100,
      hp: 100,
      maxHp: 100,
      dollars: 0,
      stats: {
        fitness: 1,
        reading: 1,
        travel: 1,
        cooking: 1,
        mentalHealth: 1,
      },
      skills: INITIAL_SKILLS,
      subGoals: [],
      vices: {
        bingeEating: 20,
        doomscrolling: 45,
        burnout: 10,
      },
      avatarUrl: 'https://picsum.photos/seed/cute-rpg-avatar/200/200',
      quests: INITIAL_QUESTS,
      wishlist: [
        { id: 'w1', title: 'New Running Shoes', targetAmount: 120, currentAmount: 45, category: 'fitness' },
        { id: 'w2', title: 'Kindle Oasis', targetAmount: 250, currentAmount: 100, category: 'reading' },
      ],
      collections: [],
      streaks: 3,
      potions: 3,
      isOnboarded: false,
      theme: 'light',

      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

      triggerEvolution: () => set((state) => ({})), // a nop action for external triggers to detect.

      addExp: (amount) => set((state) => {
        let newExp = state.exp + amount;
        let newLevel = state.level;
        let newMaxExp = state.maxExp;
        
        while (newExp >= newMaxExp) {
          newExp -= newMaxExp;
          newLevel += 1;
          newMaxExp = Math.floor(newMaxExp * 1.5);
        }
        
        return { exp: newExp, level: newLevel, maxExp: newMaxExp };
      }),

      completeQuest: (id) => set((state) => {
        const quest = state.quests.find(q => q.id === id);
        if (!quest || quest.completed) return state;

        const newQuests = state.quests.map(q => 
          q.id === id ? { ...q, completed: true } : q
        );

        let newExp = state.exp + quest.expReward;
        let newLevel = state.level;
        let newMaxExp = state.maxExp;
        let newDollars = state.dollars + Math.floor(quest.expReward / 5);
        
        while (newExp >= newMaxExp) {
          newExp -= newMaxExp;
          newLevel += 1;
          newMaxExp = Math.floor(newMaxExp * 1.5);
        }

        const gotPotion = Math.random() < 0.3;
        
        let newCollections = [...state.collections];
        if (Math.random() < 0.1) {
          const unowned = POSSIBLE_COLLECTIONS.filter(pc => !state.collections.find(c => c.id === pc.id));
          if (unowned.length > 0) {
            const randomCollection = unowned[Math.floor(Math.random() * unowned.length)];
            newCollections.push(randomCollection);
          }
        }

        const relatedSkills = state.skills.filter(s => s.category === quest.category || quest.category === 'mentalHealth');
        let newSkills = [...state.skills];
        if (relatedSkills.length > 0) {
          const targetSkill = relatedSkills[Math.floor(Math.random() * relatedSkills.length)];
          newSkills = newSkills.map(s => {
            if (s.id === targetSkill.id) {
              let sExp = s.exp + 25;
              let sLevel = s.level;
              let sMaxExp = s.maxExp;
              if (sExp >= sMaxExp) {
                sExp -= sMaxExp;
                sLevel += 1;
                sMaxExp = Math.floor(sMaxExp * 1.5);
              }
              return { ...s, exp: sExp, level: sLevel, maxExp: sMaxExp };
            }
            return s;
          });
        }

        return {
          quests: newQuests,
          exp: newExp,
          level: newLevel,
          maxExp: newMaxExp,
          dollars: newDollars,
          potions: gotPotion ? state.potions + 1 : state.potions,
          collections: newCollections,
          skills: newSkills,
          stats: {
            ...state.stats,
            [quest.category]: state.stats[quest.category] ? state.stats[quest.category] + 1 : 1
          }
        };
      }),

      addQuest: (quest) => set((state) => ({
        quests: [...state.quests, { ...quest, id: Math.random().toString(36).substr(2, 9), completed: false }]
      })),

      updateStat: (stat, amount) => set((state) => ({
        stats: {
          ...state.stats,
          [stat]: (state.stats[stat] || 0) + amount
        }
      })),

      addSkillExp: (skillId, amount) => set((state) => {
        return {
          skills: state.skills.map(s => {
            if (s.id === skillId) {
              let sExp = s.exp + amount;
              let sLevel = s.level;
              let sMaxExp = s.maxExp;
              while (sExp >= sMaxExp) {
                sExp -= sMaxExp;
                sLevel += 1;
                sMaxExp = Math.floor(sMaxExp * 1.5);
              }
              return { ...s, exp: sExp, level: sLevel, maxExp: sMaxExp };
            }
            return s;
          })
        };
      }),

      addVice: (vice, amount) => set((state) => ({
        vices: {
          ...state.vices,
          [vice]: Math.min(state.vices[vice] + amount, 100)
        }
      })),

      cureVice: (vice) => set((state) => {
        if (state.potions > 0) {
          return {
            potions: state.potions - 1,
            vices: {
              ...state.vices,
              [vice]: Math.max(state.vices[vice] - 40, 0)
            }
          };
        }
        return state;
      }),

      setAvatarUrl: (url) => set({ avatarUrl: url }),

      addWishlistProgress: (id, amount) => set((state) => {
        if (state.dollars >= amount) {
          return {
            dollars: state.dollars - amount,
            wishlist: state.wishlist.map(w => 
              w.id === id ? { ...w, currentAmount: Math.min(w.currentAmount + amount, w.targetAmount) } : w
            )
          };
        }
        return state;
      }),

      addWishlistItem: (item) => set((state) => ({
        wishlist: [...state.wishlist, { ...item, id: Math.random().toString(36).substr(2, 9), currentAmount: 0 }]
      })),

      usePotion: () => set((state) => {
        if (state.potions > 0 && state.hp < state.maxHp) {
          return {
            potions: state.potions - 1,
            hp: Math.min(state.hp + 50, state.maxHp)
          };
        }
        return state;
      }),

      unlockCollection: (collection) => set((state) => {
        if (!state.collections.find(c => c.id === collection.id)) {
          return { collections: [...state.collections, collection] };
        }
        return state;
      }),

      completeOnboarding: (skills, vices, subGoals) => set((state) => ({
        isOnboarded: true,
        skills: skills,
        subGoals: subGoals,
        vices: {
          bingeEating: vices.includes('bingeEating') ? 20 : 0,
          doomscrolling: vices.includes('doomscrolling') ? 45 : 0,
          burnout: vices.includes('burnout') ? 10 : 0,
        }
      }))
    }),
    {
      name: 'lifeos-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
