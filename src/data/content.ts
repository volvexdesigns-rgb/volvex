import {
  BarChart3,
  BrainCircuit,
  Bug,
  ClipboardList,
  Compass,
  Gauge,
  Handshake,
  KeyRound,
  Layers,
  LayoutTemplate,
  MessageSquare,
  PenLine,
  Rocket,
  Search,
  TrendingUp,
  Wrench,
} from "lucide-react";
import type {
  Differentiator,
  Faq,
  ProcessStep,
  Stat,
  TeamMember,
  ValueProp,
} from "@/lib/types";

export const VALUE_PROPS: ValueProp[] = [
  {
    number: "01",
    title: "Build",
    description:
      "Websites, web applications, mobile apps and custom digital products.",
    icon: Layers,
  },
  {
    number: "02",
    title: "Systems",
    description:
      "ERP, CRM and HRMS solutions that simplify business operations.",
    icon: Gauge,
  },
  {
    number: "03",
    title: "Grow",
    description:
      "Digital marketing focused on traffic, leads and measurable growth.",
    icon: TrendingUp,
  },
];

export const DIFFERENTIATORS: Differentiator[] = [
  {
    title: "One team, end to end",
    description:
      "Design, development, systems and marketing under one roof.",
    icon: Handshake,
  },
  {
    title: "You own everything",
    description:
      "Your code, accounts, hosting, analytics and design files remain yours.",
    icon: KeyRound,
  },
  {
    title: "Direct communication",
    description: "Talk directly with the people building your product.",
    icon: MessageSquare,
  },
  {
    title: "Support after launch",
    description: "We continue to monitor, maintain and improve your product.",
    icon: Wrench,
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Understand",
    description: "We learn your business, goals and challenges.",
    icon: Compass,
  },
  {
    number: "02",
    title: "Design",
    description: "We create wireframes and prototypes before development.",
    icon: PenLine,
  },
  {
    number: "03",
    title: "Build",
    description: "We develop your product in focused sprints.",
    icon: Layers,
  },
  {
    number: "04",
    title: "Launch & Improve",
    description:
      "We launch, monitor performance and continuously improve.",
    icon: Rocket,
  },
];

/**
 * Update the `value` fields here and every stat on the page follows.
 */
export const STATS: Stat[] = [
  { value: "25+", label: "Projects Delivered" },
  { value: "18+", label: "Clients Served" },
  { value: "4+", label: "Years Building Software" },
  { value: "100%", label: "Client Retention" },
];

/**
 * The team. Drop a headshot into `public/images/team/` and set `photo` to
 * swap each card's portrait placeholder for the real thing.
 */
export const TEAM: TeamMember[] = [
  {
    id: "founder-1",
    name: "Ashfaque Thuyyadi",
    role: "Co-Founder / Software Engineer",
    icon: Compass,
    photo: "/images/team/founder-1.jpeg",
    isPlaceholder: false,
  },
  {
    id: "founder-2",
    name: "Muhammed Sinan",
    role: "Co-Founder / Software Engineer",
    icon: Rocket,
    photo: "/images/team/founder-2.jpeg",
    isPlaceholder: false,
  },
  {
    id: "data-analyst",
    name: "Abdul Kader",
    role: "Data Analyst",
    icon: BarChart3,
    photo: "/images/team/data-analyst.jpeg",
    isPlaceholder: false,
  },
  {
    id: "ml-engineer",
    name: "Raees Kasim",
    role: "AI & ML Engineer",
    icon: BrainCircuit,
    photo: "/images/team/ml-engineer.jpeg",
    isPlaceholder: false,
  },
  {
    id: "wordpress-developer",
    name: "Fathima Sharin",
    role: "WordPress Developer",
    icon: LayoutTemplate,
    photo: "/images/team/fathima%20sharin.jpeg",
    isPlaceholder: false,
  },
  {
    id: "digital-strategist",
    name: "Shaziya",
    role: "Digital Strategist & SEO Specialist",
    icon: Search,
    photo: "/images/team/shaziya.jpeg",
    isPlaceholder: false,
  },
  {
    id: "project-manager",
    name: "Anirudh KP",
    role: "Project Manager",
    icon: ClipboardList,
    photo: "/images/team/anirudh%20kp.jpeg",
    isPlaceholder: false,
  },
  {
    id: "qa-tester",
    name: "Rameesa Ramzan",
    role: "QA & Tester",
    icon: Bug,
    photo: "/images/team/rameesa.jpeg",
    isPlaceholder: false,
  },
];

export const FAQS: Faq[] = [
  {
    question: "How much does a project cost?",
    answer:
      "Cost depends on scope, not on a price list. Once we understand what you need, we send a fixed proposal with the deliverables, milestones and price written down before any work starts — so there are no moving numbers halfway through.",
  },
  {
    question: "How long does a project take?",
    answer:
      "A focused landing page moves far quicker than a multi-module business system. We give you a realistic timeline with milestone dates in the proposal, and we commit to it rather than estimating loosely and revising later.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "We pick the stack that fits the product, your team and your budget instead of forcing every project through the same tools. The exact technologies, hosting and integrations are confirmed with you in writing before we build.",
  },
  {
    question: "Do you work with clients remotely?",
    answer:
      "Yes. We work with clients remotely as standard, with scheduled calls, shared progress updates and a direct line to the people building your product.",
  },
  {
    question: "Who owns the code?",
    answer:
      "You do. Your code, repositories, accounts, hosting, analytics and design files are handed over and stay yours — there is no lock-in that forces you to keep working with us.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Launch is a milestone, not the finish line. We monitor performance, fix issues, maintain the product and keep improving it based on how real users actually behave.",
  },
  {
    question: "Can you take over an existing project?",
    answer:
      "Often, yes. We start with a review of the existing code, systems and accounts, then tell you honestly what can be built on and what is better rebuilt before we quote the work.",
  },
  {
    question: "Do I need to use all your services?",
    answer:
      "No. Plenty of clients start with one piece — a website, a system, or the marketing — and add more later. You engage only the parts you actually need.",
  },
];
