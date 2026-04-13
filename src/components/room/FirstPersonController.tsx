import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import Hands from "./Hands";
import { FIRST_PERSON_DEFAULTS, ROOM_WORLD_BOUNDS } from "./constants";
import type { FirstPersonControllerProps } from "./types";

type KeyState = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  sprint: boolean;
};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const normalizeAngle = (angle: number) => {
  const twoPi = Math.PI * 2;
  return ((angle % twoPi) + twoPi) % twoPi;
};

export default function FirstPersonController({
  enabled,
  movementSpeed = FIRST_PERSON_DEFAULTS.movementSpeed,
  sprintMultiplier = FIRST_PERSON_DEFAULTS.sprintMultiplier,
  mouseSensitivity = FIRST_PERSON_DEFAULTS.mouseSensitivity,
  height = FIRST_PERSON_DEFAULTS.height,
  bounds = ROOM_WORLD_BOUNDS,
}: FirstPersonControllerProps) {
  const { camera, gl } = useThree();

  const yawRef = useRef(0);
  const pitchRef = useRef(0);
  const velocityRef = useRef(new THREE.Vector3());
  const desiredVelocityRef = useRef(new THREE.Vector3());
  const forwardRef = useRef(new THREE.Vector3());
  const rightRef = useRef(new THREE.Vector3());
  const keysRef = useRef<KeyState>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    sprint: false,
  });

  const [isPointerLocked, setIsPointerLocked] = useState(false);
  const [isWalking, setIsWalking] = useState(false);

  const initialPosition = useMemo(
    () => new THREE.Vector3(0, height, 18),
    [height],
  );

  useEffect(() => {
    if (!enabled) {
      setIsPointerLocked(false);
      keysRef.current = {
        forward: false,
        backward: false,
        left: false,
        right: false,
        sprint: false,
      };
      velocityRef.current.set(0, 0, 0);

      if (document.pointerLockElement === gl.domElement) {
        document.exitPointerLock();
      }
      return;
    }

    camera.position.set(
      initialPosition.x,
      initialPosition.y,
      initialPosition.z,
    );
    camera.rotation.set(0, 0, 0);
    yawRef.current = normalizeAngle(0);
    pitchRef.current = -0.04;

    return () => {
      keysRef.current = {
        forward: false,
        backward: false,
        left: false,
        right: false,
        sprint: false,
      };
      velocityRef.current.set(0, 0, 0);

      if (document.pointerLockElement === gl.domElement) {
        document.exitPointerLock();
      }
    };
  }, [enabled, camera, gl.domElement, initialPosition]);

  useEffect(() => {
    const onPointerLockChange = () => {
      setIsPointerLocked(document.pointerLockElement === gl.domElement);
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!enabled || document.pointerLockElement !== gl.domElement) return;

      yawRef.current = normalizeAngle(
        yawRef.current - event.movementX * mouseSensitivity,
      );
      pitchRef.current = clamp(
        pitchRef.current - event.movementY * mouseSensitivity,
        -Math.PI / 2 + 0.18,
        Math.PI / 2 - 0.18,
      );
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (!enabled) return;

      switch (event.code) {
        case "KeyW":
        case "ArrowUp":
          keysRef.current.forward = true;
          break;
        case "KeyS":
        case "ArrowDown":
          keysRef.current.backward = true;
          break;
        case "KeyA":
        case "ArrowLeft":
          keysRef.current.left = true;
          break;
        case "KeyD":
        case "ArrowRight":
          keysRef.current.right = true;
          break;
        case "ShiftLeft":
        case "ShiftRight":
          keysRef.current.sprint = true;
          break;
        default:
          break;
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case "KeyW":
        case "ArrowUp":
          keysRef.current.forward = false;
          break;
        case "KeyS":
        case "ArrowDown":
          keysRef.current.backward = false;
          break;
        case "KeyA":
        case "ArrowLeft":
          keysRef.current.left = false;
          break;
        case "KeyD":
        case "ArrowRight":
          keysRef.current.right = false;
          break;
        case "ShiftLeft":
        case "ShiftRight":
          keysRef.current.sprint = false;
          break;
        default:
          break;
      }
    };

    const onWindowBlur = () => {
      keysRef.current = {
        forward: false,
        backward: false,
        left: false,
        right: false,
        sprint: false,
      };
    };

    const onCanvasClick = () => {
      if (!enabled) return;
      if (document.pointerLockElement !== gl.domElement) {
        gl.domElement.requestPointerLock();
      }
    };

    document.addEventListener("pointerlockchange", onPointerLockChange);
    document.addEventListener("mousemove", onMouseMove);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onWindowBlur);
    gl.domElement.addEventListener("click", onCanvasClick);

    return () => {
      document.removeEventListener("pointerlockchange", onPointerLockChange);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onWindowBlur);
      gl.domElement.removeEventListener("click", onCanvasClick);
    };
  }, [enabled, gl.domElement, mouseSensitivity]);

  useFrame((_, delta) => {
    if (!enabled) return;

    camera.rotation.order = "YXZ";
    camera.rotation.y = yawRef.current;
    camera.rotation.x = pitchRef.current;
    camera.rotation.z = 0;

    const keys = keysRef.current;
    const maxSpeed = movementSpeed * (keys.sprint ? sprintMultiplier : 1);

    forwardRef.current
      .set(-Math.sin(yawRef.current), 0, -Math.cos(yawRef.current))
      .normalize();

    rightRef.current
      .set(Math.cos(yawRef.current), 0, -Math.sin(yawRef.current))
      .normalize();

    desiredVelocityRef.current.set(0, 0, 0);

    if (keys.forward) desiredVelocityRef.current.add(forwardRef.current);
    if (keys.backward) desiredVelocityRef.current.sub(forwardRef.current);
    if (keys.right) desiredVelocityRef.current.add(rightRef.current);
    if (keys.left) desiredVelocityRef.current.sub(rightRef.current);

    const isMoving = desiredVelocityRef.current.lengthSq() > 0.0001;
    if (isWalking !== isMoving) {
      setIsWalking(isMoving);
    }

    const acceleration = isMoving ? 18 : 12;

    if (isMoving) {
      desiredVelocityRef.current.normalize().multiplyScalar(maxSpeed);
    }

    velocityRef.current.lerp(
      desiredVelocityRef.current,
      Math.min(1, acceleration * delta),
    );

    camera.position.x += velocityRef.current.x * delta;
    camera.position.z += velocityRef.current.z * delta;
    camera.position.y = height;

    camera.position.x = clamp(camera.position.x, bounds.minX, bounds.maxX);
    camera.position.z = clamp(camera.position.z, bounds.minZ, bounds.maxZ);
  });

  if (!enabled) return null;

  return (
    <>
      {!isPointerLocked && (
        <group position={[0, height + 0.4, 14]}>
          {/* Intentionally empty world anchor to keep controller mounted cleanly */}
        </group>
      )}
      <group position={camera.position} rotation={camera.rotation}>
        <Hands
          visible={enabled}
          walking={isWalking && isPointerLocked}
          intensity={1}
        />
      </group>
    </>
  );
}
