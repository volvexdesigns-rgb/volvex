"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { TEAM } from "@/data/content";
import { clsx } from "@/lib/clsx";
import type { TeamMember } from "@/lib/types";
import { useAutoScroll } from "@/lib/useAutoScroll";

/**
 * Portrait placeholder shown until a real headshot is dropped into
 * `public/images/team/`. It names the exact path the file should take.
 */
function PortraitPlaceholder({ member }: { member: TeamMember }) {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-3 bg-surface px-4 text-center">
      <span
        aria-hidden="true"
        className="grid size-11 place-items-center rounded-xl border border-line bg-white"
      >
        <member.icon strokeWidth={1.5} className="size-5 text-brand-deep" />
      </span>
      <p className="text-[0.6875rem] leading-relaxed text-muted-2">
        Add a photo at
        <br />
        <span className="text-brand-deep">/images/team/{member.id}.jpeg</span>
      </p>
    </div>
  );
}

export function Team() {
  const railRef = useAutoScroll<HTMLDivElement>();

  return (
    <section
      id="team"
      className="border-t border-line bg-white py-20 sm:py-28 lg:py-32"
    >
      <Container>
        <Reveal className="max-w-2xl lg:mx-auto lg:text-center">
          <SectionLabel className="lg:text-center">Our team</SectionLabel>
          <h2 className="type-h2 mt-5 text-ink">The people behind the work</h2>
          <p className="type-lead mt-6 text-muted">
            A small senior team — strategy, engineering, data and delivery under
            one roof.
          </p>
        </Reveal>

        {/* Mobile: an auto-advancing swipe rail. sm+: the portrait grid. */}
        <Stagger
          ref={railRef}
          stagger={0.07}
          className={clsx(
            "no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory scroll-pl-5 gap-5 overflow-x-auto px-5 pb-1",
            "sm:mx-0 sm:mt-16 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0",
            "lg:grid-cols-4 lg:gap-6",
          )}
        >
          {TEAM.map((member) => (
            <StaggerItem
              key={member.id}
              className="w-[70%] shrink-0 snap-start sm:w-auto"
            >
              <article
                className={clsx(
                  "group flex h-full flex-col overflow-hidden rounded-[20px] border transition-[border-color,transform] duration-400 hover:-translate-y-1",
                  member.photo
                    ? "border-line bg-white hover:border-brand/35"
                    : "border-dashed border-line bg-surface",
                )}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden border-b border-line bg-surface">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={`${member.name} — ${member.role}`}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  ) : (
                    <PortraitPlaceholder member={member} />
                  )}
                </div>

                <div className="p-5 sm:p-6">
                  <p
                    className={clsx(
                      "text-base font-semibold",
                      member.isPlaceholder ? "text-muted-2" : "text-ink",
                    )}
                  >
                    {member.name}
                  </p>
                  <p className="mt-1 text-[0.8125rem] leading-snug text-muted">
                    {member.role}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
