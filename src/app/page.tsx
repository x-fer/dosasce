import Hero from "@/components/sections/hero";
import Timeline from "@/components/sections/timeline";
import About from "@/components/sections/about";
import Organizers from "@/components/sections/organizers";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";
import Separator from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="z-20 flex min-h-screen flex-col items-center">
      <Hero />

      <Separator variant="circles" />

      <Timeline />

      <Separator variant="christmas-tree" />

      <About />

      <Separator variant="crosses" />

      <Organizers />

      <Separator variant="snowflakes" />

      <Contact />

      <Separator variant="christmas-tree" />

      <Footer />
    </main>
  );
}
