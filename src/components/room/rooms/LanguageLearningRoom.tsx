import { Box, Cylinder, Sphere } from "@react-three/drei";
import {
  Desk,
  FramedMeter,
  InteractiveObject,
} from "../RoomPrimitives";
import { SCENE_INTERACTIONS } from "../constants";
import RoomShell from "../RoomShell";
import type { SkillRoomProps } from "../types";

export default function LanguageLearningRoom({ skill }: SkillRoomProps) {
  return (
    <RoomShell
      title={skill.name}
      subtitle={`Level ${skill.level}`}
      icon={skill.icon}
      color={skill.color}
      floorColor="#e0e7ff"
      wallColor="#c7d2fe"
      position={[-32, 0, 14]}
    >
      <InteractiveObject
        interaction={SCENE_INTERACTIONS.languageBoard}
        hoverText="Language Board • click"
        accentColor="#4f46e5"
      >
        <group position={[-2.8, 0, 1.4]}>
          <Box
            args={[2.8, 1.8, 0.12]}
            position={[0, 1.8, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#1e293b" />
          </Box>
          <Box
            args={[2.45, 1.45, 0.08]}
            position={[0, 1.8, 0.08]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#dbeafe" />
          </Box>
          <Box
            args={[0.75, 0.12, 0.04]}
            position={[-0.7, 2.18, 0.14]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#f59e0b" />
          </Box>
          <Box
            args={[0.6, 0.12, 0.04]}
            position={[0.15, 1.82, 0.14]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#22c55e" />
          </Box>
          <Box
            args={[0.82, 0.12, 0.04]}
            position={[0.55, 1.42, 0.14]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#3b82f6" />
          </Box>
        </group>
      </InteractiveObject>

      <group position={[2.9, 0, 2.2]}>
        <Desk
          position={[0, 0, 0]}
          color="#4338ca"
          width={2.8}
          interaction={SCENE_INTERACTIONS.languageBoard}
        />
        <Box
          args={[0.95, 0.68, 0.08]}
          position={[-0.45, 1.56, -0.18]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color="#111827"
            emissive="#1d4ed8"
            emissiveIntensity={0.16}
          />
        </Box>
        <Box
          args={[0.55, 0.12, 0.35]}
          position={[0.55, 1.32, 0.1]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#e5e7eb" />
        </Box>
      </group>

      <group position={[4.2, 0, -3.2]}>
        <Cylinder args={[0.12, 0.12, 0.46]} position={[0, 0.23, 0]} castShadow>
          <meshStandardMaterial color="#ef4444" />
        </Cylinder>
        <Cylinder
          args={[0.12, 0.12, 0.46]}
          position={[0.35, 0.23, 0.05]}
          castShadow
        >
          <meshStandardMaterial color="#22c55e" />
        </Cylinder>
        <Cylinder
          args={[0.12, 0.12, 0.46]}
          position={[-0.35, 0.23, -0.05]}
          castShadow
        >
          <meshStandardMaterial color="#3b82f6" />
        </Cylinder>
      </group>

      <group position={[-4.4, 0, -3.3]}>
        <Sphere args={[0.24]} position={[0, 0.24, 0]} castShadow>
          <meshStandardMaterial color="#f59e0b" />
        </Sphere>
        <Sphere args={[0.24]} position={[0.42, 0.24, 0.08]} castShadow>
          <meshStandardMaterial color="#a855f7" />
        </Sphere>
        <Sphere args={[0.24]} position={[-0.42, 0.24, -0.1]} castShadow>
          <meshStandardMaterial color="#06b6d4" />
        </Sphere>
      </group>

      <FramedMeter
        title="Vocabulary"
        value={skill.level}
        position={[4.2, 2.4, -5.5]}
        color="#4f46e5"
      />
    </RoomShell>
  );
}
