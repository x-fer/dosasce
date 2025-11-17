"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const scrollToTimeline = () => {
    const timelineSection = document.getElementById("timeline");
    timelineSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex h-screen w-full items-center justify-center">
      <div className="flex flex-col justify-start gap-8 rounded-3xl p-8 pb-10 lg:flex-row lg:items-center lg:gap-36 lg:rounded-[60px] lg:p-12 lg:pr-10">
        <Image
          src="/assets/images/santa-logo-full.png"
          alt="Slika djeda božičnjaka"
          width={350}
          height={280}
          className="h-[240px] w-[300px] rounded-3xl object-cover select-none lg:h-[280px] lg:w-[350px]"
          priority
        />

        <div className="text-dosasce-red flex flex-col font-serif">
          <p className="text-xl lg:text-2xl">Dobrodošli na</p>
          <p className="mt-[-8px] text-5xl lg:mt-[-12px] lg:text-7xl">
            došašće++
          </p>
          <p className="text-lg lg:text-xl">
            Božićno natjecanje: Kodirajte čaroliju!
          </p>
        </div>
      </div>

      {/* Bouncing arrow */}
      <button
        onClick={scrollToTimeline}
        className="text-dosasce-red hover:text-dosasce-dark-red absolute bottom-2 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer transition-colors md:bottom-10"
        aria-label="Scroll to timeline"
      >
        <ChevronDown size={48} strokeWidth={3} />
      </button>
    </section>
  );
}
