import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SOCIAL_ICONS } from "@/components/ui/SocialIcons";
import {
  CONTACT,
  FOOTER_COMPANY,
  FOOTER_SERVICES,
  SITE_TAGLINE,
  SOCIALS,
} from "@/data/site";

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <Container>
        <div className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link
              href="/#home"
              aria-label="Volvex Designs — back to top"
              className="inline-block"
            >
              <Logo className="h-7" />
            </Link>
            <p className="mt-5 max-w-[30ch] text-[0.9375rem] leading-relaxed text-muted">
              {SITE_TAGLINE}
            </p>

            <ul className="mt-7 space-y-2.5 text-[0.875rem]">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex items-center gap-2.5 text-muted transition-colors hover:text-brand-deep"
                >
                  <Mail
                    aria-hidden="true"
                    strokeWidth={1.6}
                    className="size-4 text-brand"
                  />
                  {CONTACT.email}
                </a>
              </li>
              {CONTACT.location ? (
                <li className="inline-flex items-center gap-2.5 text-muted">
                  <MapPin
                    aria-hidden="true"
                    strokeWidth={1.6}
                    className="size-4 text-brand"
                  />
                  {CONTACT.location}
                </li>
              ) : null}
            </ul>
          </div>

          {/* Services */}
          <nav aria-labelledby="footer-services" className="lg:col-span-3">
            <h2
              id="footer-services"
              className="type-eyebrow text-muted-2"
            >
              Services
            </h2>
            <ul className="mt-5 space-y-3">
              {FOOTER_SERVICES.map((service) => (
                <li key={service}>
                  <Link
                    href="/#services"
                    className="text-[0.9375rem] text-muted transition-colors hover:text-brand-deep"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-labelledby="footer-company" className="lg:col-span-2">
            <h2 id="footer-company" className="type-eyebrow text-muted-2">
              Company
            </h2>
            <ul className="mt-5 space-y-3">
              {FOOTER_COMPANY.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="text-[0.9375rem] text-muted transition-colors hover:text-brand-deep"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div className="lg:col-span-3">
            <h2 className="type-eyebrow text-muted-2">Connect</h2>
            <ul className="mt-5 space-y-3">
              {SOCIALS.map((social) => {
                const Icon = SOCIAL_ICONS[social.label];
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2.5 text-[0.9375rem] text-muted transition-colors hover:text-brand-deep"
                    >
                      <Icon className="size-4 text-brand" />
                      {social.label}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>

            <Link
              href="/#contact"
              className="group mt-7 inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-[0.875rem] font-medium text-ink transition-colors duration-300 hover:border-brand/40 hover:bg-brand-mist"
            >
              Start a Project
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 text-brand transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-line py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8125rem] text-muted-2">
            © 2026 Volvex Designs. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[0.8125rem] text-muted-2 transition-colors hover:text-brand-deep"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
