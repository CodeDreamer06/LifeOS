import { Box, Cylinder, Sphere } from "@react-three/drei";
import {
  FramedMeter,
  InteractiveObject,
} from "../RoomPrimitives";
import { SCENE_INTERACTIONS } from "../constants";
import RoomShell from "../RoomShell";
import type { SkillRoomProps } from "../types";

export default function DietRoom({ skill }: SkillRoomProps) {
  return (
    <RoomShell
      title={skill.name}
      subtitle={`Level ${skill.level}`}
      icon={skill.icon}
      color={skill.color}
      floorColor="#fef9c3"
      wallColor="#ecfccb"
      position={[16, 0, -14]}
    >
      <InteractiveObject
        interaction={SCENE_INTERACTIONS.kitchenCounter}
        hoverText="Nutrition Counter • click"
        accentColor="#84cc16"
      >
        <group position={[-3.8, 0, 0]}>
          <Box
            args={[2.2, 1.5, 5.8]}
            position={[0, 0.75, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#f8fafc" />
          </Box>
          <Box
            args={[2.35, 0.1, 6]}
            position={[0, 1.55, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#374151" />
          </Box>
        </group>
      </InteractiveObject>

      <Box
        args={[1.8, 4.2, 1.8]}
        position={[-3.8, 2.1, -3.8]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#e5e7eb" />
      </Box>

      <InteractiveObject
        interaction={SCENE_INTERACTIONS.fruitBowl}
        hoverText="Healthy Defaults • click"
        accentColor="#f59e0b"
      >
        <group position={[3.2, 1.6, 1.3]}>
          <Cylinder args={[0.55, 0.55, 0.12]} castShadow receiveShadow>
            <meshStandardMaterial color="#d6a36a" />
          </Cylinder>
          <Sphere args={[0.18]} position={[-0.18, 0.16, 0]} castShadow>
            <meshStandardMaterial color="#ef4444" />
          </Sphere>
          <Sphere args={[0.18]} position={[0.05, 0.16, 0.12]} castShadow>
            <meshStandardMaterial color="#f59e0b" />
          </Sphere>
          <Sphere args={[0.18]} position={[0.2, 0.16, -0.08]} castShadow>
            <meshStandardMaterial color="#22c55e" />
          </Sphere>
        </group>
      </InteractiveObject>

      <group position={[2.8, 1.7, 1]}>
        <Cylinder args={[0.22, 0.22, 0.52]} castShadow>
          <meshStandardMaterial color="#ef4444" />
        </Cylinder>
        <Sphere args={[0.22]} position={[0, 0.42, 0]} castShadow>
          <meshStandardMaterial color="#f59e0b" />
        </Sphere>
      </group>

      <group position={[3.6, 1.7, 1.3]}>
        <Sphere args={[0.24]} castShadow>
          <meshStandardMaterial color="#22c55e" />
        </Sphere>
        <Sphere args={[0.16]} position={[0.16, 0.18, 0]} castShadow>
          <meshStandardMaterial color="#16a34a" />
        </Sphere>
      </group>

      <group position={[2.6, 1.7, 2]}>
        <Sphere args={[0.18]} castShadow>
          <meshStandardMaterial color="#f43f5e" />
        </Sphere>
        <Cylinder args={[0.02, 0.02, 0.18]} position={[0, 0.18, 0]} castShadow>
          <meshStandardMaterial color="#15803d" />
        </Cylinder>
      </group>

      <group position={[2.8, 0, -2.5]}>
        <Box
          args={[2.4, 1.1, 1.1]}
          position={[0, 0.55, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#0f172a" />
        </Box>
        <Cylinder
          args={[0.28, 0.28, 0.55]}
          position={[-0.55, 1.25, 0]}
          castShadow
        >
          <meshStandardMaterial color="#14b8a6" />
        </Cylinder>
        <Cylinder
          args={[0.28, 0.28, 0.55]}
          position={[0.15, 1.25, 0]}
          castShadow
        >
          <meshStandardMaterial color="#84cc16" />
        </Cylinder>
        <Cylinder
          args={[0.28, 0.28, 0.55]}
          position={[0.85, 1.25, 0]}
          castShadow
        >
          <meshStandardMaterial color="#f97316" />
        </Cylinder>
      </group>

      <FramedMeter
        title="Healthy Habits"
        value={skill.level}
        position={[4.2, 2.4, -5.5]}
        color="#84cc16"
      />
    </RoomShell>
  );
}
