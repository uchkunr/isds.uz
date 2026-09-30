"use client";

import React, { useEffect, useRef } from "react";

export function TriangleInteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Triangle dimensions
    const S = 60; // Side length of equilateral triangle
    const H = S * (Math.sqrt(3) / 2); // Row height ~ 51.96px

    // Kichik, aniq va fokuslangan hover radiusi
    const glowRadius = 85;

    // Har bir uchburchakning sekin so'nuvchi yorug'lik intensivligi (slow lingering decay)
    const glowMap = new Map<string, number>();

    // Mouse coordinates (boshlang'ich holatda ekrandan tashqarida)
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
    };

    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        mouse.active = true;
      }
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
      mouse.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    let time = 0;

    const render = () => {
      time += 0.02;

      // Kursor harakati
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.25;
        mouse.y += (mouse.targetY - mouse.y) * 0.25;
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Kursor ostidagi kichik fokuslangan neon nur
      if (mouse.active && mouse.x > 0 && mouse.y > 0) {
        const radGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          glowRadius
        );
        radGlow.addColorStop(0, "rgba(14, 165, 233, 0.11)");
        radGlow.addColorStop(0.5, "rgba(59, 130, 246, 0.03)");
        radGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = radGlow;
        ctx.fillRect(
          mouse.x - glowRadius,
          mouse.y - glowRadius,
          glowRadius * 2,
          glowRadius * 2
        );
      }

      // 2. Uchburchaklar to'ri (tessellation)
      const rows = Math.ceil(height / H) + 2;
      const cols = Math.ceil(width / S) + 2;

      const highlightedVertices: Array<{ x: number; y: number; glow: number }> = [];

      for (let r = -1; r <= rows; r++) {
        const isOdd = ((r % 2) + 2) % 2 === 1;
        const xOffset = isOdd ? S * 0.5 : 0;
        const y0 = r * H;
        const y1 = (r + 1) * H;

        for (let c = -2; c <= cols; c++) {
          const x0 = c * S + xOffset;
          const x1 = (c + 1) * S + xOffset;
          const xm = (c + 0.5) * S + xOffset;
          const xnext = (c + 1.5) * S + xOffset;

          // Triangle 1: Downward pointing
          const cx1 = xm;
          const cy1 = y0 + H / 3;
          drawTriangleWithDecay(
            `${r}_${c}_1`,
            x0,
            y0,
            x1,
            y0,
            xm,
            y1,
            cx1,
            cy1,
            highlightedVertices
          );

          // Triangle 2: Upward pointing
          const cx2 = x1;
          const cy2 = y0 + (2 * H) / 3;
          drawTriangleWithDecay(
            `${r}_${c}_2`,
            x1,
            y0,
            xm,
            y1,
            xnext,
            y1,
            cx2,
            cy2,
            highlightedVertices
          );
        }
      }

      // 3. Yonayotgan uchburchaklarning uchlaridagi (vertices) yorug'lik nuqtalari
      for (let i = 0; i < highlightedVertices.length; i++) {
        const v = highlightedVertices[i];
        ctx.beginPath();
        ctx.arc(v.x, v.y, 1.2 + v.glow * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(224, 242, 254, ${0.2 + v.glow * 0.5})`;
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = v.glow * 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const drawTriangleWithDecay = (
      key: string,
      p1x: number,
      p1y: number,
      p2x: number,
      p2y: number,
      p3x: number,
      p3y: number,
      cx: number,
      cy: number,
      verticesList: Array<{ x: number; y: number; glow: number }>
    ) => {
      // Kursor masofasiga qarab lahzali intensivlik
      let targetGlow = 0;
      if (mouse.active && mouse.x > 0) {
        const dx = cx - mouse.x;
        const dy = cy - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < glowRadius) {
          const factor = 1 - dist / glowRadius;
          targetGlow = Math.pow(factor, 1.4);
        }
      }

      // Mavjud intensivlikni o'qish va juda sekin, mayin so'nish (0.98 decay)
      const currentGlow = glowMap.get(key) || 0;
      let newGlow = 0;

      if (targetGlow > currentGlow) {
        // Hover bo'lganda tezda yonadi
        newGlow = targetGlow;
      } else {
        // Kursor ketgach juda sekin yo'qoladi (~1.5-2 soniya)
        newGlow = currentGlow * 0.98;
        if (newGlow < 0.008) newGlow = 0;
      }

      if (newGlow > 0) {
        glowMap.set(key, newGlow);
      } else if (currentGlow > 0) {
        glowMap.delete(key);
      }

      // Uchburchakni chizish
      ctx.beginPath();
      ctx.moveTo(p1x, p1y);
      ctx.lineTo(p2x, p2y);
      ctx.lineTo(p3x, p3y);
      ctx.closePath();

      if (newGlow > 0) {
        // Yonish foni (fill) - sekin so'nadi
        ctx.fillStyle = `rgba(14, 165, 233, ${0.03 + newGlow * 0.22})`;
        ctx.fill();

        // Neon chegaralar
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.20 + newGlow * 0.50})`;
        ctx.lineWidth = 0.85 + newGlow * 1.3;
        ctx.stroke();

        if (newGlow > 0.2) {
          verticesList.push(
            { x: p1x, y: p1y, glow: newGlow },
            { x: p2x, y: p2y, glow: newGlow },
            { x: p3x, y: p3y, glow: newGlow }
          );
        }
      } else {
        // Tinch holatdagi nozik to'r chizig'i (pastroq, yumshoq opacity)
        const idleWave = Math.sin(time + cx * 0.015 + cy * 0.015) * 0.5 + 0.5;
        ctx.strokeStyle = `rgba(148, 163, 184, ${0.055 + idleWave * 0.035})`;
        ctx.lineWidth = 0.65;
        ctx.stroke();
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-90"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
      }}
    />
  );
}
