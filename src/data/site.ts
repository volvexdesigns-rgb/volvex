import type { NavItem } from "@/lib/types";

/**
 * Used for canonical + OG URLs. Point this at the live domain — note that
 * volvex.ai belongs to an unrelated company (Volvex AI Oy), not to us.
 */
export const SITE_URL = "https://volvexdesigns.vercel.app";

export const SITE_NAME = "Volvex Designs";

export const SITE_TAGLINE = "Digital products, business systems & growth.";

export const SITE_DESCRIPTION =
  "Volvex Designs builds web platforms, mobile apps, and business systems, then runs the marketing that grows them. One team, end to end.";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/#home", id: "home" },
  { label: "Services", href: "/#services", id: "services" },
  { label: "Work", href: "/#work", id: "work" },
  { label: "Process", href: "/#process", id: "process" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

export const CONTACT = {
  /** Public-facing address — also the inbox that receives project briefs. */
  email: "volvexdesigns@gmail.com",
  /** Listed in order; the first is treated as the primary line. */
  phones: ["+91 95671 58313", "+91 99470 32403"],
  location: "Kannur, India",
};

/** Builds a dialable `tel:` href from a display-formatted number. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/** Pre-filled opener for WhatsApp chats started from the site. */
export const WHATSAPP_MESSAGE =
  "Hi Volvex Designs — I'd like to talk about a project.";

/**
 * Builds a wa.me link. WhatsApp expects the full international number as
 * digits only — no "+", spaces or dashes.
 */
export function whatsappHref(
  phone: string,
  message: string = WHATSAPP_MESSAGE,
): string {
  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(
    message,
  )}`;
}

/** Live social profiles. Add an entry here and give it an icon in SocialIcons.tsx. */
export const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/volvex.ai_" },
] as const;

export const FOOTER_SERVICES = [
  "Web Development",
  "Mobile Apps",
  "UI/UX Design",
  "ERP",
  "CRM",
  "HRMS",
  "Digital Marketing",
];

export const FOOTER_COMPANY: NavItem[] = [
  { label: "Work", href: "/#work", id: "work" },
  { label: "Process", href: "/#process", id: "process" },
  { label: "Contact", href: "/#contact", id: "contact" },
];
