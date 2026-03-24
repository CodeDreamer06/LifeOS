import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# adding hooks and effect
content = content.replace("import { useGameStore } from './store';", "import { useGameStore } from './store';\nimport { useEffect, useState, useRef } from 'react';\nimport AvatarEvolution from './components/AvatarEvolution';")

# Inside App:
app_body = """export default function App() {
  const isOnboarded = useGameStore((state) => state.isOnboarded);
  const theme = useGameStore((state) => state.theme);
  const level = useGameStore((state) => state.level);
  const [isEvolutionOpen, setIsEvolutionOpen] = useState(false);
  const prevLevelRef = useRef(level);

  useEffect(() => {
    if (isOnboarded && level > prevLevelRef.current) {
      // Level up detected, auto open evolution
      setIsEvolutionOpen(true);
    }
    prevLevelRef.current = level;
  }, [level, isOnboarded]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);"""
content = re.sub(r"export default function App\(\) \{[\s\S]*?const isOnboarded = useGameStore\(\(state\) => state\.isOnboarded\);", app_body, content)

# update div mapping
content = content.replace('<div className="w-full h-screen bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden relative font-sans">', '<div className="w-full h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-500 overflow-hidden relative font-sans text-slate-900 dark:text-slate-100">')

# Add avatar evolution back here:
content = content.replace("</div>\n    </div>", "</div>\n      </div>\n\n      <AvatarEvolution isOpen={isEvolutionOpen} onClose={() => setIsEvolutionOpen(false)} />\n    </div>")

with open('src/App.tsx', 'w') as f:
    f.write(content)
print("patched app")
