import Hero from "@/components/sections/hero";
import Timeline from "@/components/sections/timeline";
import Separator from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="z-20 flex min-h-screen flex-col items-center">
      <Hero />

      <Separator />

      <Timeline />

      <Separator />
    </main>
  );
}
