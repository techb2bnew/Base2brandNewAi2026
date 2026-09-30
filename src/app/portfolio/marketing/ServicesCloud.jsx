import SectionHeader from "./SectionHeader";
import { MONO, SECTION } from "./styles";

export default function ServicesCloud({ services, chapter = "07" }) {
  if (!services || !Array.isArray(services) || services.length === 0) {
    return null;
  }

  return (
    <section className={SECTION} id="services">
      <SectionHeader
        chapter={chapter}
        eyebrow="Capabilities"
        aside="Services Deployed"
        title="Core Services"
      />

      <div className="flex flex-wrap gap-2.5">
        {services.map((svc) => (
          <div
            className={`${MONO} inline-flex items-center gap-2 px-4 py-[9px] text-[11.5px] text-[var(--b2b-ink)] border border-[var(--b2b-line)] bg-[var(--b2b-glass-bg)] transition-[border-color,transform,color] duration-200 ease-in-out hover:border-[var(--b2b-primary)] hover:text-[var(--b2b-primary)] hover:-translate-y-px`}
            key={svc}
          >
            <span className="w-[5px] h-[5px] rounded-full bg-[var(--b2b-primary)]" />
            <span>{svc}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
