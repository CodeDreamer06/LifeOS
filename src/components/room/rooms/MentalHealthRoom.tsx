import { Cylinder, Sphere, Sparkles } from "@react-three/drei";
import {
  BookStack,
  Desk,
  FramedMeter,
  InteractiveObject,
  Plant,
} from "../RoomPrimitives";
import { SCENE_INTERACTIONS } from "../constants";
import RoomShell from "../RoomShell";
import type { SkillRoomProps } from "../types";

export default function MentalHealthRoom({ skill }: SkillRoomProps) {
  return (
    <RoomShell
      title={skill.name}
      subtitle={`Level ${skill.level}`}
      icon={skill.icon}
      color={skill.color}
      floorColor="#ede9fe"
      wallColor="#ddd6fe"
      position={[-16, 0, 0]}
    >
      <Cylinder
        args={[2.5, 2.5, 0.05, 32]}
        position={[0, 0.05, 0]}
        receiveShadow
      >
        <meshStandardMaterial color="#c4b5fd" />
      </Cylinder>

      <InteractiveObject
        interaction={SCENE_INTERACTIONS.meditationOrb}
        hoverText="Calm Focus Orb • click"
        accentColor="#8b5cf6"
      >
        <group>
          <Sphere
            args={[0.55]}
            position={[0, 1.05, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial
              color="#8b5cf6"
              emissive="#8b5cf6"
              emissiveIntensity={0.25}
            />
          </Sphere>
          <Sparkles
            count={18}
            scale={3.5}
            size={1.4}
            color="#c4b5fd"
            position={[0, 1.4, 0]}
          />
        </group>
      </InteractiveObject>

      <group position={[3.2, 0, 2.5]}>
        <Cylinder
          args={[0.55, 0.55, 0.18]}
          position={[0, 0.09, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#f9a8d4" />
        </Cylinder>
        <Cylinder
          args={[0.55, 0.55, 0.18]}
          position={[1.1, 0.09, 0.2]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#fbcfe8" />
        </Cylinder>
      </group>

      <Desk
        position={[-3.3, 0, 2.6]}
        color="#7c3aed"
        width={2.3}
        interaction={SCENE_INTERACTIONS.journalDesk}
      />
      <group position={[-3.3, 0, 2.6]}>
        <BookStack
          position={[-0.4, 1.33, 0]}
          count={3}
          interaction={SCENE_INTERACTIONS.journalDesk}
        />
        <Cylinder
          args={[0.08, 0.08, 0.55]}
          position={[0.65, 1.48, 0]}
          castShadow
        >
          <meshStandardMaterial color="#f59e0b" />
        </Cylinder>
        <Sphere args={[0.1]} position={[0.65, 1.82, 0]} castShadow>
          <meshStandardMaterial
            color="#fde68a"
            emissive="#fde68a"
            emissiveIntensity={0.3}
          />
        </Sphere>
      </group>

      <Plant
        position={[4.7, 0, -4]}
        leafColor="#4ade80"
        interaction={SCENE_INTERACTIONS.plant}
      />
      <Plant
        position={[-4.7, 0, -4]}
        leafColor="#22c55e"
        interaction={SCENE_INTERACTIONS.plant}
      />

      <group position={[3.9, 0, -3.3]}>
        <Cylinder args={[0.22, 0.22, 0.32]} position={[0, 0.16, 0]} castShadow>
          <meshStandardMaterial color="#f8fafc" />
        </Cylinder>
        <Sphere args={[0.1]} position={[0, 0.42, 0]} castShadow>
          <meshStandardMaterial color="#fb7185" />
        </Sphere>
      </group>

      <FramedMeter
        title="Inner Balance"
        value={skill.level}
        position={[4.2, 2.4, -5.5]}
        color="#8b5cf6"
      />
    </RoomShell>
  );
}
