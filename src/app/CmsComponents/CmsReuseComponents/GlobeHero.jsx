"use client";

import React, { useEffect, useRef, useCallback } from "react";
import createGlobe from "cobe";
import { cn } from "@/lib/utils";

function parseColorToRgbNormalized(color, fallback = [0.545, 0.36, 0.965]) {
  if (!color) return fallback;
  if (Array.isArray(color) && color.length >= 3) {
    return color.map((v) => (v > 1 ? v / 255 : v));
  }
  if (typeof color === "string") {
    const s = color.trim();
    if (s.startsWith("#")) {
      const clean = s.replace("#", "");
      if (clean.length === 3) {
        const r = parseInt(clean[0] + clean[0], 16) / 255;
        const g = parseInt(clean[1] + clean[1], 16) / 255;
        const b = parseInt(clean[2] + clean[2], 16) / 255;
        return [r, g, b];
      }
      if (clean.length === 6) {
        const r = parseInt(clean.substring(0, 2), 16) / 255;
        const g = parseInt(clean.substring(2, 4), 16) / 255;
        const b = parseInt(clean.substring(4, 6), 16) / 255;
        return [r, g, b];
      }
    }
    if (s.includes(",")) {
      const parts = s.split(",").map((p) => parseFloat(p.trim()));
      if (parts.length >= 3 && !parts.some(isNaN)) {
        return [parts[0] / 255, parts[1] / 255, parts[2] / 255];
      }
    }
  }
  return fallback;
}

function getThemeNormalizedColor(el, fallback = [0.545, 0.36, 0.965]) {
  if (typeof window === "undefined" || !el) return fallback;
  const style = window.getComputedStyle(el);
  const rgbStr = style.getPropertyValue("--b2b-primary-rgb").trim();
  if (rgbStr) {
    return parseColorToRgbNormalized(rgbStr, fallback);
  }
  const hexStr = style.getPropertyValue("--b2b-primary").trim();
  if (hexStr) {
    return parseColorToRgbNormalized(hexStr, fallback);
  }
  return fallback;
}

/**
 * GlobeHero — premium dynamic cobe globe configured for Base2Brand:
 * Adapts colors dynamically to the active page theme (--b2b-primary).
 */
export function GlobeHero({
  markers = defaultMarkers,
  markerColor: customMarkerColor,
  glowColor: customGlowColor,
  baseColor: customBaseColor,
  className = "",
  speed = 0.0035,
  size = 600,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const pointerInteracting = useRef(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const phiOffsetRef = useRef(0);
  const thetaOffsetRef = useRef(0);
  const isPausedRef = useRef(false);
  const isVisibleRef = useRef(false);

  const handlePointerDown = useCallback((e) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY };
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    isPausedRef.current = true;
  }, []);

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi;
      thetaOffsetRef.current += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
    }
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
    isPausedRef.current = false;
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        };
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerUp]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    let globe = null;
    let animationId;
    let phi = 0;
    let intersectionObserver;

    function init() {
      const width = canvas.offsetWidth || size;
      if (width === 0 || globe) return;

      // Extract dynamic color from theme or custom prop
      const themeColorRgb = customMarkerColor
        ? parseColorToRgbNormalized(customMarkerColor)
        : getThemeNormalizedColor(containerRef.current || canvas);

      const dynamicGlowColor = customGlowColor
        ? parseColorToRgbNormalized(customGlowColor)
        : [
            Math.min(1, themeColorRgb[0] * 1.1 + 0.05),
            Math.min(1, themeColorRgb[1] * 1.1 + 0.05),
            Math.min(1, themeColorRgb[2] * 1.1 + 0.05),
          ];

      const dynamicBaseColor = customBaseColor
        ? parseColorToRgbNormalized(customBaseColor)
        : [
            Math.min(0.4, themeColorRgb[0] * 0.2 + 0.08),
            Math.min(0.4, themeColorRgb[1] * 0.2 + 0.1),
            Math.min(0.5, themeColorRgb[2] * 0.3 + 0.15),
          ];

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 1.5),
        width: width * 2,
        height: width * 2,
        phi: 0,
        theta: 0.25,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 9000,
        mapBrightness: 5,
        baseColor: dynamicBaseColor,
        markerColor: themeColorRgb,
        glowColor: dynamicGlowColor,
        markerElevation: 0.03,
        markers: markers.map((m) => ({ location: m.location, size: m.size ?? 0.07 })),
      });

      function animate() {
        animationId = requestAnimationFrame(animate);
        if (!isVisibleRef.current) return;
        if (!isPausedRef.current) phi += speed;
        globe.update({
          phi: phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: 0.25 + thetaOffsetRef.current + dragOffset.current.theta,
        });
      }
      animate();
      setTimeout(() => canvas && (canvas.style.opacity = "1"));
    }

    const observeTarget = containerRef.current ?? canvas;
    intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry?.isIntersecting ?? false;
      },
      { rootMargin: "120px" },
    );
    intersectionObserver.observe(observeTarget);

    if (canvas.offsetWidth > 0) {
      init();
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect();
          init();
        }
      });
      ro.observe(canvas);
    }

    return () => {
      intersectionObserver?.disconnect();
      if (animationId) cancelAnimationFrame(animationId);
      if (globe) globe.destroy();
    };
  }, [markers, speed, size, customMarkerColor, customGlowColor, customBaseColor]);

  return (
    <div ref={containerRef} className={cn("relative aspect-square w-full", className)}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        data-testid="globe-hero-canvas"
        className="aspect-square w-full h-full"
        style={{
          cursor: "grab",
          opacity: 0,
          transition: "opacity 1.4s ease",
          touchAction: "none",
        }}
      />
    </div>
  );
}

const defaultMarkers = [
  { location: [28.6139, 77.209], size: 0.1 }, // New Delhi
  { location: [30.7333, 76.7794], size: 0.07 }, // Chandigarh
  { location: [12.9716, 77.5946], size: 0.08 }, // Bengaluru
  { location: [40.7608, -111.891], size: 0.08 }, // Utah
  { location: [43.6532, -79.3832], size: 0.07 }, // Toronto
  { location: [52.6369, -1.1398], size: 0.07 }, // Leicester
  { location: [-33.8688, 151.2093], size: 0.08 }, // Sydney
  { location: [6.5244, 3.3792], size: 0.07 }, // Lagos
];

export default GlobeHero;
