import { Box, Cylinder, Sphere } from "@react-three/drei";
import {
  Dumbbell,
  FramedMeter,
} from "../RoomPrimitives";
import { SCENE_INTERACTIONS } from "../constants";
import RoomShell from "../RoomShell";
import type { SkillRoomProps } from "../types";

function CylinderPlateRack() {
  return (
    <group>
      <Cylinder
        args={[0.22, 0.22, 0.3]}
        position={[-4.9, 0.25, 2.5]}
        castShadow
      >
        <meshStandardMaterial color="#111827" />
      </Cylinder>
      <Cylinder
        args={[0.22, 0.22, 0.3]}
        position={[-2.7, 0.25, 2.5]}
        castShadow
      >
        <meshStandardMaterial color="#111827" />
      </Cylinder>
      <Cylinder
        args={[0.28, 0.28, 0.12]}
        position={[-4.9, 0.55, 2.5]}
        castShadow
      >
        <meshStandardMaterial color="#334155" />
      </Cylinder>
      <Cylinder
        args={[0.24, 0.24, 0.1]}
        position={[-2.7, 0.5, 2.5]}
        castShadow
      >
        <meshStandardMaterial color="#475569" />
      </Cylinder>
    </group>
  );
}

export default function FitnessRoom({ skill }: SkillRoomProps) {
  return (
    <RoomShell
      title={skill.name}
      subtitle={`Level ${skill.level}`}
      icon={skill.icon}
      color={skill.color}
      floorColor="#d1fae5"
      wallColor="#a7f3d0"
      position={[0, 0, -14]}
    >
      <Box
        args={[2.8, 0.2, 5.2]}
        position={[-3.8, 0.12, 0.4]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#334155" />
      </Box>

      <CylinderPlateRack />

      <group position={[3.6, 0, -2.4]}>
        <Box
          args={[2.4, 1.25, 0.6]}
          position={[0, 0.62, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#475569" />
        </Box>
        <Dumbbell
          position={[-0.65, 1.35, 0]}
          interaction={SCENE_INTERACTIONS.dumbbell}
        />
        <Dumbbell
          position={[0.65, 1.35, 0]}
          interaction={SCENE_INTERACTIONS.dumbbell}
        />
        <Dumbbell
          position={[-0.65, 0.95, 0]}
          scale={0.85}
          interaction={SCENE_INTERACTIONS.dumbbell}
        />
        <Dumbbell
          position={[0.65, 0.95, 0]}
          scale={0.85}
          interaction={SCENE_INTERACTIONS.dumbbell}
        />
      </group>

      <group position={[2.4, 0, 2.2]}>
        <Box
          args={[1.1, 0.45, 2.6]}
          position={[0, 0.48, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#111827" />
        </Box>
        <Cylinder
          args={[0.06, 0.06, 2.3]}
          position={[0, 1.55, -0.9]}
          rotation={[0, 0, Math.PI / 2]}
          castShadow
        >
          <meshStandardMaterial color="#d1d5db" />
        </Cylinder>
        <Cylinder
          args={[0.26, 0.26, 0.18]}
          position={[-0.75, 1.55, -0.9]}
          rotation={[0, 0, Math.PI / 2]}
          castShadow
        >
          <meshStandardMaterial color="#1f2937" />
        </Cylinder>
        <Cylinder
          args={[0.26, 0.26, 0.18]}
          position={[0.75, 1.55, -0.9]}
          rotation={[0, 0, Math.PI / 2]}
          castShadow
        >
          <meshStandardMaterial color="#1f2937" />
        </Cylinder>
      </group>

      <group position={[-0.7, 0, -3.4]}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Dumbbell
            key={i}
            position={[i * 0.65 - 1, 0.28, 0]}
            scale={0.8 + i * 0.1}
            interaction={SCENE_INTERACTIONS.dumbbell}
          />
        ))}
      </group>

      <group position={[-4.6, 0, -3.4]}>
        <Sphere args={[0.35]} position={[0, 0.35, 0]} castShadow>
          <meshStandardMaterial color="#ef4444" />
        </Sphere>
        <Sphere args={[0.35]} position={[0.9, 0.35, 0.2]} castShadow>
          <meshStandardMaterial color="#22c55e" />
        </Sphere>
        <Sphere args={[0.35]} position={[1.8, 0.35, 0]} castShadow>
          <meshStandardMaterial color="#3b82f6" />
        </Sphere>
      </group>

      <FramedMeter
        title="Strength"
        value={skill.level}
        position={[-4.3, 2.4, -5.5]}
        color="#22c55e"
      />
    </RoomShell>
  );
}
