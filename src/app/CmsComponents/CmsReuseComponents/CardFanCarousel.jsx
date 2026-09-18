"use client";

import { useCallback, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

/**
 * CardFanCarousel — the interactive "fan of cards" stage: click a card (or
 * use the arrow controls / left-right arrow keys) to bring it to center,
 * with the rest fanning out behind it. Pure widget — no header, no section
 * wrapper, no data of its own; the caller (e.g. MissionDossierFan) supplies
 * `cards` and a `renderCard(card, index, { isCenter }) => ReactNode` to
 * render each one, and owns the surrounding layout.
 */
export const CardFanCarousel = ({ cards = [], renderCard }) => {
    const [index, setIndex] = useState(0);
    const reduced = useReducedMotion();
    const total = cards.length;

    const goTo = useCallback(
        (next) => {
            if (!total) return;
            const n = ((next % total) + total) % total;
            setIndex(n);
        },
        [total],
    );

    const handleKey = (e) => {
        if (e.key === "ArrowLeft") goTo(index - 1);
        if (e.key === "ArrowRight") goTo(index + 1);
    };

    if (!total) return null;

    return (
        <div>
            {/* Fan stage */}
            <div
                tabIndex={0}
                onKeyDown={handleKey}
                className="relative mx-auto h-[440px] sm:h-[480px] focus:outline-none"
                style={{ maxWidth: 1100 }}
                role="region"
                aria-label="Cards carousel"
            >
                {cards.map((card, i) => {
                    const offset = i - index;
                    const distance = Math.abs(offset);
                    const rotate = offset * 8;
                    const xPercent = offset * 12;
                    const y = distance * 14;
                    const scale = distance === 0 ? 1 : distance === 1 ? 0.96 : 0.9;
                    const opacity = distance > 3 ? 0 : 1 - distance * 0.18;
                    const z = 100 - distance;
                    const isCenter = distance === 0;

                    return (
                        <m.button
                            key={card.id || card.key || i}
                            type="button"
                            onClick={() => goTo(i)}
                            aria-label={`Open ${card.title || `card ${i + 1}`}`}
                            className="absolute left-1/2 top-0"
                            style={{ zIndex: z }}
                            initial={false}
                            animate={{ x: `calc(-50% + ${xPercent}%)`, y, rotate, scale, opacity }}
                            transition={{
                                type: "spring",
                                stiffness: 220,
                                damping: 24,
                                mass: reduced ? 0 : 0.9,
                            }}
                            whileHover={!isCenter ? { y: y - 8, scale: scale + 0.01 } : undefined}
                        >
                            <div className="w-[320px] sm:w-[360px] h-[400px] sm:h-[440px]">
                                {renderCard?.(card, i, { isCenter })}
                            </div>
                        </m.button>
                    );
                })}
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-center gap-3">
                <button
                    type="button"
                    onClick={() => goTo(index - 1)}
                    data-testid="card-fan-prev"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.04] border border-white/12 hover:border-white/22 transition-colors duration-150"
                    aria-label="Previous"
                >
                    <ArrowLeft className="h-4 w-4" />
                </button>
                <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-white/55 min-w-[80px] text-center">
                    {(index + 1).toString().padStart(2, "0")} / {total.toString().padStart(2, "0")}
                </div>
                <button
                    type="button"
                    onClick={() => goTo(index + 1)}
                    data-testid="card-fan-next"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.04] border border-white/12 hover:border-white/22 transition-colors duration-150"
                    aria-label="Next"
                >
                    <ArrowRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

export default CardFanCarousel;
