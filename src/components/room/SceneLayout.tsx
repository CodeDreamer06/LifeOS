import { Float, Sparkles, Box, Cylinder, Sphere, Torus } from "@react-three/drei";
import { Plant, Label, SkillPedestal } from "./RoomPrimitives";
import {
  HALLWAY_PLANT_POSITIONS,
  HUB_PEDESTAL_LIMIT,
  SCENE_INTERACTIONS,
} from "./constants";
import type { CentralHubProps } from "./types";

export function Hallways() {
  return (
    <group>
      <Box args={[80, 0.08, 8]} position={[0, 0.04, 0]} receiveShadow>
        <meshStandardMaterial color="#f8fafc" />
      </Box>
      <Box args={[8, 0.08, 42]} position={[0, 0.04, 7]} receiveShadow>
        <meshStandardMaterial color="#f8fafc" />
      </Box>
      <Box args={[72, 0.08, 8]} position={[0, 0.04, 14]} receiveShadow>
        <meshStandardMaterial color="#f1f5f9" />
      </Box>
      <Box args={[56, 0.08, 8]} position={[0, 0.04, -14]} receiveShadow>
        <meshStandardMaterial color="#f1f5f9" />
      </Box>

      {[
        [0, 0.045, 0],
        [0, 0.045, 14],
        [0, 0.045, -14],
      ].map((pos, i) => (
        <Box
          key={i}
          args={[4.8, 0.01, 40]}
          position={pos as [number, number, number]}
          receiveShadow
        >
          <meshStandardMaterial color="#ffffff" opacity={0.28} transparent />
        </Box>
      ))}
    </group>
  );
}

export function AmbientDecor() {
  return (
    <group>
      {HALLWAY_PLANT_POSITIONS.map((pos, i) => (
        <Plant
          key={i}
          position={pos}
          scale={1.1}
          leafColor={i % 2 === 0 ? "#22c55e" : "#10b981"}
          interaction={SCENE_INTERACTIONS.plant}
        />
      ))}

      {[-30, -14, 0, 14, 30].map((x, i) => (
        <group key={i} position={[x, 0, 22]}>
          <Cylinder args={[0.18, 0.18, 3.4]} position={[0, 1.7, 0]} castShadow>
            <meshStandardMaterial color="#94a3b8" />
          </Cylinder>
          <Sphere args={[0.38]} position={[0, 3.7, 0]} castShadow>
            <meshStandardMaterial
              color="#fff7ed"
              emissive="#fff7ed"
              emissiveIntensity={0.28}
            />
          </Sphere>
        </group>
      ))}

      {[
        [-36, 0, 7],
        [36, 0, 7],
        [-20, 0, 21],
        [20, 0, 21],
      ].map((pos, i) => (
        <DecorBench key={i} position={pos as [number, number, number]} />
      ))}
    </group>
  );
}

export function CentralHub({ skills }: CentralHubProps) {
  const displayed = skills.slice(0, HUB_PEDESTAL_LIMIT);

  return (
    <group position={[0, 0, 30]}>
      <Cylinder args={[7, 7, 0.12, 40]} position={[0, 0.06, 0]} receiveShadow>
        <meshStandardMaterial color="#e0f2fe" />
      </Cylinder>

      <Cylinder
        args={[2.1, 2.5, 0.6, 24]}
        position={[0, 0.3, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#cbd5e1" />
      </Cylinder>

      <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.22}>
        <Torus
          args={[1.25, 0.14, 16, 48]}
          position={[0, 1.65, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          castShadow
        >
          <meshStandardMaterial
            color="#60a5fa"
            emissive="#60a5fa"
            emissiveIntensity={0.2}
          />
        </Torus>
        <Sparkles count={10} scale={2.6} size={1.4} color="#93c5fd" />
      </Float>

      <Label
        text="Skill Campus Hub"
        position={[0, 2.55, 0]}
        color="#0f172a"
        size={0.34}
      />

      <Label
        text="Click a pedestal to inspect that life area"
        position={[0, 2.05, 0]}
        color="#475569"
        size={0.16}
      />

      {displayed.map((skill, i) => {
        const angle = (i / Math.max(displayed.length, 1)) * Math.PI * 2;
        const x = Math.cos(angle) * 4.6;
        const z = Math.sin(angle) * 4.6;
        return (
          <SkillPedestal key={skill.id} skill={skill} position={[x, 0, z]} />
        );
      })}

      <Plant
        position={[-5.8, 0, -5.8]}
        interaction={SCENE_INTERACTIONS.plant}
      />
      <Plant
        position={[5.8, 0, -5.8]}
        interaction={SCENE_INTERACTIONS.plant}
      />
      <Plant
        position={[-5.8, 0, 5.8]}
        interaction={SCENE_INTERACTIONS.plant}
      />
      <Plant
        position={[5.8, 0, 5.8]}
        interaction={SCENE_INTERACTIONS.plant}
      />

      <HubSeating />
    </group>
  );
}

function DecorBench({
  position,
}: {
  position: [number, number, number];
}) {
  return (
    <group position={position}>
      <Box
        args={[2.6, 0.16, 0.7]}
        position={[0, 0.58, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#8b5a2b" />
      </Box>
      <Box
        args={[2.6, 0.12, 0.14]}
        position={[0, 1.02, -0.24]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#7c4a2d" />
      </Box>
      {[
        [-1.05, 0.28, -0.2],
        [1.05, 0.28, -0.2],
        [-1.05, 0.28, 0.2],
        [1.05, 0.28, 0.2],
      ].map((leg, i) => (
        <Box
          key={i}
          args={[0.12, 0.56, 0.12]}
          position={leg as [number, number, number]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#5c4033" />
        </Box>
      ))}
    </group>
  );
}

function HubSeating() {
  return (
    <group>
      {[
        [-2.4, 0, 0],
        [2.4, 0, 0],
        [0, 0, -2.4],
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <Cylinder
            args={[0.45, 0.52, 0.34, 20]}
            position={[0, 0.18, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#cbd5e1" />
          </Cylinder>
          <Cylinder
            args={[0.34, 0.34, 0.08, 20]}
            position={[0, 0.39, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#f8fafc" />
          </Cylinder>
        </group>
      ))}
    </group>
  );
}
