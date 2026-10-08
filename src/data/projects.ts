import type { Project, ProjectCategory } from "@/lib/types";

/**
 * Real Volvex Designs projects, with screenshots of the live sites in
 * `public/images/projects/`. Setting `image` back to `null` restores the
 * browser-frame placeholder for that card.
 */
export const PROJECTS: Project[] = [

  {
    id: "zingos",
    title: "Zingos",
    type: "Web Application",
    category: "web-apps",
    url: "https://www.zingos.in",
    domain: "www.zingos.in",
    description:
      "A web application for a fried chicken shop, designed to showcase the menu and provide customers with a convenient online ordering experience.",
    tags: ["Web App", "Food & Restaurant", "Online Ordering"],
    ctaLabel: "Visit Project",
    span: "wide",
    image: "/images/projects/zingos.jpg",
  },
  {
    id: "centurion-international-school",
    title: "Centurion International School",
    type: "Website",
    category: "websites",
    url: "https://www.cisb.ac.th",
    domain: "www.cisb.ac.th",
    description:
      "A modern school website designed to present the institution, programs and information through a clear digital experience.",
    tags: ["Website", "UI/UX", "Responsive Design"],
    ctaLabel: "Visit Website",
    span: "narrow",
    image: "/images/projects/centurion-international-school.png",
  },
  {
    id: "azzu-dop",
    title: "Azzu DOP",
    type: "Website",
    category: "websites",
    url: "https://azzu-dop.vercel.app",
    domain: "azzu-dop.vercel.app",
    description:
      "A cinematic portfolio website for a Dubai-based photographer and cinematographer, built to showcase showreels and visual work.",
    tags: ["Portfolio Website", "UI/UX", "Responsive Design"],
    ctaLabel: "Visit Website",
    span: "narrow",
    image: "/images/projects/azzu.png",
  },
  {
    id: "dock-media-school",
    title: "Dock Media School",
    type: "Landing Page",
    category: "landing-pages",
    url: "https://www.dockmediaschool.com",
    domain: "www.dockmediaschool.com",
    description:
      "A visually engaging landing page designed to communicate the school's offering and create a strong first impression.",
    tags: ["Landing Page", "UI/UX", "Responsive Design"],
    ctaLabel: "Visit Project",
    span: "wide",
    image: "/images/projects/dock-media-school.png",
  },
  {
    id: "anfocus-events",
    title: "Anfocus Events",
    type: "Landing Page",
    category: "landing-pages",
    url: "https://event.anfocus.in",
    domain: "event.anfocus.in",
    description:
      "A dedicated event landing page designed to promote the event and guide visitors toward booking and conversion.",
    tags: ["Landing Page", "Event", "Conversion"],
    ctaLabel: "Visit Project",
    span: "full",
    image: "/images/projects/anfocus-events.png",
  },
  {
    id: "anfocus",
    title: "Anfocus",
    type: "Web Application",
    category: "web-apps",
    url: "https://www.anfocus.in",
    domain: "www.anfocus.in",
    description:
      "A custom web application built to support business operations and digital workflows.",
    tags: ["Web App", "Full Stack", "Business Platform"],
    ctaLabel: "Visit Project",
    span: "wide",
    image: "/images/projects/anfocus.png",
  },
];

export const PROJECT_FILTERS: { label: string; value: ProjectCategory | "all" }[] =
  [
    { label: "All", value: "all" },
    { label: "Web Apps", value: "web-apps" },
    { label: "Websites", value: "websites" },
    { label: "Landing Pages", value: "landing-pages" },
  ];
