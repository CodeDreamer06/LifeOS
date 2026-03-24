import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Room from './components/Room';
import CharacterCard from './components/CharacterCard';
import StatsPanel from './components/StatsPanel';
import QuestList from './components/QuestList';
import Wishlist from './components/Wishlist';
import Onboarding from './components/Onboarding';
import { useGameStore } from './store';
import { useEffect, useState, useRef } from 'react';
import AvatarEvolution from './components/AvatarEvolution';

export default function App() {
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
  }, [theme]);

  if (!isOnboarded) {
    return <Onboarding />;
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-500 overflow-hidden relative font-sans text-slate-900 dark:text-slate-100">
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[18, 18, 18]} fov={45} />
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            minPolarAngle={0.1}
            maxPolarAngle={Math.PI / 2 - 0.05} // Don't go below ground
            minDistance={5}
            maxDistance={40}
            target={[0, 0, 0]}
            makeDefault
          />
          <Room />
        </Canvas>
      </div>

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="pointer-events-auto">
          <CharacterCard />
          <StatsPanel />
          <QuestList />
          <Wishlist />
        </div>
      </div>

      <AvatarEvolution isOpen={isEvolutionOpen} onClose={() => setIsEvolutionOpen(false)} />
    </div>
  );
}
