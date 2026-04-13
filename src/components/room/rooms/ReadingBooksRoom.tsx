import { Box, Sphere } from "@react-three/drei";
import {
  BookStack,
  FramedMeter,
  InteractiveObject,
  Shelf,
} from "../RoomPrimitives";
import { SCENE_INTERACTIONS } from "../constants";
import RoomShell from "../RoomShell";
import type { SkillRoomProps } from "../types";

export default function ReadingBooksRoom({ skill }: SkillRoomProps) {
  return (
    <RoomShell
      title={skill.name}
      subtitle={`Level ${skill.level}`}
      icon={skill.icon}
      color={skill.color}
      floorColor="#ede9fe"
      wallColor="#c7d2fe"
      position={[-32, 0, 0]}
    >
      <InteractiveObject
        interaction={SCENE_INTERACTIONS.bookshelf}
        hoverText="Knowledge Archive • click"
        accentColor="#6366f1"
      >
        <group position={[-3.4, 0, 1.2]}>
          <Shelf position={[0, 0, 0]} rows={4} color="#7c4a2d" width={2.8} />
          <BookStack position={[0, 1.08, 0.3]} count={4} />
          <BookStack position={[-0.25, 2.08, 0.3]} count={3} />
          <BookStack position={[0.2, 3.08, 0.3]} count={4} />
        </group>
      </InteractiveObject>

      <InteractiveObject
        interaction={SCENE_INTERACTIONS.readingChair}
        hoverText="Reading Nook • click"
        accentColor="#8b5cf6"
      >
        <group position={[3.2, 0, 2]}>
          <Box
            args={[1.3, 0.4, 1.3]}
            position={[0, 0.4, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#7c3aed" />
          </Box>
          <Box
            args={[1.1, 1.2, 0.35]}
            position={[0, 1.15, -0.42]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#8b5cf6" />
          </Box>
          <Box
            args={[0.22, 0.7, 1.1]}
            position={[-0.54, 0.7, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#6d28d9" />
          </Box>
          <Box
            args={[0.22, 0.7, 1.1]}
            position={[0.54, 0.7, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#6d28d9" />
          </Box>
          <Box
            args={[0.55, 0.08, 0.8]}
            position={[0.95, 0.62, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#8b5a2b" />
          </Box>
          <BookStack
            position={[0.95, 0.72, 0]}
            count={2}
            interaction={SCENE_INTERACTIONS.readingChair}
          />
        </group>
      </InteractiveObject>

      <group position={[-4.4, 0, -3.2]}>
        <BookStack position={[0, 0, 0]} count={5} />
      </group>

      <group position={[4.2, 0, -3.3]}>
        <Sphere args={[0.18]} position={[0, 0.18, 0]} castShadow>
          <meshStandardMaterial color="#f59e0b" />
        </Sphere>
        <Sphere args={[0.18]} position={[0.34, 0.18, 0.08]} castShadow>
          <meshStandardMaterial color="#22c55e" />
        </Sphere>
        <Sphere args={[0.18]} position={[-0.3, 0.18, -0.1]} castShadow>
          <meshStandardMaterial color="#3b82f6" />
        </Sphere>
      </group>

      <FramedMeter
        title="Reading Flow"
        value={skill.level}
        position={[4.2, 2.4, -5.5]}
        color="#6366f1"
      />
    </RoomShell>
  );
}
