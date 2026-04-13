import type { ReactNode } from "react";

export type Vec3 = [number, number, number];

export type CameraMode = "overview" | "firstPerson";

export interface RoomFocusTarget {
  roomId: string;
  target: Vec3;
  cameraPosition: Vec3;
  zoom?: number;
}

export interface ObjectCardAnchor {
  position: Vec3;
  distanceFactor?: number;
}

export interface SkillDescriptor {
  id: string;
  name: string;
  icon: string;
  category: string;
  color: string;
  level: number;
  exp?: number;
  maxExp?: number;
}

export interface RoomTheme {
  color: string;
  floorColor: string;
  wallColor: string;
}

export interface RoomShellProps {
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  floorColor: string;
  wallColor: string;
  position: Vec3;
  size?: Vec3;
  focusTarget?: Omit<RoomFocusTarget, "roomId">;
  children: ReactNode;
}

export interface SceneInteraction {
  id: string;
  title: string;
  description: string;
  category?: string;
  skillId?: string;
  anchor?: ObjectCardAnchor;
}

export interface InteractiveObjectConfig extends SceneInteraction {
  position?: Vec3;
  accentColor?: string;
  tooltip?: string;
}

export interface InteractiveObjectProps {
  interaction: SceneInteraction;
  children: ReactNode;
  hoverText?: string;
  accentColor?: string;
  scaleOnHover?: number;
}

export interface LabelProps {
  text: string;
  position: Vec3;
  color?: string;
  size?: number;
}

export interface TooltipProps {
  text: string;
  visible: boolean;
  position?: Vec3;
}

export interface PlantProps {
  position: Vec3;
  scale?: number;
  leafColor?: string;
  interaction?: SceneInteraction;
}

export interface DeskProps {
  position: Vec3;
  color?: string;
  width?: number;
  interaction?: SceneInteraction;
}

export interface ShelfProps {
  position: Vec3;
  rows?: number;
  color?: string;
  width?: number;
  interaction?: SceneInteraction;
}

export interface BookStackProps {
  position: Vec3;
  count?: number;
  interaction?: SceneInteraction;
}

export interface DumbbellProps {
  position: Vec3;
  scale?: number;
  interaction?: SceneInteraction;
}

export interface BallProps {
  position: Vec3;
  color?: string;
  scale?: number;
  interaction?: SceneInteraction;
}

export interface ConeProps {
  position: Vec3;
  color?: string;
  interaction?: SceneInteraction;
}

export interface FramedMeterProps {
  title: string;
  value: number;
  max?: number;
  position: Vec3;
  color?: string;
}

export interface PotionsProps {
  count: number;
  interaction?: SceneInteraction;
}

export interface SkillPedestalProps {
  skill: SkillDescriptor;
  position: Vec3;
}

export interface BedroomCoreProps {
  level: number;
  potions: number;
}

export interface SkillRoomProps {
  skill: SkillDescriptor;
}

export interface CentralHubProps {
  skills: SkillDescriptor[];
}

export interface FirstPersonControllerProps {
  enabled: boolean;
  movementSpeed?: number;
  sprintMultiplier?: number;
  mouseSensitivity?: number;
  height?: number;
  bounds?: {
    minX: number;
    maxX: number;
    minZ: number;
    maxZ: number;
  };
}

export interface HandsProps {
  visible: boolean;
  walking?: boolean;
  intensity?: number;
}

export interface RoomConfig {
  id: string;
  skillName?: string;
  title: string;
  subtitle?: string;
  icon: string;
  position: Vec3;
  theme: RoomTheme;
  meterTitle?: string;
  focusTarget?: Omit<RoomFocusTarget, "roomId">;
}
