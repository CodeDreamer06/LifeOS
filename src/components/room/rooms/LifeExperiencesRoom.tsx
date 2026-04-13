import { Box, Cylinder, Sphere } from "@react-three/drei";
import {
  Desk,
  FramedMeter,
  InteractiveObject,
} from "../RoomPrimitives";
import { SCENE_INTERACTIONS } from "../constants";
import RoomShell from "../RoomShell";
import type { SkillRoomProps } from "../types";

export default function LifeExperiencesRoom({ skill }: SkillRoomProps) {
  return (
    <RoomShell
      title={skill.name}
      subtitle={`Level ${skill.level}`}
      icon={skill.icon}
      color={skill.color}
      floorColor="#ccfbf1"
      wallColor="#99f6e4"
      position={[0, 0, 14]}
    >
      <InteractiveObject
        interaction={SCENE_INTERACTIONS.suitcase}
        hoverText="Adventure Kit • click"
        accentColor="#14b8a6"
      >
        <group position={[-3.2, 0, 1.8]}>
          <Box
            args={[1.8, 1.1, 0.9]}
            position={[0, 0.55, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#8b5a2b" />
          </Box>
          <Box
            args={[1.2, 0.18, 0.12]}
            position={[0, 1.16, 0.48]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#f59e0b" />
          </Box>
          <Cylinder
            args={[0.08, 0.08, 0.38]}
            position={[-0.55, 1.05, 0]}
            castShadow
          >
            <meshStandardMaterial color="#475569" />
          </Cylinder>
          <Cylinder
            args={[0.08, 0.08, 0.38]}
            position={[0.55, 1.05, 0]}
            castShadow
          >
            <meshStandardMaterial color="#475569" />
          </Cylinder>
        </group>
      </InteractiveObject>

      <InteractiveObject
        interaction={SCENE_INTERACTIONS.compassTable}
        hoverText="Compass Table • click"
        accentColor="#0f766e"
      >
        <group position={[3.2, 0, 2.1]}>
          <Desk position={[0, 0, 0]} color="#14b8a6" width={2.6} />
          <Cylinder
            args={[0.55, 0.55, 0.08]}
            position={[0, 1.33, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#f8fafc" />
          </Cylinder>
          <Cylinder
            args={[0.06, 0.06, 0.42]}
            position={[0, 1.54, 0]}
            rotation={[Math.PI / 2, 0, 0.8]}
            castShadow
          >
            <meshStandardMaterial color="#ef4444" />
          </Cylinder>
          <Cylinder
            args={[0.04, 0.04, 0.28]}
            position={[0, 1.5, 0]}
            rotation={[Math.PI / 2, 0, -0.6]}
            castShadow
          >
            <meshStandardMaterial color="#1d4ed8" />
          </Cylinder>
          <Sphere args={[0.08]} position={[0, 1.38, 0]} castShadow>
            <meshStandardMaterial color="#334155" />
          </Sphere>
        </group>
      </InteractiveObject>

      <group position={[-4.3, 0, -3.3]}>
        <Box
          args={[1.6, 0.2, 1]}
          position={[0, 0.1, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#0f172a" />
        </Box>
        <Sphere args={[0.12]} position={[-0.42, 0.28, 0.08]} castShadow>
          <meshStandardMaterial color="#22c55e" />
        </Sphere>
        <Sphere args={[0.12]} position={[0, 0.28, -0.04]} castShadow>
          <meshStandardMaterial color="#eab308" />
        </Sphere>
        <Sphere args={[0.12]} position={[0.36, 0.28, 0.12]} castShadow>
          <meshStandardMaterial color="#3b82f6" />
        </Sphere>
      </group>

      <group position={[4.3, 0, -3.1]}>
        <Sphere args={[0.24]} position={[0, 0.24, 0]} castShadow>
          <meshStandardMaterial color="#f97316" />
        </Sphere>
        <Sphere args={[0.2]} position={[0.3, 0.18, 0.14]} castShadow>
          <meshStandardMaterial color="#06b6d4" />
        </Sphere>
        <Sphere args={[0.2]} position={[-0.34, 0.18, -0.1]} castShadow>
          <meshStandardMaterial color="#a855f7" />
        </Sphere>
      </group>

      <FramedMeter
        title="Adventure"
        value={skill.level}
        position={[4.2, 2.4, -5.5]}
        color="#14b8a6"
      />
    </RoomShell>
  );
}
