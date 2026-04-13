import { Box, Cylinder, Sphere } from "@react-three/drei";
import {
  Desk,
  FramedMeter,
  InteractiveObject,
} from "../RoomPrimitives";
import { SCENE_INTERACTIONS } from "../constants";
import RoomShell from "../RoomShell";
import type { SkillRoomProps } from "../types";

export default function SelfCareRoom({ skill }: SkillRoomProps) {
  return (
    <RoomShell
      title={skill.name}
      subtitle={`Level ${skill.level}`}
      icon={skill.icon}
      color={skill.color}
      floorColor="#fce7f3"
      wallColor="#fbcfe8"
      position={[0, 0, 0]}
    >
      <InteractiveObject
        interaction={SCENE_INTERACTIONS.vanity}
        hoverText="Self-Care Vanity • click"
        accentColor="#ec4899"
      >
        <group position={[-3.2, 0, 1.8]}>
          <Desk position={[0, 0, 0]} color="#f9a8d4" width={2.6} />
          <Box
            args={[1.6, 1.4, 0.08]}
            position={[0, 2.2, -0.38]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial
              color="#fdf2f8"
              emissive="#fdf2f8"
              emissiveIntensity={0.08}
            />
          </Box>
          <Sphere args={[0.14]} position={[-0.45, 1.38, 0.1]} castShadow>
            <meshStandardMaterial color="#f43f5e" />
          </Sphere>
          <Cylinder
            args={[0.08, 0.08, 0.26]}
            position={[0.05, 1.41, 0.12]}
            castShadow
          >
            <meshStandardMaterial color="#f59e0b" />
          </Cylinder>
          <Cylinder
            args={[0.09, 0.09, 0.32]}
            position={[0.48, 1.44, 0.08]}
            castShadow
          >
            <meshStandardMaterial color="#8b5cf6" />
          </Cylinder>
        </group>
      </InteractiveObject>

      <InteractiveObject
        interaction={SCENE_INTERACTIONS.bathPod}
        hoverText="Recharge Pod • click"
        accentColor="#f472b6"
      >
        <group position={[3.4, 0, -0.6]}>
          <Cylinder
            args={[1.1, 1.35, 0.55, 32]}
            position={[0, 0.28, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#fbcfe8" />
          </Cylinder>
          <Sphere args={[0.72]} position={[0, 1.05, 0]} castShadow>
            <meshStandardMaterial
              color="#f9a8d4"
              emissive="#f9a8d4"
              emissiveIntensity={0.12}
            />
          </Sphere>
          <Sphere args={[0.16]} position={[-0.28, 1.12, 0.46]} castShadow>
            <meshStandardMaterial color="#fef3c7" />
          </Sphere>
          <Sphere args={[0.16]} position={[0.26, 1.18, -0.42]} castShadow>
            <meshStandardMaterial color="#ddd6fe" />
          </Sphere>
        </group>
      </InteractiveObject>

      <group position={[-4.4, 0, -3.4]}>
        <Cylinder args={[0.22, 0.22, 0.38]} position={[0, 0.19, 0]} castShadow>
          <meshStandardMaterial color="#ffffff" />
        </Cylinder>
        <Sphere args={[0.11]} position={[0, 0.48, 0]} castShadow>
          <meshStandardMaterial color="#f472b6" />
        </Sphere>
      </group>

      <group position={[-3.7, 0, -3]}>
        <Cylinder args={[0.14, 0.14, 0.52]} position={[0, 0.26, 0]} castShadow>
          <meshStandardMaterial color="#f9a8d4" />
        </Cylinder>
      </group>

      <group position={[4.4, 0, 3.5]}>
        <Sphere args={[0.22]} position={[0, 0.22, 0]} castShadow>
          <meshStandardMaterial color="#fda4af" />
        </Sphere>
        <Sphere args={[0.18]} position={[0.34, 0.18, 0.08]} castShadow>
          <meshStandardMaterial color="#fbcfe8" />
        </Sphere>
        <Sphere args={[0.18]} position={[-0.28, 0.18, -0.14]} castShadow>
          <meshStandardMaterial color="#ddd6fe" />
        </Sphere>
      </group>

      <FramedMeter
        title="Recharge"
        value={skill.level}
        position={[4.2, 2.4, -5.5]}
        color="#ec4899"
      />
    </RoomShell>
  );
}
