import { cn } from "@/lib/utils";

export function MissionDossierCard({
    code = "DOSSIER-01",
    title,
    body,
    accent = "MISSION PLANNING",
    phase = "MISSION PHASE",
    channel = "CHANNEL A · LOCKED",
    active = false,
    className,
    image,
}) {
    const phaseNumber = code.split("-")[1] || "01";

    return (
        <div
            className={cn(
                "relative h-full w-full rounded-3xl text-left",
                "bg-gradient-to-b from-[#0F1112] to-[#0A0B0C]",
                "border shadow-[0_18px_60px_rgba(0,0,0,0.55)]",
                "overflow-hidden p-4 md:p-6",
                active ? "border-white/22" : "border-white/10",
                className,
            )}
        >
            {!image && (
                <>
                    <span
                        aria-hidden
                        className="absolute top-3 left-3 h-3 w-3 border-t border-l border-white/30"
                    />
                    <span
                        aria-hidden
                        className="absolute top-3 right-3 h-3 w-3 border-t border-r border-white/30"
                    />
                    <span
                        aria-hidden
                        className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-white/30"
                    />
                    <span
                        aria-hidden
                        className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-white/30"
                    />
                </>
            )}

            {active && (
                <span
                    aria-hidden
                    className="absolute -inset-px rounded-3xl pointer-events-none"
                    style={{
                        boxShadow:
                            "0 0 0 1px rgba(255,255,255,0.18), 0 0 56px rgba(255,255,255,0.08)",
                    }}
                />
            )}

            {!image && (
                <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/55 shrink-0">
                        {code}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.04] border border-white/10 px-2 py-0.5 min-w-0">
                        <span
                            aria-hidden
                            className="h-1 w-1 rounded-full bg-[color:var(--b2b-primary)] shrink-0"
                            style={{
                                boxShadow: "0 0 8px rgba(var(--b2b-primary-rgb),0.55)",
                            }}
                        />
                        <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.14em] uppercase text-white/70 leading-none">
                            {accent}
                        </span>
                    </span>
                </div>
            )}

            {image && (
                <div className="relative mt-1 h-48 md:h-52 -mx-2 md:-mx-4 w-[calc(100%+1rem)] md:w-[calc(100%+2rem)] overflow-hidden rounded-t-xl">
                    <img
                        src={image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>
            )}

            <div className={cn(image ? "mt-4" : "mt-10")}>
                {!image && (
                    <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/45">
                        {phase}
                    </p>
                )}
                <h3 className="mt-3 font-display text-2xl sm:text-[28px] font-[650] tracking-[-0.025em] leading-[1.1] text-white">
                    {title}
                </h3>
                <p className="mt-4 text-sm text-white/65 leading-relaxed">
                    {body}
                </p>
            </div>

            {!image && (
                <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between gap-3">
                    <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/45">
                        T+{phaseNumber.padStart(2, "0")}:00
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/45 text-right">
                        {channel}
                    </span>
                </div>
            )}
        </div>
    );
}

export default MissionDossierCard;
