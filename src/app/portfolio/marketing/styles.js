// Shared Tailwind class strings for the Marketing case-study components.
// Theme tokens (--b2b-*) come from the active `.theme-*` class (see lib/themes.js + globals.css).

export const MONO = "font-[family-name:var(--b2b-font-mono)]";
export const FAINT = "text-[color-mix(in_srgb,var(--b2b-mute)_65%,transparent)]";
export const ACCENT_DIM = "color-mix(in_srgb,var(--b2b-primary)_40%,transparent)";
export const PANEL_TINT = "color-mix(in_srgb,var(--b2b-primary)_3%,var(--b2b-bg-2))";

export const SECTION = "pt-11 pb-2.5 border-t border-[var(--b2b-line)]";

export const CARD = "border border-[var(--b2b-line)] bg-[var(--b2b-glass-bg)] backdrop-blur-md";
export const CARD_LIFT =
  "transition-[border-color,transform] duration-200 ease-in-out hover:border-[color-mix(in_srgb,var(--b2b-primary)_40%,transparent)] hover:-translate-y-0.5";

export const BTN =
  `${MONO} inline-flex items-center gap-2 text-xs font-semibold tracking-[0.05em] uppercase ` +
  "border border-transparent px-[22px] py-[13px] transition-[transform,box-shadow,background,border-color,color] duration-200 ease-in-out";
export const BTN_SOLID =
  "bg-[var(--b2b-primary)] text-[var(--b2b-on-primary)] hover:-translate-y-0.5 " +
  "hover:shadow-[0_10px_28px_-8px_color-mix(in_srgb,var(--b2b-primary)_55%,transparent)]";
export const BTN_GHOST =
  "bg-transparent border-[var(--b2b-line-strong)] text-[var(--b2b-ink)] " +
  "hover:border-[var(--b2b-primary)] hover:text-[var(--b2b-primary)]";

export const RESULT_BOX =
  `${MONO} flex items-center gap-2 px-3 py-2.5 text-[11.5px] font-semibold text-[var(--b2b-primary)] ` +
  "bg-[color-mix(in_srgb,var(--b2b-primary)_5%,transparent)] border border-[color-mix(in_srgb,var(--b2b-primary)_40%,transparent)]";
export const LIVE_DOT =
  "inline-block w-1.5 h-1.5 rounded-full bg-[var(--b2b-primary)] shadow-[0_0_6px_var(--b2b-primary)]";
