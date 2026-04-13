import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Box, Sphere } from "@react-three/drei";
import type { Group } from "three";
import type { HandsProps } from "./types";

export default function Hands({
  visible,
  walking = false,
  intensity = 1,
}: HandsProps) {
  const leftHandRef = useRef<Group>(null);
  const rightHandRef = useRef<Group>(null);

  const base = useMemo(
    () => ({
      left: {
        position: [-0.32, -0.22, -0.58] as [number, number, number],
        rotation: [0.18, 0.22, 0.08] as [number, number, number],
      },
      right: {
        position: [0.32, -0.24, -0.58] as [number, number, number],
        rotation: [0.16, -0.22, -0.08] as [number, number, number],
      },
    }),
    [],
  );

  useFrame((state) => {
    if (!visible) return;

    const t = state.clock.elapsedTime;
    const walkAmp = walking ? 0.045 * intensity : 0.012 * intensity;
    const swayAmp = walking ? 0.09 * intensity : 0.025 * intensity;
    const bobAmp = walking ? 0.035 * intensity : 0.01 * intensity;
    const speed = walking ? 8 : 2.5;

    if (leftHandRef.current) {
      leftHandRef.current.position.x =
        base.left.position[0] + Math.sin(t * speed + Math.PI) * swayAmp;
      leftHandRef.current.position.y =
        base.left.position[1] + Math.abs(Math.sin(t * speed)) * bobAmp;
      leftHandRef.current.position.z =
        base.left.position[2] + Math.cos(t * speed + Math.PI) * walkAmp;

      leftHandRef.current.rotation.x =
        base.left.rotation[0] + Math.sin(t * speed + Math.PI) * 0.12 * intensity;
      leftHandRef.current.rotation.y =
        base.left.rotation[1] + Math.cos(t * 1.5) * 0.04 * intensity;
      leftHandRef.current.rotation.z =
        base.left.rotation[2] + Math.sin(t * speed + Math.PI) * 0.08 * intensity;
    }

    if (rightHandRef.current) {
      rightHandRef.current.position.x =
        base.right.position[0] + Math.sin(t * speed) * swayAmp;
      rightHandRef.current.position.y =
        base.right.position[1] + Math.abs(Math.sin(t * speed + Math.PI)) * bobAmp;
      rightHandRef.current.position.z =
        base.right.position[2] + Math.cos(t * speed) * walkAmp;

      rightHandRef.current.rotation.x =
        base.right.rotation[0] + Math.sin(t * speed) * 0.12 * intensity;
      rightHandRef.current.rotation.y =
        base.right.rotation[1] + Math.cos(t * 1.5 + Math.PI) * 0.04 * intensity;
      rightHandRef.current.rotation.z =
        base.right.rotation[2] - Math.sin(t * speed) * 0.08 * intensity;
    }
  });

  if (!visible) return null;

  return (
    <group>
      <group ref={leftHandRef} position={base.left.position} rotation={base.left.rotation}>
        <HandMesh side="left" />
      </group>
      <group
        ref={rightHandRef}
        position={base.right.position}
        rotation={base.right.rotation}
      >
        <HandMesh side="right" />
      </group>
    </group>
  );
}

function HandMesh({ side }: { side: "left" | "right" }) {
  const thumbOffset = side === "left" ? -0.16 : 0.16;
  const thumbRotation = side === "left" ? 0.35 : -0.35;

  return (
    <group scale={0.9}>
      <Box args={[0.22, 0.16, 0.14]} castShadow receiveShadow>
        <meshStandardMaterial color="#f1c7a3" roughness={0.75} metalness={0.02} />
      </Box>

      {[-0.075, -0.025, 0.025, 0.075].map((x, index) => (
        <group key={index} position={[x, 0.12, -0.01]} rotation={[-0.18, 0, 0]}>
          <Box
            args={[0.03, 0.13 + index * 0.005, 0.03]}
            position={[0, 0.06, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial
              color={index === 0 ? "#efbb96" : "#f1c7a3"}
              roughness={0.78}
              metalness={0.02}
            />
          </Box>
          <Sphere args={[0.018]} position={[0, 0.13, 0]} castShadow receiveShadow>
            <meshStandardMaterial color="#f3cfad" roughness={0.8} metalness={0.01} />
          </Sphere>
        </group>
      ))}

      <group position={[thumbOffset, 0.02, 0.01]} rotation={[0.1, 0, thumbRotation]}>
        <Box args={[0.035, 0.11, 0.035]} position={[0, 0.045, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#efbb96" roughness={0.78} metalness={0.02} />
        </Box>
        <Sphere args={[0.02]} position={[0, 0.1, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#f3cfad" roughness={0.8} metalness={0.01} />
        </Sphere>
      </group>

      <Box
        args={[0.18, 0.08, 0.12]}
        position={[0, -0.12, 0.02]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#d6a584" roughness={0.82} metalness={0.01} />
      </Box>
    </group>
  );
}
