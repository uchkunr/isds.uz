"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { RotatingGlobe } from "../rotating-globe";
import airRoutesJson from "@/data/routes/air.json";
import oceanRoutesJson from "@/data/routes/ocean.json";
import { GlobeRouteAnimation } from "@/lib/types";
import { GLOBE_DEFAULTS } from "@/lib/config";

const airRouteGroups = airRoutesJson as unknown as GlobeRouteAnimation[][];
const oceanRoutes = oceanRoutesJson as unknown as GlobeRouteAnimation[];

interface SceneProps {
  className?: string;
}

export function Scene({ className }: SceneProps) {
  return (
    <div
      className={
        className ||
        "relative w-full aspect-square max-w-[620px] lg:max-w-[660px] flex items-center justify-center select-none"
      }
    >
      <Canvas
        gl={{ antialias: true, alpha: true }}
        camera={{
          fov: 45,
          near: 1,
          far: 500,
          zoom: 1,
          position: [0, 0, 52],
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <RotatingGlobe
          routes={[...airRouteGroups, oceanRoutes]}
          rotationSpeed={GLOBE_DEFAULTS.rotationSpeed}
          paused={false}
          tilt={GLOBE_DEFAULTS.tilt}
          sphereColor={GLOBE_DEFAULTS.sphereColor}
          dotDensity={GLOBE_DEFAULTS.dotDensity}
          dotColor={GLOBE_DEFAULTS.dotColor}
          twinkleStrength={GLOBE_DEFAULTS.twinkleStrength}
          arcColor={GLOBE_DEFAULTS.arcColor}
          pathColor={GLOBE_DEFAULTS.pathColor}
          animationSpeed={GLOBE_DEFAULTS.animationSpeed}
          ambientIntensity={GLOBE_DEFAULTS.ambientIntensity}
          directionalIntensity={GLOBE_DEFAULTS.directionalIntensity}
        />
      </Canvas>
    </div>
  );
}
