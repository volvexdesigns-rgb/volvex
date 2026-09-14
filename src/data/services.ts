import {
  Boxes,
  CodeXml,
  PenTool,
  Smartphone,
  TrendingUp,
  UserCog,
  Users,
} from "lucide-react";
import type { Service } from "@/lib/types";

export const SERVICES: Service[] = [
  {
    id: "web-development",
    number: "01",
    title: "Web Development",
    description: "Fast, secure and scalable websites and web applications.",
    icon: CodeXml,
  },
  {
    id: "mobile-app-development",
    number: "02",
    title: "Mobile App Development",
    description: "High-quality mobile experiences for iOS and Android.",
    icon: Smartphone,
  },
  {
    id: "ui-ux-design",
    number: "03",
    title: "UI/UX Design",
    description: "Simple, intuitive interfaces designed around real users.",
    icon: PenTool,
  },
  {
    id: "erp-solutions",
    number: "04",
    title: "ERP Solutions",
    description: "Connected systems for inventory, finance and operations.",
    icon: Boxes,
  },
  {
    id: "crm-systems",
    number: "05",
    title: "CRM Systems",
    description: "Manage leads, sales pipelines and customer relationships.",
    icon: Users,
  },
  {
    id: "hrms",
    number: "06",
    title: "HRMS",
    description: "Simplify attendance, payroll, leave and employee management.",
    icon: UserCog,
  },
  {
    id: "digital-marketing",
    number: "07",
    title: "Digital Marketing",
    description:
      "Performance-focused marketing designed to generate measurable growth.",
    icon: TrendingUp,
  },
];

/** Options for the "What do you need?" field on the project brief form. */