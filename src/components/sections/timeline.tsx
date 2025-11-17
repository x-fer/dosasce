import { cn } from "@/lib/utils";
import Image from "next/image";

type TimelineCardProps = {
  name: string;
  startDate: Date;
  endDate?: Date;
  left?: boolean;
  image?: string;
  location?: string;
};

function TimelineCard(props: TimelineCardProps) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center md:w-[768px]",
        props.left ? "md:flex-row-reverse md:justify-start" : "md:justify-end",
      )}
    >
      {/* Fixed width container for images - same width as card (320px = w-80) */}
      <div className="mx-14 hidden w-80 shrink-0 md:block">
        {props.image && (
          <Image
            src={props.image}
            alt={props.name}
            width={320}
            height={320}
            className="h-auto w-full"
          />
        )}
      </div>

      <div className="relative h-64 w-8 shrink-0">
        <div
          className={cn(
            "bg-dosasce-red absolute top-1/2 -mt-1 -ml-1 h-2 w-8",
            props.left ? "left-2 md:right-2 md:left-auto" : "left-2",
          )}
        />

        <div className="bg-dosasce-red absolute left-1/2 -ml-1 h-full w-2" />

        <div className="bg-dosasce-red absolute top-1/2 left-1/2 -mt-4 -ml-4 h-8 w-8 rounded-full shadow-xl">
          <div className="bg-dosasce-white absolute top-1/2 left-1/2 -mt-2 -ml-2 h-4 w-4 rounded-full" />
        </div>
      </div>

      <div className="bg-dosasce-red h-2 w-12 shrink-0" />

      <div className="border-dosasce-red bg-dosasce-white flex h-48 w-80 shrink-0 flex-col items-center justify-center rounded-3xl border-8 p-4">
        <h1 className="mb-2 font-serif text-5xl">{props.name}</h1>

        <p className="font-sans text-2xl">
          {props.endDate ? "od " : ""}
          {props.startDate.toLocaleDateString("hr", {
            day: "numeric",
            month: "numeric",
          })}
        </p>

        {props.endDate && (
          <p className="font-sans text-2xl">
            do{" "}
            {props.endDate.toLocaleDateString("hr", {
              day: "numeric",
              month: "numeric",
            })}
          </p>
        )}

        {props.location && (
          <p className="text-center font-sans text-lg">{props.location}</p>
        )}
      </div>
    </div>
  );
}

export default function Timeline() {
  // TODO: Update these dates for 2025
  const zadatak1 = {
    startDate: new Date(2025, 11, 14), // December 14, 2025
    endDate: new Date(2025, 11, 16, 19, 0), // December 16, 2025, 19:00
  };

  const zadatak2 = {
    startDate: new Date(2025, 11, 16, 19, 0), // December 16, 2025, 19:00
    endDate: new Date(2025, 11, 18, 19, 0), // December 18, 2025, 19:00
  };

  const zadatak3 = {
    startDate: new Date(2025, 11, 18, 19, 0), // December 18, 2025, 19:00
    endDate: new Date(2025, 11, 21, 19, 0), // December 21, 2025, 19:00
  };

  const dodjela = {
    startDate: new Date(2025, 11, 21, 19, 15), // December 21, 2025, 19:15
  };

  return (
    <section id="timeline" className="bg-dosasce-white w-full">
      <div className="bg-snow-pattern relative flex flex-col items-center justify-center px-4 py-16">
        <TimelineCard
          name="Zadatak 1"
          startDate={zadatak1.startDate}
          endDate={zadatak1.endDate}
          image="/assets/images/mistletoe.png"
          left
        />
        <TimelineCard
          name="Zadatak 2"
          startDate={zadatak2.startDate}
          endDate={zadatak2.endDate}
          image="/assets/images/snowman.png"
        />
        <TimelineCard
          name="Zadatak 3"
          startDate={zadatak3.startDate}
          endDate={zadatak3.endDate}
          image="/assets/images/trees.png"
          left
        />
        <TimelineCard
          name="Dodjela"
          startDate={dodjela.startDate}
          image="/assets/images/presents.png"
          location="FER, Unska 3, A202, 19:15h"
        />
      </div>
    </section>
  );
}
