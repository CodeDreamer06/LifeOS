import { Box, Cylinder, Sphere } from "@react-three/drei";
import {
  Desk,
  FramedMeter,
  InteractiveObject,
} from "../RoomPrimitives";
import { SCENE_INTERACTIONS } from "../constants";
import RoomShell from "../RoomShell";
import type { SkillRoomProps } from "../types";

export default function ArtsRoom({ skill }: SkillRoomProps) {
  return (
    <RoomShell
      title={skill.name}
      subtitle={`Level ${skill.level}`}
      icon={skill.icon}
      color={skill.color}
      floorColor="#ffe4e6"
      wallColor="#fecdd3"
      position={[16, 0, 0]}
    >
      <InteractiveObject
        interaction={SCENE_INTERACTIONS.easel}
        hoverText="Creative Easel • click"
        accentColor="#f43f5e"
      >
        <group position={[-3.2, 0, 1.1]}>
          <Cylinder
            args={[0.08, 0.08, 2.4]}
            position={[-0.55, 1.2, 0]}
            rotation={[0.12, 0, 0.2]}
            castShadow
          >
            <meshStandardMaterial color="#8b5a2b" />
          </Cylinder>
          <Cylinder
            args={[0.08, 0.08, 2.4]}
            position={[0.55, 1.2, 0]}
            rotation={[0.12, 0, -0.2]}
            castShadow
          >
            <meshStandardMaterial color="#8b5a2b" />
          </Cylinder>
          <Cylinder
            args={[0.08, 0.08, 1.2]}
            position={[0, 0.6, -0.15]}
            castShadow
          >
            <meshStandardMaterial color="#8b5a2b" />
          </Cylinder>
          <Box
            args={[1.8, 1.3, 0.08]}
            position={[0, 1.8, 0.12]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#f8fafc" />
          </Box>
          <Sphere args={[0.14]} position={[-0.45, 1.95, 0.22]} castShadow>
            <meshStandardMaterial color="#ef4444" />
          </Sphere>
          <Sphere args={[0.14]} position={[0, 1.72, 0.22]} castShadow>
            <meshStandardMaterial color="#3b82f6" />
          </Sphere>
          <Sphere args={[0.14]} position={[0.42, 1.9, 0.22]} castShadow>
            <meshStandardMaterial color="#22c55e" />
          </Sphere>
        </group>
      </InteractiveObject>

      <InteractiveObject
        interaction={SCENE_INTERACTIONS.paintDesk}
        hoverText="Paint Desk • click"
        accentColor="#fb7185"
      >
        <group position={[3.1, 0, 2.2]}>
          <Desk position={[0, 0, 0]} color="#fb7185" width={2.8} />
          <Cylinder
            args={[0.42, 0.42, 0.08]}
            position={[-0.65, 1.33, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#f8fafc" />
          </Cylinder>
          <Sphere args={[0.08]} position={[-0.8, 1.39, 0.1]} castShadow>
            <meshStandardMaterial color="#f59e0b" />
          </Sphere>
          <Sphere args={[0.08]} position={[-0.56, 1.39, -0.08]} castShadow>
            <meshStandardMaterial color="#8b5cf6" />
          </Sphere>
          <Sphere args={[0.08]} position={[-0.42, 1.39, 0.06]} castShadow>
            <meshStandardMaterial color="#10b981" />
          </Sphere>
          <Cylinder
            args={[0.03, 0.03, 0.62]}
            position={[0.45, 1.46, 0.05]}
            rotation={[0.2, 0, -0.9]}
            castShadow
          >
            <meshStandardMaterial color="#7c3aed" />
          </Cylinder>
          <Cylinder
            args={[0.03, 0.03, 0.58]}
            position={[0.72, 1.44, -0.05]}
            rotation={[0.15, 0, -0.7]}
            castShadow
          >
            <meshStandardMaterial color="#0f172a" />
          </Cylinder>
        </group>
      </InteractiveObject>

      <group position={[-4.3, 0, -3.3]}>
        <Box
          args={[1.4, 1.8, 0.12]}
          position={[0, 0.9, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#ffffff" />
        </Box>
        <Box
          args={[1.55, 1.95, 0.08]}
          position={[0, 0.9, -0.08]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#7f1d1d" />
        </Box>
      </group>

      <group position={[4.2, 0, -3.4]}>
        <Sphere args={[0.18]} position={[0, 0.18, 0]} castShadow>
          <meshStandardMaterial color="#f97316" />
        </Sphere>
        <Sphere args={[0.18]} position={[0.34, 0.18, 0.08]} castShadow>
          <meshStandardMaterial color="#06b6d4" />
        </Sphere>
        <Sphere args={[0.18]} position={[-0.3, 0.18, -0.12]} castShadow>
          <meshStandardMaterial color="#e11d48" />
        </Sphere>
      </group>

      <FramedMeter
        title="Creativity"
        value={skill.level}
        position={[4.2, 2.4, -5.5]}
        color="#f43f5e"
      />
    </RoomShell>
  );
}
