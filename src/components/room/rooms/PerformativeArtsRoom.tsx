import { Box, Cylinder, Sphere } from "@react-three/drei";
import {
  FramedMeter,
  InteractiveObject,
} from "../RoomPrimitives";
import { SCENE_INTERACTIONS } from "../constants";
import RoomShell from "../RoomShell";
import type { SkillRoomProps } from "../types";

export default function PerformativeArtsRoom({ skill }: SkillRoomProps) {
  return (
    <RoomShell
      title={skill.name}
      subtitle={`Level ${skill.level}`}
      icon={skill.icon}
      color={skill.color}
      floorColor="#fef3c7"
      wallColor="#fde68a"
      position={[16, 0, 14]}
    >
      <InteractiveObject
        interaction={SCENE_INTERACTIONS.stage}
        hoverText="Performance Stage • click"
        accentColor="#eab308"
      >
        <group position={[0, 0, 1.2]}>
          <Cylinder
            args={[2.6, 2.6, 0.28, 32]}
            position={[0, 0.14, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#7c2d12" />
          </Cylinder>
          <Cylinder
            args={[2.15, 2.15, 0.08, 32]}
            position={[0, 0.32, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#f59e0b" />
          </Cylinder>
        </group>
      </InteractiveObject>

      <InteractiveObject
        interaction={SCENE_INTERACTIONS.microphone}
        hoverText="Microphone • click"
        accentColor="#f8fafc"
      >
        <group position={[0.8, 0, 1.1]}>
          <Cylinder args={[0.05, 0.05, 2.2]} position={[0, 1.1, 0]} castShadow>
            <meshStandardMaterial color="#94a3b8" />
          </Cylinder>
          <Sphere args={[0.16]} position={[0, 2.28, 0]} castShadow>
            <meshStandardMaterial color="#e5e7eb" />
          </Sphere>
          <Cylinder
            args={[0.18, 0.26, 0.12]}
            position={[0, 0.06, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#334155" />
          </Cylinder>
        </group>
      </InteractiveObject>

      <group position={[-4.2, 0, 2.2]}>
        <Box
          args={[1.1, 2.6, 1.1]}
          position={[0, 1.3, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#7f1d1d" />
        </Box>
        <Box
          args={[1.16, 2.66, 0.08]}
          position={[0, 1.3, 0.56]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#fef2f2" />
        </Box>
      </group>

      <group position={[4.2, 0, 2.1]}>
        <Box
          args={[1.1, 2.6, 1.1]}
          position={[0, 1.3, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#1e293b" />
        </Box>
        <Sphere args={[0.12]} position={[-0.24, 2.15, 0.58]} castShadow>
          <meshStandardMaterial color="#ef4444" />
        </Sphere>
        <Sphere args={[0.12]} position={[0, 2.15, 0.58]} castShadow>
          <meshStandardMaterial color="#22c55e" />
        </Sphere>
        <Sphere args={[0.12]} position={[0.24, 2.15, 0.58]} castShadow>
          <meshStandardMaterial color="#3b82f6" />
        </Sphere>
      </group>

      <group position={[-3.9, 0, -3.3]}>
        <Sphere args={[0.22]} position={[0, 0.22, 0]} castShadow>
          <meshStandardMaterial color="#ec4899" />
        </Sphere>
        <Sphere args={[0.22]} position={[0.36, 0.22, 0.08]} castShadow>
          <meshStandardMaterial color="#8b5cf6" />
        </Sphere>
        <Sphere args={[0.22]} position={[-0.34, 0.22, -0.1]} castShadow>
          <meshStandardMaterial color="#06b6d4" />
        </Sphere>
      </group>

      <FramedMeter
        title="Performance"
        value={skill.level}
        position={[4.2, 2.4, -5.5]}
        color="#eab308"
      />
    </RoomShell>
  );
}
