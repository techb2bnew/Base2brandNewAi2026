import Container from "./CmsReuseComponents/Container";
import SectionHeader from "./CmsReuseComponents/SectionHeader";
import Reveal from "./CmsReuseComponents/Reveal";

/**
 * VideoContainer — "dashboard" framed video showcase. The video itself is
 * always hosted externally (Cloudinary) and referenced by URL — there's no
 * upload step here, `videoUrl` is just a plain text field in the registry.
 */
export const VideoContainer = ({
  eyebrow,
  title,
  subtitle,
  videoUrl,
}) => {
  return (
    <section
      data-testid="command-center"
      className="relative overflow-hidden border-t border-white/[0.06] py-12 md:py-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px circle at 20% 50%, rgba(var(--b2b-primary-rgb),0.08), rgba(5,5,5,0) 60%)",
        }}
      />

      <Container className="relative w-full">
        <div className="w-full">
          {/* Full-width heading area */}
          <div className="flex w-full flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <div className="w-full min-w-0 flex-1">
              <SectionHeader
                eyebrow={eyebrow}
                title={title}
                subtitle={subtitle}
              />
            </div>
          </div>

          {/* Full-width dashboard */}
          <Reveal delay={0.1} className="mt-10 block w-full">
            <div className="relative w-full overflow-hidden rounded-2xl border border-white/12 bg-[#0A0B0C] lg:rounded-3xl">
              {/* Dashboard top bar */}
              <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-white/[0.025] px-4 py-2.5 sm:px-5 sm:py-3 md:px-6">
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-2.5 shrink-0 rounded-full bg-[color:var(--b2b-primary)]"
                    style={{
                      boxShadow: "0 0 12px rgba(var(--b2b-primary-rgb),0.6)",
                    }}
                  />

                  <span className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-white/70 sm:text-[11px] sm:tracking-[0.22em]">
                    Base2Brand · Commerce Console
                  </span>
                </div>

                <div className="flex shrink-0 items-center gap-4 font-mono text-[9px] uppercase tracking-[0.14em] text-white/45 sm:text-[10px] sm:tracking-[0.18em]">
                  <span>UTC 14:08</span>
                  <span className="hidden sm:inline">v3.4.1</span>
                </div>
              </div>

              {/* Full-width video */}
              <div className="relative h-[220px] w-full overflow-hidden bg-[#070808] sm:h-[320px] md:h-[400px] lg:h-[500px] xl:h-[560px]">
                {videoUrl && (
                  <video
                    key={videoUrl}
                    src={videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full max-w-[100%] mx-auto object-cover"
                  />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
              </div>

              {/* Dashboard footer */}
              <div className="flex items-center justify-between gap-4 border-t border-white/10 bg-white/[0.025] px-4 py-2.5 sm:px-5 sm:py-3 md:px-6">
                <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/45 sm:text-[10px] sm:tracking-[0.22em]">
                  Console · Read-only preview
                </span>

                <span className="text-right font-mono text-[8px] uppercase tracking-[0.14em] text-white/45 sm:text-[10px] sm:tracking-[0.22em]">
                  Powered by Base2Brand
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export default VideoContainer;
