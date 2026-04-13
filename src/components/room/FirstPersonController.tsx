import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import Hands from "./Hands";
import {
  FIRST_PERSON_DEFAULTS,
  ROOM_WORLD_BOUNDS,
} from "./constants";
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
  const directionRef = useRef(new THREE.Vector3());
  const sidewaysRef = useRef(new THREE.Vector3());
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
    () => new THREE.Vector3(0, height, 8),
    [height],
  );

  useEffect(() => {
    if (!enabled) {
      setIsPointerLocked(false);
      if (document.pointerLockElement === gl.domElement) {
        document.exitPointerLock();
      }
      return;
    }

    camera.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
    camera.rotation.set(0, 0, 0);
    yawRef.current = normalizeAngle(Math.PI);
    pitchRef.current = -0.08;

    return () => {
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

      yawRef.current = normalizeAngle(yawRef.current - event.movementX * mouseSensitivity);
      pitchRef.current = clamp(
        pitchRef.current - event.movementY * mouseSensitivity,
        -Math.PI / 2 + 0.12,
        Math.PI / 2 - 0.12,
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
    gl.domElement.addEventListener("click", onCanvasClick);

    return () => {
      document.removeEventListener("pointerlockchange", onPointerLockChange);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
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
    const speed = movementSpeed * (keys.sprint ? sprintMultiplier : 1);

    directionRef.current.set(0, 0, 0);
    sidewaysRef.current.set(0, 0, 0);

    camera.getWorldDirection(directionRef.current);
    directionRef.current.y = 0;
    if (directionRef.current.lengthSq() > 0) {
      directionRef.current.normalize();
    }

    sidewaysRef.current.crossVectors(directionRef.current, camera.up).normalize();

    const moveVector = new THREE.Vector3();

    if (keys.forward) moveVector.add(directionRef.current);
    if (keys.backward) moveVector.sub(directionRef.current);
    if (keys.left) moveVector.add(sidewaysRef.current);
    if (keys.right) moveVector.sub(sidewaysRef.current);

    const isMoving = moveVector.lengthSq() > 0.0001;
    setIsWalking(isMoving);

    if (isMoving) {
      moveVector.normalize().multiplyScalar(speed);
      velocityRef.current.lerp(moveVector, Math.min(1, delta * 10));
    } else {
      velocityRef.current.lerp(new THREE.Vector3(0, 0, 0), Math.min(1, delta * 8));
    }

    camera.position.x += velocityRef.current.x * delta;
    camera.position.z += velocityRef.current.z * delta;
    camera.position.y = height;

    camera.position.x = clamp(camera.position.x, bounds.minX, bounds.maxX);
    camera.position.z = clamp(camera.position.z, bounds.minZ, bounds.maxZ);
  });

  if (!enabled) return null;

  return (
    <group position={camera.position} rotation={camera.rotation}>
      <Hands visible={enabled} walking={isWalking && isPointerLocked} intensity={1} />
    </group>
  );
}
