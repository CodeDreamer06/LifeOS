import { Box, Cylinder, Sphere } from "@react-three/drei";
import {
  Desk,
  FramedMeter,
  InteractiveObject,
} from "../RoomPrimitives";
import { SCENE_INTERACTIONS } from "../constants";
import RoomShell from "../RoomShell";
import type { SkillRoomProps } from "../types";

export default function SocialMediaRoom({ skill }: SkillRoomProps) {
  return (
    <RoomShell
      title={skill.name}
      subtitle={`Level ${skill.level}`}
      icon={skill.icon}
      color={skill.color}
      floorColor="#e0f2fe"
      wallColor="#bae6fd"
      position={[32, 0, 0]}
    >
      <Desk
        position={[-2.8, 0, 2.1]}
        color="#374151"
        width={3.2}
        interaction={SCENE_INTERACTIONS.creatorDesk}
      />
      <group position={[-2.8, 0, 2.1]}>
        <Box
          args={[0.85, 0.65, 0.08]}
          position={[-0.6, 1.55, -0.2]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color="#111827"
            emissive="#1d4ed8"
            emissiveIntensity={0.2}
          />
        </Box>
        <Box
          args={[0.85, 0.65, 0.08]}
          position={[0.35, 1.55, -0.2]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color="#111827"
            emissive="#0ea5e9"
            emissiveIntensity={0.2}
          />
        </Box>
        <Box
          args={[0.45, 0.85, 0.05]}
          position={[1.15, 1.55, 0.15]}
          rotation={[0, -0.2, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color="#111827"
            emissive="#38bdf8"
            emissiveIntensity={0.2}
          />
        </Box>
      </group>

      <InteractiveObject
        interaction={SCENE_INTERACTIONS.ringLight}
        hoverText="Ring Light • click"
        accentColor="#f8fafc"
      >
        <group position={[3.3, 0, 1]}>
          <Cylinder args={[0.05, 0.05, 2.4]} position={[0, 1.2, 0]} castShadow>
            <meshStandardMaterial color="#64748b" />
          </Cylinder>
          <Sphere args={[0.55]} position={[0, 2.45, 0]} castShadow>
            <meshStandardMaterial
              color="#f8fafc"
              emissive="#f8fafc"
              emissiveIntensity={0.2}
            />
          </Sphere>
          <Sphere args={[0.18]} position={[0, 2.45, 0]} castShadow>
            <meshStandardMaterial color="#111827" />
          </Sphere>
        </group>
      </InteractiveObject>

      <group position={[2.1, 0, -2.6]}>
        <Cylinder args={[0.06, 0.06, 1.5]} position={[0, 0.75, 0]} castShadow>
          <meshStandardMaterial color="#94a3b8" />
        </Cylinder>
        <Box
          args={[0.45, 0.8, 0.12]}
          position={[0, 1.72, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#111827" />
        </Box>
      </group>

      <group position={[-4.3, 0, -3.2]}>
        <Box
          args={[1.1, 1.2, 0.35]}
          position={[0, 0.6, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#1e293b" />
        </Box>
        <Sphere args={[0.12]} position={[-0.24, 1.36, 0.12]} castShadow>
          <meshStandardMaterial color="#f97316" />
        </Sphere>
        <Sphere args={[0.12]} position={[0, 1.36, 0.12]} castShadow>
          <meshStandardMaterial color="#22c55e" />
        </Sphere>
        <Sphere args={[0.12]} position={[0.24, 1.36, 0.12]} castShadow>
          <meshStandardMaterial color="#3b82f6" />
        </Sphere>
      </group>

      <FramedMeter
        title="Audience"
        value={skill.level}
        position={[4.2, 2.4, -5.5]}
        color="#0ea5e9"
      />
    </RoomShell>
  );
}
