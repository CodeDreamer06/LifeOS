import { useMemo, useState } from "react";
import { Box } from "@react-three/drei";
import { Label, Tooltip } from "./RoomPrimitives";
import type { RoomShellProps, Vec3 } from "./types";
import { useGameStore } from "../../store";

export default function RoomShell({
  title,
  subtitle,
  icon,
  color,
  floorColor,
  wallColor,
  position,
  size = [12, 0.1, 12],
  focusTarget,
  children,
}: RoomShellProps) {
  const [hovered, setHovered] = useState(false);
  const focusRoom = useGameStore((s) => s.focusRoom);

  const resolvedFocus = useMemo(() => {
    const defaultTarget: Vec3 = [position[0], 1.6, position[2]];
    const defaultCameraPosition: Vec3 = [
      position[0],
      Math.max(6, size[1] + 6.5),
      position[2] + Math.max(8.5, size[2] * 0.72),
    ];

    return {
      roomId: title,
      target: focusTarget?.target ?? defaultTarget,
      cameraPosition: focusTarget?.cameraPosition ?? defaultCameraPosition,
      zoom: focusTarget?.zoom,
    };
  }, [focusTarget, position, size, title]);

  return (
    <group
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "default";
        setHovered(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        focusRoom(resolvedFocus);
      }}
    >
      <Tooltip text={`${icon} ${title} • ${subtitle}`} visible={hovered} />

      <Box args={size} position={[0, 0.05, 0]} receiveShadow>
        <meshStandardMaterial color={floorColor} />
      </Box>

      <Box
        args={[size[0], 0.18, 0.6]}
        position={[0, 0.12, -size[2] / 2 + 0.2]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={wallColor} />
      </Box>
      <Box
        args={[size[0], 0.18, 0.6]}
        position={[0, 0.12, size[2] / 2 - 0.2]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={wallColor} />
      </Box>
      <Box
        args={[0.6, 0.18, size[2]]}
        position={[-size[0] / 2 + 0.2, 0.12, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={wallColor} />
      </Box>
      <Box
        args={[0.6, 0.18, size[2]]}
        position={[size[0] / 2 - 0.2, 0.12, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={wallColor} />
      </Box>

      <group position={[0, 0, -size[2] / 2 + 1.1]}>
        <Box
          args={[4.2, 2.4, 0.25]}
          position={[0, 1.2, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#f8fafc" />
        </Box>
        <Box
          args={[4.5, 0.25, 0.35]}
          position={[0, 2.45, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.15}
          />
        </Box>
        <Label
          text={`${icon} ${title}`}
          position={[0, 1.45, 0.16]}
          color="#0f172a"
          size={0.3}
        />
        <Label
          text={subtitle}
          position={[0, 0.95, 0.16]}
          color="#475569"
          size={0.18}
        />
      </group>

      {children}
    </group>
  );
}
