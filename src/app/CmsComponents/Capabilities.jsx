"use client";

import { m } from "framer-motion";
import { Network, Workflow, AudioLines, Sparkles } from "lucide-react";

// capsData entries reference an icon by name; unknown names fall back to
// Sparkles so a typo in the CMS never breaks the render.
const Icons = { Network, Workflow, AudioLines };

const Card = ({ item, idx }) => {
    const Icon = Icons[item.icon] || Sparkles;
    const [lead, ...rest] = item.items || [];

    return (
        <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
            data-testid={`capability-card-${idx}`}
            className={`group relative rounded-2xl border backdrop-blur-sm p-7 overflow-hidden transition-colors ${item.span || "md:col-span-6"} ${item.accent
                    ? "border-[color:var(--b2b-primary)]/30 bg-[color:var(--b2b-primary)]/[0.06]"
                    : "border-white/[0.08] bg-white/[0.02]"
                }`}
        >
            <div className="flex items-center justify-between">
                <div
                    className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors"
                    style={{
                        borderColor: item.accent ? "rgba(var(--b2b-primary-rgb),0.4)" : "rgba(255,255,255,0.1)",
                        color: item.accent ? "var(--b2b-primary-light)" : "rgba(255,255,255,0.7)",
                    }}
                >
                    <Icon className="w-4.5 h-4.5" strokeWidth={1.6} />
                </div>
            </div>

            <h3 className="mt-6 font-display text-xl sm:text-2xl font-medium tracking-tight text-white">
                {item.title}
            </h3>

            {lead && (
                <p className="mt-3 text-[14px] leading-[1.6] text-white/60 max-w-md">{lead}</p>
            )}

            {rest.length > 0 && (
                <ul className="mt-5 space-y-2">
                    {rest.map((it) => (
                        <li key={it} className="flex items-start gap-2 text-[13px] text-white/50">
                            <span
                                className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                                style={{ backgroundColor: item.accent ? "var(--b2b-primary)" : "rgba(255,255,255,0.3)" }}
                            />
                            {it}
                        </li>
                    ))}
                </ul>
            )}

            {/* hairline accent */}
            <div className="absolute bottom-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-60" />
        </m.div>
    );
};

const Capabilities = ({ title, description, highlightTag, capsData = [] }) => {
    return (
        <section id="capabilities" className="relative py-12 md:py-16" data-testid="capabilities-section">
            <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 relative z-10">
                <div className="max-w-3xl">
                    {highlightTag && (
                        <div className="inline-flex items-center gap-2 mb-3" style={{ color: "var(--b2b-primary)" }}>
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--b2b-primary)" }} />
                            <span className="font-mono text-xs uppercase tracking-[0.3em]">{highlightTag}</span>
                        </div>
                    )}
                    <h2
                        data-testid="capabilities-heading"
                        className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white text-balance"
                    >
                        {title}
                    </h2>
                    {description && (
                        <p className="mt-4 text-sm md:text-base text-white/55 max-w-2xl">{description}</p>
                    )}
                </div>

                <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
                    {capsData.map((item, idx) => (
                        <Card key={item.title} item={item} idx={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export { Capabilities };
export default Capabilities;
