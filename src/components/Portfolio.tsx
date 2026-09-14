"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PROJECTS, PROJECT_FILTERS } from "@/data/projects";
import { clsx } from "@/lib/clsx";
import { EASE } from "@/lib/motion";
import { useAutoScroll } from "@/lib/useAutoScroll";
import type { ProjectCategory, ProjectSpan } from "@/lib/types";

type Filter = ProjectCategory | "all";

/** Editorial footprint per card — only used while the "All" filter is active. */
const SPAN_CLASSES: Record<ProjectSpan, string> = {
  wide: "lg:col-span-8",
  narrow: "lg:col-span-4",
  full: "lg:col-span-12",
};

export function Portfolio() {
  const [filter, setFilter] = useState<Filter>("all");
  const reduceMotion = useReducedMotion();
  const railRef = useAutoScroll<HTMLDivElement>();

  // A new filter renders a different set — start it back at the first card.
  useEffect(() => {
    railRef.current?.scrollTo({ left: 0 });
  }, [filter, railRef]);

  const visibleProjects = PROJECTS.filter(
    (project) => filter === "all" || project.category === filter,
  );

  return (
    <section
      id="work"
      className="border-t border-line bg-white py-20 sm:py-28 lg:py-32"
    >
      <Container>
        <Reveal>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <SectionLabel>Selected work</SectionLabel>
              <h2 className="type-h2 mt-5 text-ink">Projects we&apos;ve built.</h2>
            </div>
            <p className="type-lead max-w-[46ch] text-muted lg:pb-2">
              From business platforms to high-converting landing pages, we build
              digital experiences designed for real-world use.
            </p>
          </div>
        </Reveal>

        {/* Filters — horizontally scrollable on small screens */}
        <Reveal delay={0.08}>
          <div className="no-scrollbar -mx-5 mt-10 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            <div
              role="tablist"
              aria-label="Filter projects by type"
              className="inline-flex min-w-max items-center gap-1.5 rounded-xl border border-line bg-surface p-1.5"
            >
              {PROJECT_FILTERS.map((option) => {
                const isActive = filter === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setFilter(option.value)}
                    className={clsx(
                      "relative rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200",
                      isActive
                        ? "text-white"
                        : "text-muted hover:text-ink",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="portfolio-filter-pill"
                        aria-hidden="true"
                        className="absolute inset-0 rounded-lg bg-ink"
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 380, damping: 32 }
                        }
                      />
                    ) : null}
                    <span className="relative">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Mobile: an auto-advancing swipe rail. sm+: the editorial grid. */}
        <motion.div
          ref={railRef}
          layout={!reduceMotion}
          className={clsx(
            "no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory scroll-pl-5 gap-5 overflow-x-auto px-5 pb-1",
            "sm:mx-0 sm:mt-10 sm:grid sm:snap-none sm:overflow-visible sm:px-0 sm:pb-0",
            "lg:grid-cols-12 lg:gap-6",
          )}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleProjects.map((project) => {
              // Filtered views drop the editorial rhythm for an even two-up grid.
              const spanClass =
                filter === "all"
                  ? SPAN_CLASSES[project.span]
                  : "lg:col-span-6";
              // The closing full-width card gets a distinct side-by-side layout.
              const isSplit = filter === "all" && project.span === "full";

              return (
                <motion.div
                  key={project.id}
                  layout={!reduceMotion}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.97 }
                  }
                  transition={{ duration: 0.4, ease: EASE }}
                  className={clsx(
                    "w-[86%] shrink-0 snap-start sm:w-auto",
                    spanClass,
                  )}
                >
                  <ProjectCard
                    project={project}
                    layout={isSplit ? "split" : "stacked"}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {visibleProjects.length === 0 ? (
          <p className="mt-10 text-center text-muted">
            No projects in this category yet.
          </p>
        ) : null}
      </Container>
    </section>
  );
}
