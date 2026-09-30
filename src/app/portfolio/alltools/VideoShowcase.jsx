"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const GRID_THRESHOLD = 3;

const videosData = [
  {
    id: 1,
    project: "",
    video_url:
      "https://res.cloudinary.com/htkvsu4t/video/upload/v1790683778/42.mp4",
  },
  {
    id: 2,
    project: "",
    video_url:
      "https://res.cloudinary.com/htkvsu4t/video/upload/v1790688152/Emily-into_new.mp4",
  },
];

export default function VideoShowcase() {
  const isGrid = videosData.length < GRID_THRESHOLD;

  const stageRef = useRef(null);
  const slideRefs = useRef([]);
  const videoRefs = useRef({});

  // Which card is currently hovered/focused
  const [activeId, setActiveId] = useState(
    isGrid ? null : videosData[0]?.id ?? null
  );

  // Which video was explicitly clicked by the user
  const [soundId, setSoundId] = useState(null);

  /*
   * Carousel mode:
   * Detect currently visible slide.
   */
  useEffect(() => {
    if (isGrid) return;

    const stage = stageRef.current;

    if (!stage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let best = null;

        entries.forEach((entry) => {
          if (
            !best ||
            entry.intersectionRatio > best.intersectionRatio
          ) {
            best = entry;
          }
        });

        if (best && best.intersectionRatio > 0.5) {
          setActiveId(Number(best.target.dataset.id));
        }
      },
      {
        root: stage,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    slideRefs.current.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [isGrid]);

  /*
   * IMPORTANT:
   *
   * Hover/scroll autoplay = MUTED
   * Click playback = can have SOUND
   */
  useEffect(() => {
    videosData.forEach((item) => {
      const video = videoRefs.current[item.id];

      if (!video) return;

      const isActive = item.id === activeId;
      const hasSound = item.id === soundId;

      if (isActive) {
        /*
         * First play MUTED.
         *
         * This is allowed by browser autoplay policies.
         */
        video.muted = true;

        const playPromise = video.play();

        if (
          playPromise &&
          typeof playPromise.catch === "function"
        ) {
          playPromise.catch(() => {});
        }
      } else if (!hasSound) {
        video.pause();

        try {
          video.currentTime = 0;
        } catch {}
      }
    });
  }, [activeId, soundId]);

  /*
   * Hover start
   */
  const handleEnter = useCallback((id) => {
    setActiveId(id);

    /*
     * Do not enable sound on hover.
     * Browser may reject unmuted autoplay.
     */
    setSoundId(null);

    const video = videoRefs.current[id];

    if (!video) return;

    video.muted = true;

    const playPromise = video.play();

    if (
      playPromise &&
      typeof playPromise.catch === "function"
    ) {
      playPromise.catch(() => {});
    }
  }, []);

  /*
   * Hover end
   */
  const handleLeave = useCallback((id) => {
    setSoundId((current) =>
      current === id ? null : current
    );

    if (isGrid) {
      setActiveId((current) =>
        current === id ? null : current
      );
    }
  }, [isGrid]);

  /*
   * CLICK = real user gesture.
   *
   * This is where we allow sound.
   */
  const handleTapToggle = useCallback((event, id) => {
    event.stopPropagation();

    const video = videoRefs.current[id];

    if (!video) return;

    const currentlyPlayingWithSound = soundId === id;

    if (currentlyPlayingWithSound) {
      /*
       * Click again:
       * pause and remove sound state.
       */
      video.pause();
      video.muted = true;

      setSoundId(null);

      return;
    }

    /*
     * User explicitly clicked.
     * This is a valid gesture for media playback.
     */
    setActiveId(id);
    setSoundId(id);

    video.muted = false;

    const playPromise = video.play();

    if (
      playPromise &&
      typeof playPromise.catch === "function"
    ) {
      playPromise.catch(() => {
        /*
         * If browser still rejects unmuted playback,
         * fall back to muted playback.
         */
        video.muted = true;

        const fallback = video.play();

        if (
          fallback &&
          typeof fallback.catch === "function"
        ) {
          fallback.catch(() => {});
        }
      });
    }
  }, [soundId]);

  const renderCard = (item, index) => {
    const isFocused = item.id === activeId;
    const isPlayingWithSound = item.id === soundId;

    const indexLabel = String(
      item.id ?? index + 1
    ).padStart(2, "0");

    return (
      <div
        key={item.id}
        className={`reels__card${
          isFocused ? " is-active" : ""
        }`}
        onMouseEnter={() => handleEnter(item.id)}
        onMouseLeave={() => handleLeave(item.id)}
      >
        <video
          ref={(element) => {
            videoRefs.current[item.id] = element;
          }}
          src={item.video_url}
          className="reels__video"
          muted
          loop
          playsInline
          preload="metadata"
        />

        <button
          type="button"
          className={`reels__play-btn${
            isPlayingWithSound ? " is-playing" : ""
          }`}
          onClick={(event) =>
            handleTapToggle(event, item.id)
          }
          aria-label={
            isPlayingWithSound
              ? "Pause video"
              : "Play video with sound"
          }
        >
          {isPlayingWithSound ? (
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              aria-hidden="true"
            >
              <rect
                x="6"
                y="5"
                width="4"
                height="14"
                fill="currentColor"
              />
              <rect
                x="14"
                y="5"
                width="4"
                height="14"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              aria-hidden="true"
            >
              <path
                d="M7 4.5v15l13-7.5-13-7.5z"
                fill="currentColor"
              />
            </svg>
          )}
        </button>

        <div className="reels__overlay">
          <span className="reels__index">
            {indexLabel}
          </span>

          {item.project && (
            <span className="reels__project">
              {item.project}
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <section
      className="video-showcase max-w-7xl mx-auto"
      id="video-showcase"
    >
      <div className="section-head">
        <p className="eyebrow">
          <span className="eyebrow__chapter">
            Ch.08
          </span>{" "}
          Video showcase
        </p>

        <span className="section-head__aside">
          {isGrid
            ? "Hover a card to play"
            : "Scroll to browse // hover a card to play"}
        </span>
      </div>

      <h2 className="section-title">
        Work, in motion.
      </h2>

      {isGrid ? (
        <div className="reels reels--grid">
          {videosData.map((item, index) =>
            renderCard(item, index)
          )}
        </div>
      ) : (
        <div className="reels">
          <div
            className="reels__stage"
            ref={stageRef}
          >
            {videosData.map((item, index) => {
              const prev =
                videosData[
                  (index - 1 + videosData.length) %
                    videosData.length
                ];

              const next =
                videosData[
                  (index + 1) % videosData.length
                ];

              return (
                <div
                  className="reels__slide"
                  key={item.id}
                  data-id={item.id}
                  ref={(element) => {
                    slideRefs.current[index] = element;
                  }}
                >
                  <div
                    className="reels__peek reels__peek--prev"
                    aria-hidden="true"
                  >
                    <video
                      src={prev.video_url}
                      muted
                      playsInline
                      preload="metadata"
                    />
                  </div>

                  {renderCard(item, index)}

                  <div
                    className="reels__peek reels__peek--next"
                    aria-hidden="true"
                  >
                    <video
                      src={next.video_url}
                      muted
                      playsInline
                      preload="metadata"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}