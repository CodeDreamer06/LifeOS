import re

with open('src/store.ts', 'r') as f:
    content = f.read()

# 1. Add persist to imports
content = content.replace("import { create } from 'zustand';", "import { create } from 'zustand';\nimport { persist, createJSONStorage } from 'zustand/middleware';")

# 2. Add subGoal and update Quest
content = content.replace("export interface Quest {", """export interface SubGoal {
  id: string;
  skillId: string;
  title: string;
}

export interface Quest {""")
content = re.sub(r"category: 'fitness'.*?;", "category: string;", content)
content = content.replace("type: 'daily' | 'side' | 'experiment';", "type: 'daily' | 'side' | 'experiment';\n  subGoalId?: string;")

# 3. Update GameState
content = re.sub(r"stats: \{[\s\S]*?\};", "stats: Record<string, number>;", content)
content = content.replace("skills: Skill[];", "skills: Skill[];\n  subGoals: SubGoal[];\n  dollars: number;\n  theme: 'light' | 'dark';")
content = content.replace("completeOnboarding: (skills: Skill[], vices: string[]) => void;", "completeOnboarding: (skills: Skill[], vices: string[], subGoals: SubGoal[]) => void;\n  toggleTheme: () => void;\n  triggerEvolution: () => void;")

# 4. create the persist middleware
content = content.replace("export const useGameStore = create<GameState>((set) => ({", """export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({""")
content = content.replace("}));", """}),
    {
      name: 'lifeos-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);""")

# 5. state initialized values
content = content.replace("maxHp: 100,", "maxHp: 100,\n  dollars: 0,\n  theme: 'dark',\n  subGoals: [],")

# 6. completeQuest updates exp and dollars
content = content.replace("let newExp = state.exp + quest.expReward;", "let newExp = state.exp + quest.expReward;\n    let newDollars = state.dollars + Math.floor(quest.expReward / 5);")
content = content.replace("exp: newExp,", "exp: newExp,\n      dollars: newDollars,")

# 7. update addWishlistProgress to cost dollars
new_wishlist_progress = """addWishlistProgress: (id, amount) => set((state) => {
    if (state.dollars >= amount) {
      return {
        dollars: state.dollars - amount,
        wishlist: state.wishlist.map(w =>
          w.id === id ? { ...w, currentAmount: Math.min(w.currentAmount + amount, w.targetAmount) } : w
        )
      };
    }
    return state;
  }),"""
content = re.sub(r"addWishlistProgress:.+?\]\}\)\),", new_wishlist_progress, content, flags=re.DOTALL)

# 8. completeOnboarding updates
new_complete = """completeOnboarding: (skills, vices, subGoals) => set((state) => ({
    isOnboarded: true,
    skills: skills,
    subGoals: subGoals,
    vices: {
      bingeEating: vices.includes('bingeEating') ? 20 : 0,
      doomscrolling: vices.includes('doomscrolling') ? 45 : 0,
      burnout: vices.includes('burnout') ? 10 : 0,
    }
  })),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  triggerEvolution: () => set((state) => {
    // We will just do a placeholder or something, but handle AvatarEvolution correctly in App
    return state;
  })"""
content = re.sub(r"completeOnboarding: \(skills, vices\) => set\(\(state\) => \(\{[\s\S]*?\}\)\)", new_complete, content)

with open('src/store.ts', 'w') as f:
    f.write(content)
print("done")
