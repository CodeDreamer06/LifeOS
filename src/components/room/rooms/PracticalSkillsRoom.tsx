import { Box, Cylinder, Sphere } from "@react-three/drei";
import {
  Desk,
  FramedMeter,
  InteractiveObject,
} from "../RoomPrimitives";
import { SCENE_INTERACTIONS } from "../constants";
import RoomShell from "../RoomShell";
import type { SkillRoomProps } from "../types";

export default function PracticalSkillsRoom({ skill }: SkillRoomProps) {
  return (
    <RoomShell
      title={skill.name}
      subtitle={`Level ${skill.level}`}
      icon={skill.icon}
      color={skill.color}
      floorColor="#e2e8f0"
      wallColor="#cbd5e1"
      position={[32, 0, 14]}
    >
      <InteractiveObject
        interaction={SCENE_INTERACTIONS.toolBench}
        hoverText="Tool Bench • click"
        accentColor="#64748b"
      >
        <group position={[-2.8, 0, 2.2]}>
          <Desk position={[0, 0, 0]} color="#64748b" width={3.2} />
          <Box
            args={[2.4, 0.12, 0.22]}
            position={[0, 1.58, -0.34]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#334155" />
          </Box>
          <Cylinder
            args={[0.08, 0.08, 0.6]}
            position={[-0.85, 1.55, 0.08]}
            rotation={[0, 0, Math.PI / 2]}
            castShadow
          >
            <meshStandardMaterial color="#f59e0b" />
          </Cylinder>
          <Box
            args={[0.16, 0.36, 0.12]}
            position={[-0.15, 1.43, 0.1]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#ef4444" />
          </Box>
          <Cylinder
            args={[0.06, 0.06, 0.44]}
            position={[0.62, 1.48, 0.06]}
            castShadow
          >
            <meshStandardMaterial color="#0f172a" />
          </Cylinder>
        </group>
      </InteractiveObject>

      <InteractiveObject
        interaction={SCENE_INTERACTIONS.firstAidKit}
        hoverText="First Aid Kit • click"
        accentColor="#ef4444"
      >
        <group position={[3.5, 0, -1.2]}>
          <Box
            args={[1.8, 1.2, 0.9]}
            position={[0, 0.6, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#f8fafc" />
          </Box>
          <Box
            args={[0.9, 0.22, 0.18]}
            position={[0, 0.6, 0.48]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#ef4444" />
          </Box>
          <Box
            args={[0.22, 0.9, 0.18]}
            position={[0, 0.6, 0.48]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#ef4444" />
          </Box>
        </group>
      </InteractiveObject>

      <group position={[-4.2, 0, -3.4]}>
        <Box
          args={[1.2, 1.6, 0.5]}
          position={[0, 0.8, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#475569" />
        </Box>
        <Box
          args={[0.8, 0.14, 0.12]}
          position={[0, 1.55, 0.32]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#94a3b8" />
        </Box>
      </group>

      <group position={[3.9, 0, 3.4]}>
        <Cylinder args={[0.12, 0.12, 0.48]} position={[0, 0.24, 0]} castShadow>
          <meshStandardMaterial color="#1d4ed8" />
        </Cylinder>
        <Sphere args={[0.14]} position={[0.28, 0.18, 0.06]} castShadow>
          <meshStandardMaterial color="#22c55e" />
        </Sphere>
        <Sphere args={[0.14]} position={[-0.24, 0.18, -0.1]} castShadow>
          <meshStandardMaterial color="#f59e0b" />
        </Sphere>
      </group>

      <FramedMeter
        title="Capability"
        value={skill.level}
        position={[4.2, 2.4, -5.5]}
        color="#475569"
      />
    </RoomShell>
  );
}
