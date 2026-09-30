"use client";

import * as THREE from "three";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  calcPosFromLatLonRad,
  readMapImageData,
  visibilityForCoordinate,
} from "@/lib/utils/map";
import { DotLatLon } from "@/lib/types";
import { loadImage } from "@/lib/utils/load-image";
import { useFrame } from "@react-three/fiber";
import { GLOBE_DEFAULTS } from "@/lib/config";

const vertexShader = `
attribute float twinkleOffset;
attribute float twinkleDuration;
attribute float twinkleIntensity;
attribute float isLand;

varying float vTwinkleOffset;
varying float vTwinkleDuration;
varying float vTwinkleIntensity;
varying float vIsLand;

void main() {
  vTwinkleOffset = twinkleOffset;
  vTwinkleDuration = twinkleDuration;
  vTwinkleIntensity = twinkleIntensity;
  vIsLand = isLand;

  vec3 transformed = position;
  gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(transformed, 1.0);
}
`;

const fragmentShader = `
uniform float time;
uniform vec3 dotColor;
uniform float twinkleStrength;

varying float vTwinkleOffset;
varying float vTwinkleDuration;
varying float vTwinkleIntensity;
varying float vIsLand;

void main() {
  float dur = max(vTwinkleDuration, 0.5);
  float twinkleTime = time + vTwinkleOffset;
  float twinkleCycle = mod(twinkleTime / dur, 1.0);
  float wave = sin(twinkleCycle * 3.14159265);
  float twinkle = clamp(wave * vTwinkleIntensity, 0.0, 1.0);

  // If land: vivid cyan with bright white sparkle core
  // If ocean: subtle cyber grid point (deep electric blue)
  vec3 landColor = mix(dotColor, vec3(0.95, 0.98, 1.0), twinkle * 0.6);
  vec3 oceanColor = vec3(0.08, 0.32, 0.58);
  vec3 finalColor = mix(oceanColor, landColor, vIsLand);

  // Land has high base opacity (0.75 - 1.0), ocean has subtle ambient opacity (0.22)
  float landAlpha = clamp(0.75 + twinkle * 0.25, 0.0, 1.0) * twinkleStrength;
  float oceanAlpha = 0.22 * twinkleStrength;
  float finalAlpha = mix(oceanAlpha, landAlpha, vIsLand);

  gl_FragColor = vec4(finalColor, finalAlpha);
}
`;

interface DotsProps {
  dotSphereRadius: number;
  dotDensity?: number;
  dotColor?: string;
  twinkleStrength?: number;
}

interface DotWithTwinkle {
  position: THREE.Vector3;
  twinkleOffset: number;
  twinkleDuration: number;
  twinkleIntensity: number;
  isLand: number;
}

const generateDots = (
  dotSphereRadius: number,
  dotDensity: number,
  mapLatLons: DotLatLon | null
): DotWithTwinkle[] => {
  const tempDots: DotWithTwinkle[] = [];
  const DEG_TO_RAD = Math.PI / 180;
  const TWO_PI = Math.PI * 2;

  for (let lat = 88; lat >= -88; lat -= 1) {
    const latRad = Math.abs(lat) * DEG_TO_RAD;
    const radius = Math.cos(latRad) * dotSphereRadius;
    const circumference = radius * TWO_PI;
    const dotsForLat = Math.round(circumference * dotDensity);

    if (dotsForLat <= 0) continue;

    for (let x = 0; x < dotsForLat; x++) {
      const long = -180 + (x * 360) / dotsForLat;
      const isLand = visibilityForCoordinate(long, lat, mapLatLons);

      // On ocean, render a spaced digital matrix grid (so oceans have subtle coordinates, never empty)
      if (!isLand) {
        if (x % 3 !== 0 || Math.abs(Math.round(lat)) % 3 !== 0) {
          continue;
        }
      }

      const [xPos, yPos, zPos] = calcPosFromLatLonRad(
        long,
        lat,
        dotSphereRadius
      );

      tempDots.push({
        position: new THREE.Vector3(xPos, yPos, zPos),
        twinkleOffset: Math.random() * 10,
        twinkleDuration: 1.2 + Math.random() * 1.5,
        twinkleIntensity: isLand ? 0.7 + Math.random() * 0.3 : 0.25,
        isLand: isLand ? 1.0 : 0.0,
      });
    }
  }

  return tempDots;
};

const Dots = ({
  dotSphereRadius,
  dotDensity = GLOBE_DEFAULTS.dotDensity,
  dotColor = GLOBE_DEFAULTS.dotColor,
  twinkleStrength = GLOBE_DEFAULTS.twinkleStrength,
}: DotsProps) => {
  const meshRef = useRef<THREE.InstancedMesh>(null!);

  const uniforms = useMemo(
    () => ({
      time: { value: 0.0 },
      dotColor: { value: new THREE.Color(GLOBE_DEFAULTS.dotColor) },
      twinkleStrength: { value: GLOBE_DEFAULTS.twinkleStrength as number },
    }),
    []
  );

  // Keep uniforms in sync with props without recreating the object
  useEffect(() => {
    uniforms.dotColor.value.set(dotColor);
  }, [dotColor, uniforms]);

  useEffect(() => {
    uniforms.twinkleStrength.value = twinkleStrength;
  }, [twinkleStrength, uniforms]);

  const [dots, setDots] = useState<DotWithTwinkle[]>([]);

  const loadAndGenerateDots = useCallback(async () => {
    try {
      const imageData = await loadImage("/world_alpha_mini.jpg");
      const mapLatLons = readMapImageData(imageData);
      const generatedDots = generateDots(dotSphereRadius, dotDensity, mapLatLons);
      setDots(generatedDots);
    } catch (error) {
      console.error("Failed to load image:", error);
    }
  }, [dotSphereRadius, dotDensity]);

  useEffect(() => {
    loadAndGenerateDots();
  }, [loadAndGenerateDots]);

  useEffect(() => {
    if (meshRef.current && dots.length > 0) {
      const matrix = new THREE.Matrix4();
      dots.forEach((dot, i) => {
        matrix.setPosition(dot.position);
        meshRef.current.setMatrixAt(i, matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [dots]);

  useEffect(() => {
    if (meshRef.current && dots.length > 0) {
      const count = dots.length;
      const twinkleOffsets = new Float32Array(count);
      const twinkleDurations = new Float32Array(count);
      const twinkleIntensities = new Float32Array(count);
      const isLands = new Float32Array(count);

      dots.forEach((dot, i) => {
        twinkleOffsets[i] = dot.twinkleOffset;
        twinkleDurations[i] = dot.twinkleDuration;
        twinkleIntensities[i] = dot.twinkleIntensity;
        isLands[i] = dot.isLand;
      });

      meshRef.current.geometry.setAttribute(
        "twinkleOffset",
        new THREE.InstancedBufferAttribute(twinkleOffsets, 1)
      );
      meshRef.current.geometry.setAttribute(
        "twinkleDuration",
        new THREE.InstancedBufferAttribute(twinkleDurations, 1)
      );
      meshRef.current.geometry.setAttribute(
        "twinkleIntensity",
        new THREE.InstancedBufferAttribute(twinkleIntensities, 1)
      );
      meshRef.current.geometry.setAttribute(
        "isLand",
        new THREE.InstancedBufferAttribute(isLands, 1)
      );
    }
  }, [dots]);

  useFrame((state) => {
    uniforms.time.value = state.clock.elapsedTime;
  });

  return (
    <instancedMesh
      ref={meshRef}
      renderOrder={1}
      frustumCulled={false}
      args={[undefined, undefined, dots.length]}
    >
      <sphereGeometry args={[0.092, 6, 6]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        depthTest={true}
      />
    </instancedMesh>
  );
};

export { Dots };
