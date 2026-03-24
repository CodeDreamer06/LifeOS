import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, Sphere, Text, Html, Float, Sparkles, Torus } from '@react-three/drei';
import * as THREE from 'three';
import { useGameStore } from '../store';
import { motion } from 'framer-motion';

function Tooltip({ text, visible }: { text: string, visible: boolean }) {
  if (!visible) return null;
  return (
    <Html position={[0, 1, 0]} center>
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-xl text-xs font-bold text-gray-700 whitespace-nowrap border-2 border-purple-200 pointer-events-none"
      >
        {text}
      </motion.div>
    </Html>
  );
}

function Potions({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <group position={[1, 1.6, -0.5]}>
      {Array.from({ length: Math.min(count, 5) }).map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5} position={[i * 0.3, 0, 0]}>
          <Cylinder args={[0.05, 0.08, 0.15]} position={[0, 0.075, 0]} castShadow>
            <meshPhysicalMaterial color="#ff69b4" emissive="#ff1493" emissiveIntensity={0.5} transmission={0.9} thickness={0.1} roughness={0.1} />
          </Cylinder>
          <Sphere args={[0.1]} position={[0, 0, 0]} castShadow>
            <meshPhysicalMaterial color="#ff69b4" emissive="#ff1493" emissiveIntensity={0.5} transmission={0.9} thickness={0.1} roughness={0.1} />
          </Sphere>
          <Cylinder args={[0.02, 0.02, 0.05]} position={[0, 0.175, 0]}>
            <meshStandardMaterial color="#8B4513" />
          </Cylinder>
          <Sparkles count={5} scale={0.2} size={0.5} color="#ffb6c1" />
        </Float>
      ))}
    </group>
  );
}

function Bedroom({ level, potions }: { level: number, potions: number }) {
  const [hovered, setHovered] = useState(false);
  const [bouncing, setBouncing] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      if (bouncing) {
        groupRef.current.position.y = 1.6 + Math.abs(Math.sin(state.clock.elapsedTime * 10)) * 0.5;
      } else if (hovered) {
        groupRef.current.position.y = 1.6 + Math.sin(state.clock.elapsedTime * 5) * 0.05;
      } else {
        groupRef.current.position.y = 1.6;
      }
    }
  });

  return (
    <group position={[5, 0, -5]}>
      {/* Floor Rug */}
      <Cylinder args={[4, 4, 0.05, 32]} position={[0, 0.025, 0]} receiveShadow>
        <meshStandardMaterial color="#AEC6CF" />
      </Cylinder>

      {/* Bed */}
      <group position={[2.5, 0, 0]}>
        <Box args={[3, 0.4, 4]} position={[0, 0.2, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#8B5A2B" />
        </Box>
        <Box args={[2.8, 0.2, 3.8]} position={[0, 0.5, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#FFFFFF" />
        </Box>
        <Box args={[2.8, 0.3, 1]} position={[0, 0.6, -1.4]} castShadow receiveShadow>
          <meshStandardMaterial color="#FFB6C1" />
        </Box>
      </group>

      {/* Desk */}
      <group position={[-2, 0, -3]}>
        <Box args={[3, 0.2, 1.5]} position={[0, 1.5, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#8B5A2B" />
        </Box>
        <Box args={[0.2, 1.5, 0.2]} position={[-1.3, 0.75, -0.6]} castShadow receiveShadow>
          <meshStandardMaterial color="#5C4033" />
        </Box>
        <Box args={[0.2, 1.5, 0.2]} position={[1.3, 0.75, -0.6]} castShadow receiveShadow>
          <meshStandardMaterial color="#5C4033" />
        </Box>
        <Box args={[0.2, 1.5, 0.2]} position={[-1.3, 0.75, 0.6]} castShadow receiveShadow>
          <meshStandardMaterial color="#5C4033" />
        </Box>
        <Box args={[0.2, 1.5, 0.2]} position={[1.3, 0.75, 0.6]} castShadow receiveShadow>
          <meshStandardMaterial color="#5C4033" />
        </Box>
        
        {/* Laptop */}
        <Box args={[0.8, 0.05, 0.6]} position={[0, 1.625, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#C0C0C0" />
        </Box>
        <Box args={[0.8, 0.5, 0.05]} position={[0, 1.85, -0.3]} rotation={[-0.2, 0, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#111" emissive="#444" emissiveIntensity={0.5} />
        </Box>

        {/* Contribution Tracker */}
        <group 
          ref={groupRef} 
          position={[-1, 1.6, 0]}
          onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
          onClick={(e) => { e.stopPropagation(); setBouncing(true); setTimeout(() => setBouncing(false), 1000); }}
        >
          <Tooltip text={`Life Core (Lv.${level})`} visible={hovered} />
          <Box args={[0.4, 0.4, 0.4]} castShadow receiveShadow>
            <meshStandardMaterial color={hovered ? "#33FF33" : "#00FF00"} emissive="#00FF00" emissiveIntensity={0.8} />
          </Box>
          <Text position={[0, 0.5, 0]} fontSize={0.2} color="white" anchorX="center" anchorY="middle">
            Lvl {level}
          </Text>
          <Sparkles count={10} scale={1} size={1} color="#00FF00" />
        </group>

        <Potions count={potions} />
      </group>
    </group>
  );
}

function Library({ readingLevel }: { readingLevel: number }) {
  const books = Math.min(readingLevel * 4, 100); 
  const [hovered, setHovered] = useState(false);
  const [chestHovered, setChestHovered] = useState(false);
  const [chestOpen, setChestOpen] = useState(false);
  
  return (
    <group position={[-5, 0, -5]}>
      <Box args={[9, 0.05, 9]} position={[0, 0.025, 0]} receiveShadow>
        <meshStandardMaterial color="#D2B48C" />
      </Box>

      {/* Giant Bookshelf */}
      <group 
        position={[0, 0, -4]}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
      >
        <Tooltip text={`Library (Lv.${readingLevel})`} visible={hovered} />
        <Box args={[8, 6, 1]} position={[0, 3, 0]} castShadow receiveShadow>
          <meshStandardMaterial color={hovered ? "#755331" : "#654321"} />
        </Box>
        {[1, 2, 3, 4, 5].map(y => (
          <Box key={y} args={[7.6, 0.1, 0.8]} position={[0, y, 0]} castShadow receiveShadow>
            <meshStandardMaterial color="#8B5A2B" />
          </Box>
        ))}

        {/* Books */}
        {Array.from({ length: books }).map((_, i) => {
          const shelf = Math.floor(i / 20);
          const posOnShelf = (i % 20) * 0.35 - 3.3;
          const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FDCB6E', '#6C5CE7', '#A8E6CF', '#FF8B94'];
          return (
            <Box 
              key={i} 
              args={[0.2, 0.7, 0.6]} 
              position={[posOnShelf, shelf * 1 + 1.4, 0]} 
              castShadow 
              receiveShadow
            >
              <meshStandardMaterial color={colors[i % colors.length]} />
            </Box>
          );
        })}
      </group>

      {/* Treasure Chest */}
      <group 
        position={[-3, 0, 0]} 
        rotation={[0, Math.PI / 4, 0]}
        onPointerOver={(e) => { e.stopPropagation(); setChestHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setChestHovered(false); document.body.style.cursor = 'auto'; }}
        onClick={(e) => { e.stopPropagation(); setChestOpen(!chestOpen); }}
      >
        <Tooltip text="Treasures & Collections" visible={chestHovered} />
        <Box args={[1.5, 1, 1]} position={[0, 0.5, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#DAA520" />
        </Box>
        <group position={[0, 1, -0.5]} rotation={[chestOpen ? -Math.PI/3 : 0, 0, 0]}>
          <Cylinder args={[0.5, 0.5, 1.5]} position={[0, 0, 0.5]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <meshStandardMaterial color="#B8860B" />
          </Cylinder>
        </group>
        {/* Glow if open */}
        {chestOpen && (
          <>
            <pointLight position={[0, 1.5, 0]} intensity={2} color="#FFD700" distance={3} />
            <Sparkles count={20} scale={2} size={2} color="#FFD700" position={[0, 1.5, 0]} />
          </>
        )}
      </group>

      {/* Reading Chair */}
      <group position={[2, 0, 0]} rotation={[0, -Math.PI / 4, 0]}>
        <Box args={[1.5, 0.5, 1.5]} position={[0, 0.5, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#800000" />
        </Box>
        <Box args={[1.5, 1.5, 0.5]} position={[0, 1.5, -0.5]} castShadow receiveShadow>
          <meshStandardMaterial color="#800000" />
        </Box>
      </group>
    </group>
  );
}

function Gym({ fitnessLevel }: { fitnessLevel: number }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <group 
      position={[5, 0, 5]}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
    >
      <Tooltip text={`Home Gym (Lv.${fitnessLevel})`} visible={hovered} />
      <Box args={[9, 0.05, 9]} position={[0, 0.025, 0]} receiveShadow>
        <meshStandardMaterial color="#2F4F4F" />
      </Box>

      {/* Yoga Mat */}
      {fitnessLevel >= 1 && (
        <Box args={[2, 0.05, 4]} position={[-2, 0.05, 0]} receiveShadow>
          <meshStandardMaterial color={hovered ? "#FFAFF3" : "#FF9FF3"} />
        </Box>
      )}
      
      {/* Dumbbell Rack */}
      {fitnessLevel >= 2 && (
        <group position={[3, 0, -3]}>
          <Box args={[2, 1, 0.5]} position={[0, 0.5, 0]} castShadow receiveShadow>
            <meshStandardMaterial color="#444" />
          </Box>
          {[[-0.5, 1.1, 0], [0.5, 1.1, 0]].map((pos, i) => (
            <group key={i} position={pos as [number, number, number]}>
              <Cylinder args={[0.1, 0.1, 0.6]} rotation={[0, 0, Math.PI / 2]} castShadow>
                <meshStandardMaterial color="#222" />
              </Cylinder>
              <Cylinder args={[0.2, 0.2, 0.15]} position={[-0.25, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
                <meshStandardMaterial color="#111" />
              </Cylinder>
              <Cylinder args={[0.2, 0.2, 0.15]} position={[0.25, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
                <meshStandardMaterial color="#111" />
              </Cylinder>
            </group>
          ))}
        </group>
      )}
      
      {/* Bench Press */}
      {fitnessLevel >= 4 && (
        <group position={[2, 0, 2]}>
          <Box args={[1, 0.5, 2.5]} position={[0, 0.5, 0]} castShadow receiveShadow>
            <meshStandardMaterial color="#111" />
          </Box>
          <Cylinder args={[0.05, 0.05, 2]} position={[-0.6, 1.5, -1]} castShadow>
            <meshStandardMaterial color="#888" />
          </Cylinder>
          <Cylinder args={[0.05, 0.05, 2]} position={[0.6, 1.5, -1]} castShadow>
            <meshStandardMaterial color="#888" />
          </Cylinder>
          <Cylinder args={[0.05, 0.05, 1.5]} position={[0, 1.5, -1]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <meshStandardMaterial color="#CCC" />
          </Cylinder>
          <Cylinder args={[0.3, 0.3, 0.2]} position={[-0.6, 1.5, -1]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <meshStandardMaterial color="#333" />
          </Cylinder>
          <Cylinder args={[0.3, 0.3, 0.2]} position={[0.6, 1.5, -1]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <meshStandardMaterial color="#333" />
          </Cylinder>
        </group>
      )}
    </group>
  );
}

function Kitchen({ cookingLevel }: { cookingLevel: number }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <group 
      position={[-5, 0, 5]}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
    >
      <Tooltip text={`Kitchen (Lv.${cookingLevel})`} visible={hovered} />
      <Box args={[9, 0.05, 9]} position={[0, 0.025, 0]} receiveShadow>
        <meshStandardMaterial color="#FFF8DC" />
      </Box>

      {/* Counters */}
      {cookingLevel >= 1 && (
        <group position={[-3, 0, 0]}>
          <Box args={[2, 1.5, 6]} position={[0, 0.75, 0]} castShadow receiveShadow>
            <meshStandardMaterial color="#F5F5F5" />
          </Box>
          <Box args={[2.2, 0.1, 6.2]} position={[0, 1.55, 0]} castShadow receiveShadow>
            <meshStandardMaterial color="#333" />
          </Box>
        </group>
      )}

      {/* Fridge */}
      {cookingLevel >= 2 && (
        <Box args={[2, 4, 2]} position={[-3, 2, -3]} castShadow receiveShadow>
          <meshStandardMaterial color="#E0E0E0" />
        </Box>
      )}

      {/* Stove & Pots */}
      {cookingLevel >= 3 && (
        <group position={[-3, 1.6, 1]}>
          <Cylinder args={[0.4, 0.4, 0.3]} position={[0, 0.15, 0]} castShadow>
            <meshStandardMaterial color="#111" />
          </Cylinder>
          <Cylinder args={[0.3, 0.3, 0.4]} position={[0, 0.3, 0]} castShadow>
            <meshStandardMaterial color="#C0C0C0" />
          </Cylinder>
          {hovered && <Sparkles count={10} scale={1} size={1} color="#FF4500" position={[0, 0.5, 0]} />}
        </group>
      )}
    </group>
  );
}

function CenterPiece({ mentalHealthLevel }: { mentalHealthLevel: number }) {
  const [hovered, setHovered] = useState(false);
  const plantCount = Math.min(mentalHealthLevel, 6);

  return (
    <group 
      position={[0, 0, 0]}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
    >
      <Tooltip text={`Zen Garden (Lv.${mentalHealthLevel})`} visible={hovered} />
      <Cylinder args={[2, 2, 0.06, 32]} position={[0, 0.03, 0]} receiveShadow>
        <meshStandardMaterial color="#98FB98" />
      </Cylinder>

      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
        <Cylinder args={[0.8, 1, 0.5]} position={[0, 0.25, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#A9A9A9" />
        </Cylinder>
        <Sphere args={[1]} position={[0, 1.5, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#2ECC71" />
        </Sphere>
        <Sphere args={[0.8]} position={[0.5, 1.2, 0.5]} castShadow receiveShadow>
          <meshStandardMaterial color="#27AE60" />
        </Sphere>
        <Sphere args={[0.8]} position={[-0.5, 1.8, -0.2]} castShadow receiveShadow>
          <meshStandardMaterial color="#2ECC71" />
        </Sphere>
      </Float>

      {Array.from({ length: plantCount }).map((_, i) => {
        const angle = (i / plantCount) * Math.PI * 2;
        const x = Math.cos(angle) * 1.5;
        const z = Math.sin(angle) * 1.5;
        return (
          <group key={i} position={[x, 0, z]}>
            <Cylinder args={[0.2, 0.15, 0.3]} position={[0, 0.15, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#D2B48C" />
            </Cylinder>
            <Sphere args={[0.3]} position={[0, 0.4, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#2ECC71" />
            </Sphere>
          </group>
        );
      })}
    </group>
  );
}

function ArtStudio({ artsLevel }: { artsLevel: number }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <group 
      position={[15, 0, -5]}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
    >
      <Tooltip text={`Art Studio (Lv.${artsLevel})`} visible={hovered} />
      <Box args={[9, 0.05, 9]} position={[0, 0.025, 0]} receiveShadow>
        <meshStandardMaterial color="#FFF0F5" />
      </Box>

      {/* Easel */}
      {artsLevel >= 1 && (
        <group position={[0, 0, 0]} rotation={[0, -Math.PI / 4, 0]}>
          <Cylinder args={[0.05, 0.05, 2]} position={[0, 1, 0]} castShadow>
            <meshStandardMaterial color="#8B4513" />
          </Cylinder>
          <Cylinder args={[0.05, 0.05, 2]} position={[-0.5, 1, 0.5]} rotation={[0, 0, 0.2]} castShadow>
            <meshStandardMaterial color="#8B4513" />
          </Cylinder>
          <Cylinder args={[0.05, 0.05, 2]} position={[0.5, 1, 0.5]} rotation={[0, 0, -0.2]} castShadow>
            <meshStandardMaterial color="#8B4513" />
          </Cylinder>
          <Box args={[1.5, 1, 0.1]} position={[0, 1.2, 0.2]} rotation={[-0.2, 0, 0]} castShadow>
            <meshStandardMaterial color="#FFFFFF" />
          </Box>
          <Box args={[0.8, 0.5, 0.2]} position={[0, 1.2, 0.3]} rotation={[-0.2, 0, 0]} castShadow>
            <meshStandardMaterial color="#FF69B4" />
          </Box>
          {hovered && <Sparkles count={10} scale={1} size={1} color="#FF69B4" position={[0, 1.2, 0.2]} />}
        </group>
      )}
    </group>
  );
}

export default function House() {
  const stats = useGameStore(state => state.stats);
  const level = useGameStore(state => state.level);
  const potions = useGameStore(state => state.potions);

  return (
    <group>
      {/* Main Floor */}
      <Box args={[40, 0.2, 20]} position={[0, -0.1, 0]} receiveShadow>
        <meshStandardMaterial color="#E8DCC4" />
      </Box>
      
      {/* Outer Walls */}
      <Box args={[40, 6, 0.5]} position={[0, 3, -10.25]} receiveShadow>
        <meshStandardMaterial color="#F5F5DC" />
      </Box>
      <Box args={[0.5, 6, 20]} position={[-20.25, 3, 0]} receiveShadow>
        <meshStandardMaterial color="#F5F5DC" />
      </Box>

      {/* Inner Half-Walls */}
      <Box args={[0.5, 1.5, 10]} position={[0, 0.75, -5]} receiveShadow castShadow>
        <meshStandardMaterial color="#FFF0F5" />
      </Box>
      <Box args={[0.5, 1.5, 10]} position={[0, 0.75, 5]} receiveShadow castShadow>
        <meshStandardMaterial color="#FFF0F5" />
      </Box>
      <Box args={[10, 1.5, 0.5]} position={[-5, 0.75, 0]} receiveShadow castShadow>
        <meshStandardMaterial color="#FFF0F5" />
      </Box>
      <Box args={[10, 1.5, 0.5]} position={[5, 0.75, 0]} receiveShadow castShadow>
        <meshStandardMaterial color="#FFF0F5" />
      </Box>

      {/* Rooms */}
      <Library readingLevel={stats.reading} />
      <Bedroom level={level} potions={potions} />
      <Kitchen cookingLevel={stats.cooking} />
      <Gym fitnessLevel={stats.fitness} />
      <CenterPiece mentalHealthLevel={stats.mentalHealth} />
      <ArtStudio artsLevel={stats.arts || 1} />
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 15, 10]} 
        intensity={1.2} 
        castShadow 
        shadow-mapSize-width={2048} 
        shadow-mapSize-height={2048}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
      />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#FFE4B5" />
    </group>
  );
}
