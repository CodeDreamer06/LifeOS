import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Box, Sphere, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useGameStore } from "../../../store";
import { BookStack, Desk, FramedMeter, Plant, Potions, Tooltip } from "../RoomPrimitives";
import { SCENE_INTERACTIONS } from "../constants";
import RoomShell from "../RoomShell";
import { InteractiveObject } from "../RoomPrimitives";
import type { BedroomCoreProps } from "../types";

function useRefWithAnimation() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.25;
      ref.current.position.y = 1.3 + Math.sin(state.clock.elapsedTime * 2.2) * 0.08;
    }
  });

  return ref;
}

export default function BedroomCore({ level, potions }: BedroomCoreProps) {
  const [hovered, setHovered] = useState(false);
  const coreRef = useRefWithAnimation();

  return (
    <RoomShell
      title="Life Core Bedroom"
      subtitle={`Level ${level} base`}
      icon="💚"
      color="#22c55e"
      floorColor="#dbeafe"
      wallColor="#bfdbfe"
      position={[0, 0, 0]}
    >
      <InteractiveObject
        interaction={SCENE_INTERACTIONS.bed}
        hoverText="Recovery Station • click"
        accentColor="#f9a8d4"
      >
        <group position={[3, 0, 1]}>
          <Box
            args={[3.2, 0.45, 4.6]}
            position={[0, 0.22, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#8b5a2b" />
          </Box>
          <Box
            args={[3.0, 0.24, 4.2]}
            position={[0, 0.55, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#f8fafc" />
          </Box>
          <Box
            args={[2.8, 0.35, 1.1]}
            position={[0, 0.72, -1.45]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#f9a8d4" />
          </Box>
          <Box
            args={[2.5, 0.04, 3.2]}
            position={[0, 0.69, 0.2]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#e0f2fe" />
          </Box>
        </group>
      </InteractiveObject>

      <Desk position={[-3, 0, 2.2]} interaction={SCENE_INTERACTIONS.desk} />
      <group position={[-3, 0, 2.2]}>
        <Box
          args={[0.95, 0.06, 0.65]}
          position={[0, 1.34, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#cbd5e1" />
        </Box>
        <Box
          args={[0.95, 0.56, 0.06]}
          position={[0, 1.6, -0.3]}
          rotation={[-0.25, 0, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color="#111827"
            emissive="#334155"
            emissiveIntensity={0.25}
          />
        </Box>
        <BookStack
          position={[-0.7, 1.33, 0.1]}
          count={3}
          interaction={SCENE_INTERACTIONS.bookshelf}
        />
      </group>

      <group
        ref={coreRef}
        position={[-1.5, 1.3, -0.5]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          useGameStore.getState().selectInteraction(SCENE_INTERACTIONS.lifeCore);
        }}
      >
        <Tooltip text={`Life Core • Lv.${level}`} visible={hovered} />
        <Box args={[0.55, 0.55, 0.55]} castShadow receiveShadow>
          <meshStandardMaterial
            color="#00ff88"
            emissive="#00ff88"
            emissiveIntensity={0.7}
          />
        </Box>
        <Sparkles count={12} scale={1.1} size={1.1} color="#86efac" />
      </group>

      <group position={[-2.8, 1.4, 0.8]}>
        <Potions count={potions} interaction={SCENE_INTERACTIONS.potionShelf} />
      </group>

      <Plant position={[4.8, 0, -4]} interaction={SCENE_INTERACTIONS.plant} />
      <Plant
        position={[-5, 0, -4.2]}
        leafColor="#16a34a"
        interaction={SCENE_INTERACTIONS.plant}
      />

      <group position={[4.5, 0, 3.7]}>
        <Box
          args={[1.3, 0.55, 1.3]}
          position={[0, 0.28, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#f8fafc" />
        </Box>
        <Sphere args={[0.14]} position={[-0.32, 0.72, 0]} castShadow>
          <meshStandardMaterial color="#f59e0b" />
        </Sphere>
        <Sphere args={[0.14]} position={[0, 0.72, 0]} castShadow>
          <meshStandardMaterial color="#ec4899" />
        </Sphere>
        <Sphere args={[0.14]} position={[0.32, 0.72, 0]} castShadow>
          <meshStandardMaterial color="#8b5cf6" />
        </Sphere>
      </group>

      <FramedMeter
        title="Account Level"
        value={level}
        max={50}
        position={[-3.2, 2.5, -5.55]}
        color="#22c55e"
      />
    </RoomShell>
  );
}
