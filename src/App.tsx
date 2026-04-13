import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Room from "./components/Room";
import CharacterCard from "./components/CharacterCard";
import StatsPanel from "./components/StatsPanel";
import QuestList from "./components/QuestList";
import Wishlist from "./components/Wishlist";
import Onboarding from "./components/Onboarding";
import { useGameStore } from "./store";
import { useEffect, useMemo, useState, useRef } from "react";
import AvatarEvolution from "./components/AvatarEvolution";
import * as THREE from "three";

interface AnimatedCameraProps {
  enabled: boolean;
}

// Animated camera component that smoothly interpolates to room focus targets
function AnimatedCamera({ enabled }: AnimatedCameraProps) {
  const focusedRoom = useGameStore((state) => state.focusedRoom);
  const controlsRef = useRef<any>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  const defaultCameraPosition = useMemo(
    () => new THREE.Vector3(22, 22, 22),
    [],
  );
  const defaultTarget = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  const desiredPosition = useMemo(() => {
    if (!focusedRoom) return defaultCameraPosition.clone();

    const focusTarget = new THREE.Vector3(...focusedRoom.target);
    const baseCameraPosition = new THREE.Vector3(...focusedRoom.cameraPosition);
    const offsetFromTarget = baseCameraPosition
      .sub(focusTarget)
      .multiplyScalar(2.8);

    return focusTarget
      .clone()
      .add(offsetFromTarget)
      .add(new THREE.Vector3(0, 6, 10));
  }, [focusedRoom, defaultCameraPosition]);

  const desiredTarget = useMemo(() => {
    if (!focusedRoom) return defaultTarget.clone();
    return new THREE.Vector3(...focusedRoom.target);
  }, [focusedRoom, defaultTarget]);

  const isAnimatingRef = useRef(false);
  const currentTargetRef = useRef(defaultTarget.clone());

  useEffect(() => {
    isAnimatingRef.current = true;
  }, [desiredPosition, desiredTarget]);

  useFrame((_, delta) => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;

    if (!camera || !controls) return;

    if (!isAnimatingRef.current) return;

    const smoothing = 1 - Math.exp(-4 * delta);

    camera.position.lerp(desiredPosition, smoothing);
    currentTargetRef.current.lerp(desiredTarget, smoothing);
    controls.target.copy(currentTargetRef.current);
    controls.update();

    const positionSettled =
      camera.position.distanceToSquared(desiredPosition) < 0.01;
    const targetSettled =
      currentTargetRef.current.distanceToSquared(desiredTarget) < 0.01;

    if (positionSettled && targetSettled) {
      camera.position.copy(desiredPosition);
      currentTargetRef.current.copy(desiredTarget);
      controls.target.copy(desiredTarget);
      controls.update();
      isAnimatingRef.current = false;
    }
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={defaultCameraPosition.toArray() as [number, number, number]}
        fov={50}
      />
      {enabled && (
        <OrbitControls
          ref={controlsRef}
          enablePan={true}
          enableZoom={true}
          minPolarAngle={0.1}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minDistance={5}
          maxDistance={120}
          target={defaultTarget.toArray() as [number, number, number]}
        />
      )}
    </>
  );
}

export default function App() {
  const isOnboarded = useGameStore((state) => state.isOnboarded);
  const level = useGameStore((state) => state.level);
  const focusedRoom = useGameStore((state) => state.focusedRoom);
  const clearFocusedRoom = useGameStore((state) => state.clearFocusedRoom);
  const cameraMode = useGameStore((state) => state.cameraMode);
  const setCameraMode = useGameStore((state) => state.setCameraMode);
  const [isEvolutionOpen, setIsEvolutionOpen] = useState(false);
  const prevLevelRef = useRef(level);

  useEffect(() => {
    if (isOnboarded && level > prevLevelRef.current) {
      // Level up detected, auto open evolution
      setIsEvolutionOpen(true);
    }
    prevLevelRef.current = level;
  }, [level, isOnboarded]);

  if (!isOnboarded) {
    return <Onboarding />;
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-500 overflow-hidden relative font-sans text-slate-900 dark:text-slate-100">
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas shadows>
          <AnimatedCamera enabled={cameraMode === "overview"} />
          <Room />
        </Canvas>
      </div>

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="pointer-events-auto">
          <CharacterCard />
          <QuestList />
          <Wishlist />
          <div className="absolute top-4 right-4 flex max-w-[calc(100vw-2rem)] flex-col items-end gap-3 sm:max-w-none">
            <div className="flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={() =>
                  setCameraMode(
                    cameraMode === "overview" ? "firstPerson" : "overview",
                  )
                }
                className="rounded-xl border border-white/50 bg-white/80 dark:bg-slate-800/80 px-4 py-2 text-sm font-semibold text-slate-800 dark:text-slate-100 shadow-lg backdrop-blur-md transition hover:bg-white dark:hover:bg-slate-700"
              >
                {cameraMode === "overview" ? "Walk Mode" : "Overview"}
              </button>
              {focusedRoom && cameraMode === "overview" && (
                <button
                  type="button"
                  onClick={clearFocusedRoom}
                  className="rounded-xl border border-white/50 bg-white/80 dark:bg-slate-800/80 px-4 py-2 text-sm font-semibold text-slate-800 dark:text-slate-100 shadow-lg backdrop-blur-md transition hover:bg-white dark:hover:bg-slate-700"
                >
                  Reset camera
                </button>
              )}
            </div>

            {cameraMode === "firstPerson" && (
              <div className="w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-white/50 bg-white/80 p-4 text-left text-sm text-slate-700 shadow-xl backdrop-blur-md dark:bg-slate-800/85 dark:text-slate-200">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-slate-900 dark:text-slate-50">
                    Walk mode
                  </p>
                  <span className="rounded-full bg-slate-900/10 px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-slate-600 dark:bg-white/10 dark:text-slate-300">
                    FPV
                  </span>
                </div>
                <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
                  Click inside the world to lock your cursor, move with WASD or
                  arrow keys, hold Shift to sprint, and press Esc to release the
                  cursor.
                </p>
              </div>
            )}

            <StatsPanel />
          </div>
        </div>
      </div>

      <AvatarEvolution
        isOpen={isEvolutionOpen}
        onClose={() => setIsEvolutionOpen(false)}
      />
    </div>
  );
}
