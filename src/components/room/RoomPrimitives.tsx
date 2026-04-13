import { useMemo, useState } from "react";
import {
  Html,
  Float,
  Sparkles,
  Text,
  Box,
  Cylinder,
  Sphere,
  Torus,
} from "@react-three/drei";
import { motion } from "framer-motion";
import type {
  BallProps,
  BookStackProps,
  ConeProps,
  DeskProps,
  DumbbellProps,
  FramedMeterProps,
  InteractiveObjectProps,
  LabelProps,
  PlantProps,
  PotionsProps,
  SceneInteraction,
  ShelfProps,
  SkillPedestalProps,
  TooltipProps,
} from "./types";
import { useGameStore } from "../../store";

export function Tooltip({
  text,
  visible,
  position = [0, 2.4, 0],
}: TooltipProps) {
  if (!visible) return null;

  return (
    <Html position={position} center distanceFactor={12}>
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl shadow-xl text-xs font-bold text-slate-700 whitespace-nowrap border border-purple-200 pointer-events-none"
      >
        {text}
      </motion.div>
    </Html>
  );
}

export function Label({
  text,
  position,
  color = "#1f2937",
  size = 0.32,
}: LabelProps) {
  return (
    <Text
      position={position}
      fontSize={size}
      color={color}
      anchorX="center"
      anchorY="middle"
      maxWidth={6}
    >
      {text}
    </Text>
  );
}

function ObjectInteractionCard({
  interaction,
  accentColor,
  onClose,
}: {
  interaction: SceneInteraction;
  accentColor: string;
  onClose: () => void;
}) {
  const skill = useGameStore((state) =>
    interaction.skillId
      ? state.skills.find((entry) => entry.id === interaction.skillId)
      : undefined,
  );

  const xpRemaining =
    skill && typeof skill.maxExp === "number" && typeof skill.exp === "number"
      ? Math.max(skill.maxExp - skill.exp, 0)
      : null;

  const progressPercentage =
    skill && skill.maxExp > 0
      ? Math.min(100, Math.max(0, (skill.exp / skill.maxExp) * 100))
      : 0;

  return (
    <Html
      position={interaction.anchor?.position ?? [0, 2.2, 0]}
      center
      distanceFactor={interaction.anchor?.distanceFactor ?? 10}
      transform
      occlude
      zIndexRange={[120, 0]}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 12, rotateX: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="pointer-events-auto w-72 rounded-2xl border border-white/20 bg-slate-950/85 p-4 text-slate-50 shadow-2xl backdrop-blur-md"
        style={{
          transformStyle: "preserve-3d",
          boxShadow: `0 18px 45px ${accentColor}35`,
        }}
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-sky-300">
              Object Interaction
            </p>
            <h3 className="text-lg font-semibold leading-tight">
              {interaction.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="rounded-full border border-white/20 px-2 py-1 text-xs text-slate-200 transition hover:bg-white/10"
          >
            Close
          </button>
        </div>

        <p className="text-sm leading-6 text-slate-200">
          {interaction.description}
        </p>

        {interaction.category && (
          <div className="mt-3 inline-flex rounded-full bg-sky-400/15 px-3 py-1 text-xs font-medium text-sky-200">
            {interaction.category}
          </div>
        )}

        {skill && (
          <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-200">
              <span>
                {skill.icon} Level {skill.level}
              </span>
              <span>
                {skill.exp}/{skill.maxExp} XP
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progressPercentage}%`,
                  background: accentColor,
                }}
              />
            </div>
            <p className="mt-2 text-xs text-slate-300">
              {xpRemaining === 0
                ? "Ready to level up."
                : `${xpRemaining} XP needed for the next level`}
            </p>
          </div>
        )}
      </motion.div>
    </Html>
  );
}

export function InteractiveObject({
  interaction,
  children,
  hoverText,
  accentColor = "#a78bfa",
  scaleOnHover = 1.03,
}: InteractiveObjectProps) {
  const selectInteraction = useGameStore((state) => state.selectInteraction);
  const clearInteraction = useGameStore((state) => state.clearInteraction);
  const selectedInteraction = useGameStore(
    (state) => state.selectedInteraction,
  );
  const [hovered, setHovered] = useState(false);

  const isSelected = selectedInteraction?.id === interaction.id;
  const scale = hovered || isSelected ? scaleOnHover : 1;

  return (
    <group
      scale={scale}
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
        selectInteraction(interaction);
      }}
    >
      <Tooltip
        text={hoverText ?? interaction.title}
        visible={hovered && !isSelected}
        position={[0, 2.1, 0]}
      />
      {(hovered || isSelected) && (
        <Sparkles count={8} scale={1.25} size={1.4} color={accentColor} />
      )}
      {isSelected && (
        <ObjectInteractionCard
          interaction={interaction}
          accentColor={accentColor}
          onClose={clearInteraction}
        />
      )}
      {children}
    </group>
  );
}

export function Potions({ count, interaction }: PotionsProps) {
  if (count <= 0) return null;

  const content = (
    <group position={[0, 0, 0]}>
      {Array.from({ length: Math.min(count, 6) }).map((_, i) => (
        <Float
          key={i}
          speed={1.8}
          rotationIntensity={0.3}
          floatIntensity={0.35}
          position={[i * 0.35 - 0.9, 0, 0]}
        >
          <Cylinder
            args={[0.05, 0.07, 0.16]}
            position={[0, 0.08, 0]}
            castShadow
          >
            <meshPhysicalMaterial
              color="#ff69b4"
              emissive="#ff1493"
              emissiveIntensity={0.4}
              transmission={0.8}
              roughness={0.15}
            />
          </Cylinder>
          <Sphere args={[0.1]} castShadow>
            <meshPhysicalMaterial
              color="#ff69b4"
              emissive="#ff1493"
              emissiveIntensity={0.5}
              transmission={0.8}
              roughness={0.15}
            />
          </Sphere>
          <Cylinder args={[0.02, 0.02, 0.05]} position={[0, 0.18, 0]}>
            <meshStandardMaterial color="#8b5a2b" />
          </Cylinder>
          <Sparkles count={4} scale={0.25} size={0.6} color="#ffd1ea" />
        </Float>
      ))}
    </group>
  );

  if (!interaction) return content;

  return (
    <InteractiveObject
      interaction={interaction}
      hoverText={`${interaction.title} • ${count} available`}
      accentColor="#ff8cc6"
    >
      {content}
    </InteractiveObject>
  );
}

export function Plant({
  position,
  scale = 1,
  leafColor = "#22c55e",
  interaction,
}: PlantProps) {
  const content = (
    <group position={position} scale={scale}>
      <Cylinder
        args={[0.24, 0.18, 0.3]}
        position={[0, 0.15, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#c08457" />
      </Cylinder>
      <Cylinder args={[0.04, 0.04, 0.5]} position={[0, 0.45, 0]} castShadow>
        <meshStandardMaterial color="#6b4f3b" />
      </Cylinder>
      <Sphere args={[0.22]} position={[0, 0.78, 0]} castShadow>
        <meshStandardMaterial color={leafColor} />
      </Sphere>
      <Sphere args={[0.18]} position={[0.18, 0.66, 0.06]} castShadow>
        <meshStandardMaterial color={leafColor} />
      </Sphere>
      <Sphere args={[0.18]} position={[-0.16, 0.62, -0.08]} castShadow>
        <meshStandardMaterial color={leafColor} />
      </Sphere>
    </group>
  );

  if (!interaction) return content;

  return (
    <InteractiveObject
      interaction={interaction}
      hoverText={interaction.title}
      accentColor={leafColor}
    >
      {content}
    </InteractiveObject>
  );
}

export function Desk({
  position,
  color = "#8b5a2b",
  width = 2.6,
  interaction,
}: DeskProps) {
  const content = (
    <group position={position}>
      <Box
        args={[width, 0.18, 1.2]}
        position={[0, 1.2, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={color} />
      </Box>
      {[
        [-width / 2 + 0.18, 0.6, -0.45],
        [width / 2 - 0.18, 0.6, -0.45],
        [-width / 2 + 0.18, 0.6, 0.45],
        [width / 2 - 0.18, 0.6, 0.45],
      ].map((p, i) => (
        <Box
          key={i}
          args={[0.15, 1.2, 0.15]}
          position={p as [number, number, number]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#5c4033" />
        </Box>
      ))}
    </group>
  );

  if (!interaction) return content;

  return (
    <InteractiveObject
      interaction={interaction}
      hoverText={`${interaction.title} • click`}
      accentColor={color}
    >
      {content}
    </InteractiveObject>
  );
}

export function Shelf({
  position,
  rows = 4,
  color = "#7c4a2d",
  width = 3.6,
  interaction,
}: ShelfProps) {
  const content = (
    <group position={position}>
      <Box
        args={[width, rows + 1, 0.5]}
        position={[0, (rows + 1) / 2, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={color} />
      </Box>
      {Array.from({ length: rows }).map((_, i) => (
        <Box
          key={i}
          args={[width - 0.15, 0.08, 0.46]}
          position={[0, i + 1, 0.02]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#9a6840" />
        </Box>
      ))}
    </group>
  );

  if (!interaction) return content;

  return (
    <InteractiveObject
      interaction={interaction}
      hoverText={interaction.title}
      accentColor={color}
    >
      {content}
    </InteractiveObject>
  );
}

export function BookStack({
  position,
  count = 5,
  interaction,
}: BookStackProps) {
  const colors = useMemo(
    () => ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"],
    [],
  );

  const content = (
    <group position={position}>
      {Array.from({ length: count }).map((_, i) => (
        <Box
          key={i}
          args={[0.8, 0.12, 0.55]}
          position={[0, 0.06 + i * 0.12, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color={colors[i % colors.length]} />
        </Box>
      ))}
    </group>
  );

  if (!interaction) return content;

  return (
    <InteractiveObject
      interaction={interaction}
      hoverText={interaction.title}
      accentColor="#818cf8"
    >
      {content}
    </InteractiveObject>
  );
}

export function Dumbbell({ position, scale = 1, interaction }: DumbbellProps) {
  const content = (
    <group position={position} scale={scale}>
      <Cylinder
        args={[0.06, 0.06, 0.9]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
      >
        <meshStandardMaterial color="#9ca3af" />
      </Cylinder>
      <Cylinder
        args={[0.16, 0.16, 0.14]}
        position={[-0.35, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
      >
        <meshStandardMaterial color="#111827" />
      </Cylinder>
      <Cylinder
        args={[0.16, 0.16, 0.14]}
        position={[0.35, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
      >
        <meshStandardMaterial color="#111827" />
      </Cylinder>
    </group>
  );

  if (!interaction) return content;

  return (
    <InteractiveObject
      interaction={interaction}
      hoverText={interaction.title}
      accentColor="#94a3b8"
    >
      {content}
    </InteractiveObject>
  );
}

export function Ball({
  position,
  color = "#f97316",
  scale = 1,
  interaction,
}: BallProps) {
  const content = (
    <Sphere args={[0.28 * scale]} position={position} castShadow receiveShadow>
      <meshStandardMaterial color={color} />
    </Sphere>
  );

  if (!interaction) return content;

  return (
    <InteractiveObject
      interaction={interaction}
      hoverText={interaction.title}
      accentColor={color}
    >
      {content}
    </InteractiveObject>
  );
}

export function Cone({ position, color = "#fb923c", interaction }: ConeProps) {
  const content = (
    <group position={position}>
      <Cylinder
        args={[0.02, 0.22, 0.55, 4]}
        position={[0, 0.275, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={color} />
      </Cylinder>
      <Torus
        args={[0.18, 0.04, 8, 24]}
        position={[0, 0.05, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
      >
        <meshStandardMaterial color="#f8fafc" />
      </Torus>
    </group>
  );

  if (!interaction) return content;

  return (
    <InteractiveObject
      interaction={interaction}
      hoverText={interaction.title}
      accentColor={color}
    >
      {content}
    </InteractiveObject>
  );
}

export function FramedMeter({
  title,
  value,
  max = 10,
  position,
  color = "#22c55e",
}: FramedMeterProps) {
  const pct = Math.max(0.1, Math.min(value / max, 1));

  return (
    <group position={position}>
      <Box args={[2.8, 1.1, 0.1]} castShadow receiveShadow>
        <meshStandardMaterial color="#0f172a" />
      </Box>
      <Box args={[2.2, 0.22, 0.11]} position={[0, -0.12, 0.06]}>
        <meshStandardMaterial color="#334155" />
      </Box>
      <Box
        args={[2.2 * pct, 0.18, 0.12]}
        position={[-1.1 + (2.2 * pct) / 2, -0.12, 0.08]}
      >
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.25}
        />
      </Box>
      <Label
        text={title}
        position={[0, 0.24, 0.08]}
        color="#e2e8f0"
        size={0.18}
      />
      <Label
        text={`${value}`}
        position={[0, -0.4, 0.08]}
        color="#cbd5e1"
        size={0.15}
      />
    </group>
  );
}

export function SkillPedestal({ skill, position }: SkillPedestalProps) {
  return (
    <InteractiveObject
      interaction={{
        id: `pedestal-${skill.id}`,
        title: skill.name,
        description: `${skill.icon} ${skill.name} is currently level ${skill.level}. Keep stacking focused reps to grow this area of your life.`,
        category: skill.category,
        skillId: skill.id,
      }}
      hoverText={`${skill.name} • Lv.${skill.level}`}
      accentColor={skill.color}
      scaleOnHover={1.05}
    >
      <group position={position}>
        <Cylinder
          args={[0.65, 0.75, 0.6, 24]}
          position={[0, 0.3, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#e2e8f0" />
        </Cylinder>
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
          <Sphere args={[0.45]} position={[0, 1.2, 0]} castShadow receiveShadow>
            <meshStandardMaterial
              color={skill.color}
              emissive={skill.color}
              emissiveIntensity={0.22}
            />
          </Sphere>
          <Text
            position={[0, 1.22, 0.46]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {skill.icon}
          </Text>
        </Float>
        <Label
          text={skill.name}
          position={[0, 0.08, 0.42]}
          color="#334155"
          size={0.14}
        />
      </group>
    </InteractiveObject>
  );
}
