"use client";

import { useEffect, useRef, useState } from "react";
import { geoOrthographic, geoPath, geoGraticule, geoBounds } from "d3-geo";
import { hexToRgbString } from "@/lib/utils";


const DEFAULT_HOTSPOTS = [
  { lng: -74.006, lat: 40.7128, label: "New York" },
  { lng: -122.4194, lat: 37.7749, label: "San Francisco" },
  { lng: -0.1278, lat: 51.5074, label: "London" },
  { lng: 2.3522, lat: 48.8566, label: "Paris" },
  { lng: 77.209, lat: 28.6139, label: "Delhi" },
  { lng: 72.8777, lat: 19.076, label: "Mumbai" },
  { lng: 103.8198, lat: 1.3521, label: "Singapore" },
  { lng: 139.6917, lat: 35.6895, label: "Tokyo" },
  { lng: 151.2093, lat: -33.8688, label: "Sydney" },
  { lng: -46.6333, lat: -23.5505, label: "São Paulo" },
  { lng: 55.2708, lat: 25.2048, label: "Dubai" },
  { lng: 13.405, lat: 52.52, label: "Berlin" },
];

export default function RotatingEarth({
  width = 460,
  height = 460,
  autoRotate = true,
  interactive = true,
  hotspots = DEFAULT_HOTSPOTS,
  className = "",
  // Optional explicit override. Left unset, the globe's dot color follows
  // the page's shared theme (--b2b-primary) instead of a fixed color, so it
  // stays consistent with every other section on the page.
  primaryColor,
}) {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!canvasRef.current || !wrapperRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    // Theme colors — falls back to the page's shared --b2b-primary (read
    // from this element, so it picks up whatever CmsPages' theme picker set)
    // when no explicit primaryColor override is passed.
    const themeColor = getComputedStyle(canvas).getPropertyValue("--b2b-primary").trim();
    const LAND_DOT = primaryColor || themeColor || "#8b5cf6";
    // Outline/graticule/glow all derive from the same resolved color as the
    // dots (LAND_DOT) — whether that came from the page theme var or an
    // explicit override — so the whole globe re-themes together instead of
    // just the dots.
    const primaryRgb = hexToRgbString(LAND_DOT);
    const OUTLINE = `rgba(${primaryRgb}, 0.45)`;
    const GRATICULE = `rgba(${primaryRgb}, 0.18)`;
    const OCEAN = "#05060B";
    const GLOW = `rgba(${primaryRgb}, 0.35)`;

    const containerWidth = Math.min(
      width,
      wrapperRef.current.clientWidth || width,
    );
    const containerHeight = Math.min(
      height,
      wrapperRef.current.clientHeight || height,
    );
    const radius = Math.min(containerWidth, containerHeight) / 2.3;

    // const dpr = window.devicePixelRatio || 1;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = containerWidth * dpr;
    canvas.height = containerHeight * dpr;
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${containerHeight}px`;
    context.scale(dpr, dpr);

    const projection = geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90);

    const path = geoPath().projection(projection).context(context);
    const graticule = geoGraticule().step([20, 20]);
    const pointInPolygon = (point, polygon) => {
      const [x, y] = point;
      let inside = false;
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside;
        }
      }
      return inside;
    };

    const pointInFeature = (point, feature) => {
      const geometry = feature.geometry;
      if (geometry.type === "Polygon") {
        const coordinates = geometry.coordinates;
        if (!pointInPolygon(point, coordinates[0])) return false;
        for (let i = 1; i < coordinates.length; i++) {
          if (pointInPolygon(point, coordinates[i])) return false;
        }
        return true;
      } else if (geometry.type === "MultiPolygon") {
        for (const polygon of geometry.coordinates) {
          if (pointInPolygon(point, polygon[0])) {
            let inHole = false;
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) {
                inHole = true;
                break;
              }
            }
            if (!inHole) return true;
          }
        }
        return false;
      }
      return false;
    };

    const generateDotsInPolygon = (feature, dotSpacing = 32) => {
      const dots = [];
      const bounds = geoBounds(feature);
      const [[minLng, minLat], [maxLng, maxLat]] = bounds;
      const stepSize = dotSpacing * 0.22;
      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point = [lng, lat];
          if (pointInFeature(point, feature)) dots.push(point);
        }
      }
      return dots;
    };

    const allDots = [];
    let landFeatures = null;

    const render = () => {
      context.clearRect(0, 0, containerWidth, containerHeight);

      const currentScale = projection.scale();
      const scaleFactor = currentScale / radius;
      const cx = containerWidth / 2;
      const cy = containerHeight / 2;

      // Outer aura
      const aura = context.createRadialGradient(
        cx,
        cy,
        currentScale * 0.6,
        cx,
        cy,
        currentScale * 1.5,
      );
      // aura.addColorStop(0, "rgba(255, 255, 255)");
      // aura.addColorStop(0.5, "rgba(255, 255, 255)");
      // aura.addColorStop(1, "rgba(0,0,0,0)");
      context.beginPath();
      context.arc(cx, cy, currentScale * 1.5, 0, 2 * Math.PI);
      context.fillStyle = aura;
      context.fill();

      // Ocean sphere with subtle inner gradient
      const oceanGrad = context.createRadialGradient(
        cx - currentScale * 0.3,
        cy - currentScale * 0.3,
        currentScale * 0.1,
        cx,
        cy,
        currentScale,
      );
      oceanGrad.addColorStop(0, "#0A0E1A");
      oceanGrad.addColorStop(0.7, OCEAN);
      oceanGrad.addColorStop(1, "#020308");
      context.beginPath();
      context.arc(cx, cy, currentScale, 0, 2 * Math.PI);
      context.fillStyle = oceanGrad;
      context.fill();

      // Outline ring
      context.beginPath();
      context.arc(cx, cy, currentScale, 0, 2 * Math.PI);
      context.strokeStyle = OUTLINE;
      context.lineWidth = 1.2 * scaleFactor;
      context.shadowColor = GLOW;
      context.shadowBlur = 6 * scaleFactor;
      context.stroke();
      context.shadowBlur = 0;

      if (landFeatures) {
        // Graticule
        // const graticule = d3.geoGraticule().step([20, 20]);
        context.beginPath();
        path(graticule());
        context.strokeStyle = GRATICULE;
        context.lineWidth = 0.6 * scaleFactor;
        context.stroke();

        // Land outlines (very faint)
        context.beginPath();
        landFeatures.features.forEach((feature) => path(feature));
        context.strokeStyle = "rgba(147, 197, 253, 0.18)";
        context.lineWidth = 0.6 * scaleFactor;
        context.stroke();

        // Halftone dots (electric blue)
        context.shadowColor = "rgba(139, 92, 246, 0.3)";
        context.shadowBlur = 0;
        for (let i = 0; i < allDots.length; i++) {
          const dot = allDots[i];
          const projected = projection([dot.lng, dot.lat]);
          if (
            projected &&
            projected[0] >= 0 &&
            projected[0] <= containerWidth &&
            projected[1] >= 0 &&
            projected[1] <= containerHeight
          ) { 
            context.beginPath();
            context.arc(
              projected[0],
              projected[1],
              1.35 * scaleFactor,
              0,
              2 * Math.PI,
            );
            context.fillStyle = LAND_DOT;
            context.fill();
          }
        }
        context.shadowBlur = 0;
      }

      // ===== Pulse hotspots =====
      if (hotspots && hotspots.length) {
        const now = performance.now();
        const rot = projection.rotate();
        // Check visibility via great-circle distance from globe center facing point
        const centerLng = -rot[0];
        const centerLat = -rot[1];
        const toRad = (d) => (d * Math.PI) / 180;
        hotspots.forEach((h, idx) => {
          const dLng = toRad(h.lng - centerLng);
          const lat1 = toRad(centerLat);
          const lat2 = toRad(h.lat);
          // cosine of angular distance to the center of the visible hemisphere
          const cosC =
            Math.sin(lat1) * Math.sin(lat2) +
            Math.cos(lat1) * Math.cos(lat2) * Math.cos(dLng);
          if (cosC <= 0.05) return; // hidden on the far side
          const projected = projection([h.lng, h.lat]);
          if (!projected) return;
          const visibility = Math.min(1, (cosC - 0.05) / 0.35); // fade near edge
          const phase = (now / 1400 + idx * 0.17) % 1; // 0 → 1 loop
          const pulseRadius = (2 + phase * 14) * scaleFactor;
          const pulseAlpha = (1 - phase) * 0.55 * visibility;

          // outer pulse
          context.beginPath();
          context.arc(projected[0], projected[1], pulseRadius, 0, 2 * Math.PI);
          context.strokeStyle = `rgba(96, 165, 250, ${pulseAlpha})`;
          context.lineWidth = 1.2 * scaleFactor;
          context.stroke();

          // secondary lagging ring
          const phase2 = (phase + 0.5) % 1;
          const pulseRadius2 = (2 + phase2 * 14) * scaleFactor;
          const pulseAlpha2 = (1 - phase2) * 0.35 * visibility;
          context.beginPath();
          context.arc(projected[0], projected[1], pulseRadius2, 0, 2 * Math.PI);
          context.strokeStyle = `rgba(167, 139, 250, ${pulseAlpha2})`;
          context.lineWidth = 1 * scaleFactor;
          context.stroke();

          // core dot
          context.shadowColor = "rgba(139, 92, 246, 0.9)";
          context.shadowBlur = 4 * scaleFactor;
          context.beginPath();
          context.arc(
            projected[0],
            projected[1],
            2.4 * scaleFactor,
            0,
            2 * Math.PI,
          );
          context.fillStyle = `rgba(186, 230, 253, ${0.95 * visibility})`;
          context.fill();
          context.shadowBlur = 0;

          // inner bright center
          context.beginPath();
          context.arc(
            projected[0],
            projected[1],
            1 * scaleFactor,
            0,
            2 * Math.PI,
          );
          context.fillStyle = `rgba(255, 255, 255, ${visibility})`;
          context.fill();
        });
      }
    };

    const loadWorldData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/master/110m/physical/ne_110m_land.json"
        );
        if (!response.ok) throw new Error("Failed to load land data");
        landFeatures = await response.json();

        landFeatures.features.forEach((feature) => {
          const dots = generateDotsInPolygon(
            feature,
            window.innerWidth < 768 ? 55 : 42
          );
          dots.forEach(([lng, lat]) => {
            allDots.push({ lng, lat });
          });
        });

        render();
        setIsLoading(false);
      } catch (err) {
        console.error("GLOBE ERROR:", err);
        setError(err?.message || "Failed to load globe data");
        setIsLoading(false);
      }
    };

    const rotation = [0, -8];
    let rotating = autoRotate;
    const rotationSpeed = 0.04;

    // const rotate = () => {
    //   if (rotating) {
    //     rotation[0] += rotationSpeed;
    //     projection.rotate(rotation);
    //   }
    //   // Always re-render so hotspot pulses animate even when not rotating
    //   render();
    // };
    let frameId;
    let lastFrame = 0;

    const animate = (time) => {
      if (time - lastFrame > 50) {
        // 30 FPS

        if (rotating) {
          rotation[0] += rotationSpeed;
          projection.rotate(rotation);
        }

        render();
        lastFrame = time;
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    // const rotationTimer = d3.timer(rotate);

    const handleMouseDown = (event) => {
      if (!interactive) return;
      rotating = false;
      const startX = event.clientX;
      const startY = event.clientY;
      const startRotation = [...rotation];

      const handleMouseMove = (moveEvent) => {
        const sensitivity = 0.4;
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;
        rotation[0] = startRotation[0] + dx * sensitivity;
        rotation[1] = Math.max(
          -85,
          Math.min(85, startRotation[1] - dy * sensitivity),
        );
        projection.rotate(rotation);
        render();
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        setTimeout(() => {
          if (autoRotate) rotating = true;
        }, 600);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    if (interactive) canvas.addEventListener("mousedown", handleMouseDown);

    loadWorldData();

    return () => {
      cancelAnimationFrame(frameId);
    
      if (interactive) {
        canvas.removeEventListener(
          "mousedown",
          handleMouseDown
        );
      }
    };
  }, [width, height, autoRotate, interactive, hotspots, primaryColor]);

  return (
    <div
      ref={wrapperRef}
      data-testid="rotating-earth"
      className={`relative w-full h-full flex items-center justify-center ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="block max-w-full h-auto cursor-grab active:cursor-grabbing"
        style={{ touchAction: "none" }}
      />
      {isLoading && !error && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Calibrating AI graph…
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-red-400">
          {error}
        </div>
      )}
    </div>
  );
}
