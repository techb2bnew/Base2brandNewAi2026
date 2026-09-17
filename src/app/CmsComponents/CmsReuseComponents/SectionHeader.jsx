import ShiningText from "./ShiningText";

/**
 * SectionHeader — eyebrow + title + subtitle, matching the header pattern
 * used elsewhere (Narrative, WhyBase2Brand): a ShiningText eyebrow above a
 * themed headline and a muted description line.
 */
const SectionHeader = ({ eyebrow, title, subtitle, className = "" }) => (
    <div className={className}>
        {eyebrow && <ShiningText>{eyebrow}</ShiningText>}
        <h2 className="mt-3 sm:mt-4 font-display text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight max-w-3xl text-balance">
            {title}
        </h2>
        {subtitle && (
            <p className="mt-3 text-sm sm:text-base text-white/55 leading-relaxed">
                {subtitle}
            </p>
        )}
    </div>
);

export default SectionHeader;
