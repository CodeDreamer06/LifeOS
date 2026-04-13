import { Box, Cylinder } from "@react-three/drei";
import {
  BookStack,
  Desk,
  FramedMeter,
  InteractiveObject,
} from "../RoomPrimitives";
import { SCENE_INTERACTIONS } from "../constants";
import RoomShell from "../RoomShell";
import type { SkillRoomProps } from "../types";

export default function AcademicsRoom({ skill }: SkillRoomProps) {
  return (
    <RoomShell
      title={skill.name}
      subtitle={`Level ${skill.level}`}
      icon={skill.icon}
      color={skill.color}
      floorColor="#dbeafe"
      wallColor="#bfdbfe"
      position={[-16, 0, 14]}
    >
      <InteractiveObject
        interaction={SCENE_INTERACTIONS.chalkboard}
        hoverText="Study Board • click"
        accentColor="#3b82f6"
      >
        <group position={[-3.1, 0, 1.2]}>
          <Box
            args={[3, 1.8, 0.12]}
            position={[0, 1.8, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#166534" />
          </Box>
          <Box
            args={[3.25, 2.05, 0.08]}
            position={[0, 1.8, -0.08]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#8b5a2b" />
          </Box>
          <Box
            args={[0.9, 0.06, 0.04]}
            position={[-0.75, 2.1, 0.1]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#f8fafc" />
          </Box>
          <Box
            args={[0.6, 0.06, 0.04]}
            position={[0.45, 1.6, 0.1]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#e5e7eb" />
          </Box>
        </group>
      </InteractiveObject>

      <InteractiveObject
        interaction={SCENE_INTERACTIONS.academicDesk}
        hoverText="Research Desk • click"
        accentColor="#60a5fa"
      >
        <group position={[3.1, 0, 2.2]}>
          <Desk position={[0, 0, 0]} color="#3b82f6" width={3} />
          <BookStack
            position={[-0.65, 1.33, 0]}
            count={4}
            interaction={SCENE_INTERACTIONS.academicDesk}
          />
          <Cylinder
            args={[0.08, 0.08, 0.55]}
            position={[0.55, 1.48, 0.02]}
            castShadow
          >
            <meshStandardMaterial color="#f59e0b" />
          </Cylinder>
          <Box
            args={[0.7, 0.5, 0.06]}
            position={[0.15, 1.48, -0.18]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial
              color="#111827"
              emissive="#2563eb"
              emissiveIntensity={0.18}
            />
          </Box>
        </group>
      </InteractiveObject>

      <group position={[-4.4, 0, -3.2]}>
        <Box
          args={[1.2, 1.8, 0.5]}
          position={[0, 0.9, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#1e3a8a" />
        </Box>
        <Box
          args={[0.95, 0.12, 0.12]}
          position={[0, 1.55, 0.32]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#93c5fd" />
        </Box>
      </group>

      <group position={[4.2, 0, -3.4]}>
        <Box
          args={[0.7, 0.12, 0.5]}
          position={[0, 0.06, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#ef4444" />
        </Box>
        <Box
          args={[0.7, 0.12, 0.5]}
          position={[0.14, 0.18, -0.08]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#22c55e" />
        </Box>
        <Box
          args={[0.7, 0.12, 0.5]}
          position={[-0.12, 0.3, 0.1]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#8b5cf6" />
        </Box>
      </group>

      <FramedMeter
        title="Study Power"
        value={skill.level}
        position={[4.2, 2.4, -5.5]}
        color="#3b82f6"
      />
    </RoomShell>
  );
}
