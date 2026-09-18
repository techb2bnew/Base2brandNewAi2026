/**
 * Rocket - the Base2Brand emblem distilled into a subtle vector mark.
 * Inspired by the rocket sitting on the "2" of the BASE2BRAND logo.
 * Use sparingly — orbital ornaments, journey paths, CTA accents.
 *
 * Props:
 *   size    - css size string (default 24)
 *   color   - body color (default white)
 *   flame   - flame color (default Base2Brand purple)
 *   className
 */
const Rocket = ({
  size = 24,
  color = "#ffffff",
  flame = "#8B5CF6",
  className = "",
  ...rest
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      {/* Body */}
      <path
        d="M12 1.5 C 9 5 7 9 7 14 L7 21 L 17 21 L17 14 C 17 9 15 5 12 1.5 Z"
        fill={color}
      />
      {/* Window */}
      <circle cx="12" cy="11.5" r="1.6" fill={flame} fillOpacity="0.9" />
      {/* Side fins */}
      <path d="M7 17 L 4 22 L 7 21 Z" fill={color} fillOpacity="0.9" />
      <path d="M17 17 L 20 22 L 17 21 Z" fill={color} fillOpacity="0.9" />
      {/* Flame */}
      <path
        d="M9 21 L 12 30 L 15 21 Z"
        fill={flame}
        fillOpacity="0.95"
      />
      <path
        d="M10.5 21 L 12 26 L 13.5 21 Z"
        fill="#ffffff"
        fillOpacity="0.4"
      />
    </svg>
  );
};

export default Rocket;
