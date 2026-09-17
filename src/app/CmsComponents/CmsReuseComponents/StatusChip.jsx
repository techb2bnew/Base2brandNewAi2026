/**
 * StatusChip — small themed pill badge (e.g. a count label next to a
 * section header). Uses the shared page theme, not a fixed color.
 */
const StatusChip = ({ children, className = "" }) => (
    <span
        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[11px] tracking-[0.18em] uppercase ${className}`}
        style={{
            borderColor: "rgba(var(--b2b-primary-rgb),0.35)",
            backgroundColor: "rgba(var(--b2b-primary-rgb),0.08)",
            color: "var(--b2b-primary-light)",
        }}
    >
        <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: "var(--b2b-primary)" }}
        />
        {children}
    </span>
);

export default StatusChip;
