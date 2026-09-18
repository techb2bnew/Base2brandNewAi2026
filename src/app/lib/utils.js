import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// "#8B5CF6" -> "139, 92, 246" — used to drive CSS custom properties like
// --b2b-primary-rgb from a single hex color input (e.g. the page builder's
// page-wide theme color).
export function hexToRgbString(hex) {
  const clean = (hex || "").replace("#", "").trim();
  const full = clean.length === 3
    ? clean.split("").map((c) => c + c).join("")
    : clean.padEnd(6, "0").slice(0, 6);
  const int = parseInt(full, 16) || 0;
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `${r}, ${g}, ${b}`;
}

function mixHexToward(hex, target, amount) {
  const clean = (hex || "").replace("#", "").trim();
  const full = clean.length === 3
    ? clean.split("").map((c) => c + c).join("")
    : clean.padEnd(6, "0").slice(0, 6);
  const int = parseInt(full, 16) || 0;
  const channels = [(int >> 16) & 255, (int >> 8) & 255, int & 255];
  const mixed = channels.map((c) => Math.round(c + (target - c) * amount));
  return `#${mixed.map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}

// Derive a lighter/darker tint of a single hex color by blending it toward
// white/black. Used so the whole app can be driven off one "primary" color
// while still having the light/dark accents the designs expect, instead of
// separate hardcoded shades per component.
export const lightenHex = (hex, amount = 0.35) => mixHexToward(hex, 255, amount);
export const darkenHex = (hex, amount = 0.25) => mixHexToward(hex, 0, amount);
