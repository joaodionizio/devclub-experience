import Chrome from "@/components/Chrome";
import Nav from "@/components/Nav";
import ParticleHero from "@/components/ParticleHero";
import { TickerStats, LogoMarquee } from "@/components/Marquees";
import Manifesto from "@/components/Manifesto";
import EclipseEditor from "@/components/EclipseEditor";
import Playground from "@/components/Playground";
import Journey from "@/components/Journey";
import Courses from "@/components/Courses";
import TechGrid from "@/components/TechGrid";
import Bento from "@/components/Bento";
import Comparison from "@/components/Comparison";
import Platform from "@/components/Platform";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import TutorsBonus from "@/components/TutorsBonus";
import Market from "@/components/Market";
import GuaranteeFaq from "@/components/GuaranteeFaq";
import { FinalCta, Footer } from "@/components/FinalFooter";
import ScrambleEyebrows from "@/components/ScrambleEyebrows";
import AmbientColor from "@/components/AmbientColor";
import GridReveal from "@/components/GridReveal";

export default function Home() {
  return (
    <>
      <Chrome />
      <ScrambleEyebrows />
      <AmbientColor />
      <GridReveal />
      <Nav />
      <ParticleHero />
      <TickerStats />
      <LogoMarquee />
      <Manifesto />
      <EclipseEditor />
      <Playground />
      <Journey />
      <Courses />
      <TechGrid />
      <Bento />
      <Comparison />
      <Platform />
      <Projects />
      <Testimonials />
      <TutorsBonus />
      <Market />
      <GuaranteeFaq />
      <FinalCta />
      <Footer />
    </>
  );
}
