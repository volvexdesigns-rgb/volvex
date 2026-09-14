import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { DIFFERENTIATORS } from "@/data/content";
import { clsx } from "@/lib/clsx";

export function WhyVolvex() {
  return (
    <section className="border-t border-line bg-surface py-20 sm:py-28 lg:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Sticky editorial column */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="lg:sticky lg:top-32">
                <SectionLabel>Why Volvex</SectionLabel>
                <h2 className="type-h2 mt-5 text-ink">
                  Why choose Volvex Designs
                </h2>
                <p className="type-lead mt-6 max-w-[42ch] text-muted">
                  We don&apos;t just build what you&apos;re asked for. We help
                  you build what your business actually needs.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Alternating feature rows */}
          <div className="lg:col-span-7">
            <Stagger stagger={0.07}>
              {DIFFERENTIATORS.map((item, index) => {
                const Icon = item.icon;
                return (
                  <StaggerItem key={item.title}>
                    <div
                      className={clsx(
                        "group relative flex gap-5 border-b border-line py-7 transition-colors duration-300 sm:gap-7 sm:py-8",
                        index === 0 && "border-t",
                      )}
                    >
                      {/* Cyan rail that fills in on hover */}
                      <span
                        aria-hidden="true"
                        className="absolute -left-4 top-0 h-full w-0.5 origin-top scale-y-0 bg-brand transition-transform duration-500 group-hover:scale-y-100 sm:-left-6"
                      />

                      <div className="flex shrink-0 items-start gap-4">
                        <span className="w-6 pt-1 text-xs font-medium tracking-[0.18em] text-muted-2 transition-colors duration-300 group-hover:text-brand-deep">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-white transition-[border-color,background-color] duration-300 group-hover:border-brand/30 group-hover:bg-brand-mist">
                          <Icon
                            aria-hidden="true"
                            strokeWidth={1.5}
                            className="size-5 text-ink transition-colors duration-300 group-hover:text-brand-deep"
                          />
                        </span>
                      </div>

                      <div className="pt-0.5">
                        <h3 className="text-[1.0625rem] font-semibold uppercase tracking-[0.06em] text-ink">
                          {item.title}
                        </h3>
                        <p className="mt-2 max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </div>
      </Container>
    </section>
  );
}
