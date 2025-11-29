import Hero from "@/components/sections/hero";
import Timeline from "@/components/sections/timeline";
import About from "@/components/sections/about";
import Organizers from "@/components/sections/organizers";
import Contact from "@/components/sections/contact";
import FAQ from "@/components/sections/faq";
import Separator from "@/components/ui/separator";

export default function Home() {
  return (
    <>
      <Hero />

      <Separator variant="circles" />

      <Timeline />

      <Separator variant="christmas-tree" />

      <About />

      <Separator variant="crosses" />

      <Organizers />

      <Separator variant="snowflake" />

      <Contact />

      <Separator variant="candy-cane" />

      <FAQ />
    </>
  );
}
