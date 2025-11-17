import { cn, formatDateHR } from "@/lib/utils";
import { config } from "@problems/2025/config";

type TimelineBoxProps = {
  name: string;
  startDate: Date;
  endDate?: Date;
  location?: string;
};

function TimelineBox(props: TimelineBoxProps) {
  return (
    <div className="border-dosasce-red bg-dosasce-white my-8 flex h-48 w-64 shrink-0 flex-col items-center justify-center rounded-3xl border-8 p-4 md:my-12">
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
  );
}

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
        "flex w-full items-center justify-center gap-16 md:w-[768px]",
        props.left && "md:flex-row-reverse",
      )}
    >
      {/*Image on the left or right*/}
      {props.image && (
        <img src={props.image} className="my-8 hidden w-64 md:my-12 md:block" />
      )}

      {/* Vertical red line with center circle */}
      <div className="relative w-2 shrink-0 self-stretch">
        {/* Vertical red line */}
        <div className="bg-dosasce-red absolute inset-0" />

        {/* Horizontal red line to the box */}
        <div
          className={cn(
            "bg-dosasce-red absolute top-1/2 h-2 w-16 -translate-y-1/2",
            props.left
              ? "left-0 -translate-x-full"
              : "right-0 translate-x-full",
          )}
        />

        {/* Center circle */}
        <div className="bg-dosasce-red absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-xl" />
        <div className="bg-dosasce-white absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full" />
      </div>

      <TimelineBox
        name={props.name}
        startDate={props.startDate}
        endDate={props.endDate}
        location={props.location}
      />
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
    <section
      id="timeline"
      className="bg-dosasce-white bg-snow-pattern flex w-full flex-col items-center"
    >
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
      <TimelineBox
        name="Dodjela"
        startDate={yearConfig.awards.date}
        location={yearConfig.awards.location}
      />
    </section>
  );
}
