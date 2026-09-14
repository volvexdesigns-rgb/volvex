import { Contact } from "@/components/Contact";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Portfolio } from "@/components/Portfolio";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { Stats } from "@/components/Stats";
import { Team } from "@/components/Team";
import { ValueProps } from "@/components/ValueProps";
import { WhyVolvex } from "@/components/WhyVolvex";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2.5 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <Header />

      <main id="main" className="flex-1">
        <Hero />
        <ValueProps />
        <Services />
        <Portfolio />
        <WhyVolvex />
        <Process />
        <Stats />
        <Team />
        <FAQ />
        <FinalCTA />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
