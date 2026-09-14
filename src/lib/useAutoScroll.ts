"use client";

import { useEffect, useRef, type RefObject } from "react";

/** Below this width the grids collapse into a swipeable rail — matches `sm:`. */
const MOBILE = "(max-width: 639px)";

interface AutoScrollOptions {
  /** ms each slide rests before the rail advances. */
  interval?: number;
  /** ms of quiet after the visitor takes over before auto-advance resumes. */
  resumeAfter?: number;
}

/**
 * Drives a horizontal scroll-snap rail one slide at a time, rewinding once the
 * last slide is reached. Attach the returned ref to the scroll container and
 * give its children `snap-start`.
 *
 * It deliberately stands down whenever moving the page would be unwelcome: off
 * the mobile breakpoint, under `prefers-reduced-motion`, while the section is
 * off-screen, and for a beat after any touch, drag or keyboard focus — so the
 * rail never yanks itself out from under someone reading it.
 */
export function useAutoScroll<T extends HTMLElement>({
  interval = 3600,
  resumeAfter = 7000,
}: AutoScrollOptions = {}): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isMobile = window.matchMedia(MOBILE);
    const prefersStill = window.matchMedia("(prefers-reduced-motion: reduce)");

    let timer: number | undefined;
    let heldUntil = 0;
    let onScreen = false;

    const advance = () => {
      if (!onScreen || Date.now() < heldUntil) return;

      const max = el.scrollWidth - el.clientWidth;
      if (max <= 1) return;

      // Reached the end — rewind rather than dead-ending on the last card.
      if (el.scrollLeft >= max - 1) {
        el.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      // Snap points sit at the scroll-padding edge, so measure the next slide
      // from there; scroll snapping absorbs any sub-pixel drift afterwards.
      const origin =
        el.getBoundingClientRect().left +
        (parseFloat(getComputedStyle(el).paddingLeft) || 0);
      const next = Array.from(el.children).find(
        (child) => child.getBoundingClientRect().left - origin > 4,
      );

      el.scrollBy({
        left: next ? next.getBoundingClientRect().left - origin : el.clientWidth,
        behavior: "smooth",
      });
    };

    const hold = () => {
      heldUntil = Date.now() + resumeAfter;
    };

    const sync = () => {
      window.clearInterval(timer);
      timer = undefined;
      if (isMobile.matches && !prefersStill.matches) {
        timer = window.setInterval(advance, interval);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
      },
      { threshold: 0.25 },
    );
    observer.observe(el);

    const handOver = ["pointerdown", "touchstart", "wheel", "focusin"] as const;
    handOver.forEach((type) =>
      el.addEventListener(type, hold, { passive: true }),
    );
    isMobile.addEventListener("change", sync);
    prefersStill.addEventListener("change", sync);
    sync();

    return () => {
      window.clearInterval(timer);
      observer.disconnect();
      handOver.forEach((type) => el.removeEventListener(type, hold));
      isMobile.removeEventListener("change", sync);
      prefersStill.removeEventListener("change", sync);
    };
  }, [interval, resumeAfter]);

  return ref;
}
