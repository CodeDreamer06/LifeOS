import { Box, Sphere } from "@react-three/drei";
import {
  Ball,
  Cone,
  Dumbbell,
  FramedMeter,
} from "../RoomPrimitives";
import { SCENE_INTERACTIONS } from "../constants";
import RoomShell from "../RoomShell";
import type { SkillRoomProps } from "../types";

export default function SportsGamesRoom({ skill }: SkillRoomProps) {
  return (
    <RoomShell
      title={skill.name}
      subtitle={`Level ${skill.level}`}
      icon={skill.icon}
      color={skill.color}
      floorColor="#fde68a"
      wallColor="#fef3c7"
      position={[-16, 0, -14]}
    >
      <Ball
        position={[-3.8, 0.3, 1.8]}
        color="#f97316"
        interaction={SCENE_INTERACTIONS.sportsBall}
      />
      <Ball
        position={[-3.1, 0.3, 1.1]}
        color="#22c55e"
        interaction={SCENE_INTERACTIONS.sportsBall}
      />
      <Ball
        position={[-2.3, 0.3, 1.8]}
        color="#3b82f6"
        interaction={SCENE_INTERACTIONS.sportsBall}
      />

      <Cone position={[2.2, 0, 2.2]} interaction={SCENE_INTERACTIONS.cone} />
      <Cone position={[3.3, 0, 1.4]} interaction={SCENE_INTERACTIONS.cone} />
      <Cone position={[4.3, 0, 2.5]} interaction={SCENE_INTERACTIONS.cone} />

      <group position={[3.8, 0, -2.8]}>
        <Box
          args={[2.8, 0.15, 0.8]}
          position={[0, 1.25, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#475569" />
        </Box>
        <Box
          args={[0.16, 1.3, 0.16]}
          position={[-1.1, 0.65, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#64748b" />
        </Box>
        <Box
          args={[0.16, 1.3, 0.16]}
          position={[1.1, 0.65, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#64748b" />
        </Box>
        <Box
          args={[0.22, 0.85, 0.22]}
          position={[0, 0.42, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#ca8a04" />
        </Box>
        <Sphere args={[0.32]} position={[0, 1.78, 0]} castShadow receiveShadow>
          <meshStandardMaterial
            color="#fde047"
            emissive="#fde047"
            emissiveIntensity={0.2}
          />
        </Sphere>
      </group>

      <group position={[-4.3, 0, -2.5]}>
        <Box
          args={[1.7, 2.6, 0.9]}
          position={[0, 1.3, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#111827" />
        </Box>
        <Box
          args={[1.3, 1.6, 0.12]}
          position={[0, 1.55, 0.48]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color="#0ea5e9"
            emissive="#0ea5e9"
            emissiveIntensity={0.22}
          />
        </Box>
        <Box
          args={[0.9, 0.2, 0.2]}
          position={[0, 0.45, 0.5]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#7c3aed" />
        </Box>
      </group>

      <group position={[0.5, 0, 3.8]}>
        <Dumbbell
          position={[-0.8, 0.28, 0]}
          scale={0.75}
          interaction={SCENE_INTERACTIONS.dumbbell}
        />
        <Dumbbell
          position={[0, 0.28, 0]}
          scale={0.85}
          interaction={SCENE_INTERACTIONS.dumbbell}
        />
        <Dumbbell
          position={[0.95, 0.28, 0]}
          scale={0.95}
          interaction={SCENE_INTERACTIONS.dumbbell}
        />
      </group>

      <FramedMeter
        title="Athletic Energy"
        value={skill.level}
        position={[4.2, 2.4, -5.5]}
        color="#f97316"
      />
    </RoomShell>
  );
}
