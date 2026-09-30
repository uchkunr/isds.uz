"use client";

import * as THREE from "three";
import { Group } from "three";

import { GlobeRouteAnimation } from "@/lib/types";
import { Dots } from "./dots";
import { AnimationGroup } from "./animation-group";
import { forwardRef } from "react";
import { GLOBE_DEFAULTS } from "@/lib/config";

interface GlobeProps {
  position: [x: number, y: number, z: number];
  routes: GlobeRouteAnimation[][];
  sphereSize?: number;
  dotDensity?: number;
  rotation?: [number, number, number];
  sphereColor?: string;
  dotColor?: string;
  twinkleStrength?: number;
  arcColor?: string;
  pathColor?: string;
  animationSpeed?: number;
}

const Globe = forwardRef<Group, GlobeProps>(
  (
    {
      position,
      routes,
      sphereSize = GLOBE_DEFAULTS.sphereSize,
      dotDensity = GLOBE_DEFAULTS.dotDensity,
      rotation = [GLOBE_DEFAULTS.tilt, 0, 0],
      sphereColor = GLOBE_DEFAULTS.sphereColor,
      dotColor = GLOBE_DEFAULTS.dotColor,
      twinkleStrength = GLOBE_DEFAULTS.twinkleStrength,
      arcColor = GLOBE_DEFAULTS.arcColor,
      pathColor = GLOBE_DEFAULTS.pathColor,
      animationSpeed = GLOBE_DEFAULTS.animationSpeed,
    },
    ref
  ) => {
    return (
      <group ref={ref} position={position} rotation={rotation}>
        {/* Inner Solid Globe - Opaque to prevent transparent sorting flip-flops */}
        <mesh renderOrder={0}>
          <sphereGeometry args={[sphereSize, 48, 48]} />
          <meshStandardMaterial
            color={sphereColor}
            roughness={0.75}
            metalness={0.15}
            side={THREE.FrontSide}
          />
        </mesh>

        {/* Ambient atmospheric rim glow */}
        <mesh renderOrder={0}>
          <sphereGeometry args={[sphereSize + 0.08, 48, 48]} />
          <meshBasicMaterial
            color="#0b2a4a"
            transparent={true}
            opacity={0.4}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Dynamic Route Arcs and Flying Lines */}
        {routes.map((route, i) => (
          <group key={i} renderOrder={2}>
            <AnimationGroup
              routes={route}
              sphereSize={sphereSize}
              arcColor={arcColor}
              pathColor={pathColor}
              animationSpeed={animationSpeed}
            />
          </group>
        ))}

        {/* Landmass Dots + Ambient Matrix Grid */}
        <Dots
          dotSphereRadius={sphereSize + 0.22}
          dotDensity={dotDensity}
          dotColor={dotColor}
          twinkleStrength={twinkleStrength}
        />
      </group>
    );
  }
);

Globe.displayName = "Globe";

export { Globe };
