import { cn, formatDateHR } from "@/lib/utils";
import Image from "next/image";
import { config } from "@problems/2025/config";

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
          {formatDateHR(props.startDate)}
        </p>

        {props.endDate && (
          <p className="font-sans text-2xl">do {formatDateHR(props.endDate)}</p>
        )}

        {props.location && (
          <p className="text-center font-sans text-lg">{props.location}</p>
        )}
      </div>
    </div>
  );
}

export default function Timeline() {
  const yearConfig = config;

  const timelineImages = [
    "/assets/images/mistletoe.png",
    "/assets/images/snowman.png",
    "/assets/images/trees.png",
    "/assets/images/presents.png",
  ];

  return (
    <section id="timeline" className="bg-dosasce-white w-full">
      <div className="bg-snow-pattern relative flex flex-col items-center justify-center px-4 py-16">
        {yearConfig.problems.map((problem, index) => {
          return (
            <TimelineCard
              key={problem.id}
              name={problem.title}
              startDate={problem.startDate}
              endDate={yearConfig.endTime}
              image={timelineImages[index]}
              left={index % 2 === 0}
            />
          );
        })}
        <TimelineCard
          name="Dodjela"
          startDate={yearConfig.awards.date}
          location={yearConfig.awards.location}
        />
      </div>
    </section>
  );
}
