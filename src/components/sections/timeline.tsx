"use client";

import { getYearConfig } from "@/config/utils";
import { cn, formatDateHR, getProblemLink } from "@/lib/utils";
import { Anchor } from "@/components/ui/anchor";

type TimelineBoxProps = {
  name: string;
  startDate: Date;
  endDate?: Date;
  location?: string;
  problemLink?: string;
  isOpen?: boolean;
};

function TimelineBox(props: TimelineBoxProps) {
  return (
    <div className="border-dosasce-red bg-dosasce-white z-20 my-8 flex h-40 w-56 shrink-0 flex-col items-center justify-center rounded-2xl border-6 p-2 md:my-12 md:h-48 md:w-64 md:rounded-3xl md:border-8 md:p-4">
      <h1 className="mb-2 font-serif text-4xl md:text-5xl">{props.name}</h1>

      {props.isOpen && props.problemLink ? (
        <Anchor
          href={props.problemLink}
          className="text-dosasce-red hover:text-dosasce-red/80 font-sans text-xl font-semibold underline transition-colors md:text-2xl"
        >
          Otvori zadatak
        </Anchor>
      ) : (
        <>
          {props.startDate && (
            <p className="font-sans text-xl md:text-2xl">
              od {formatDateHR(props.startDate)}
            </p>
          )}
          {props.endDate && (
            <p className="font-sans text-xl md:text-2xl">
              do {formatDateHR(props.endDate)}
            </p>
          )}
        </>
      )}

      {props.location && (
        <p className="text-center font-sans text-base md:text-lg">
          {props.location}
        </p>
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
  awards?: boolean;
  problemLink?: string;
  isOpen?: boolean;
};

function TimelineCard(props: TimelineCardProps) {
  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center gap-12 md:w-[768px] md:gap-16",
        props.left && "md:flex-row-reverse",
      )}
    >
      {/*Image on the left or right*/}
      {props.image && (
        <img src={props.image} className="my-8 hidden w-64 md:my-12 md:block" />
      )}

      {/* Vertical red line */}
      <div
        className={cn(
          "relative w-1.5 shrink-0 self-stretch md:w-2",
          props.awards && "md:hidden",
        )}
      >
        {props.awards ? (
          <>
            {/* Half-height vertical red line  */}
            <div className="bg-dosasce-red absolute top-0 right-0 bottom-1/2 left-0" />

            {/* Horizontal red line to the box (mobile only) */}
            <div className="bg-dosasce-red absolute top-1/2 right-0 h-1.5 w-12 translate-x-full -translate-y-1/2 md:hidden" />

            {/* Center circle (mobile only) */}
            <div className="bg-dosasce-red absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg md:hidden" />
            <div className="bg-dosasce-white absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full md:hidden" />
          </>
        ) : (
          <>
            {/* Vertical red line */}
            <div className="bg-dosasce-red absolute inset-0" />

            {/* Horizontal red line to the box */}
            <div
              className={cn(
                "bg-dosasce-red absolute top-1/2 h-1.5 w-12 -translate-y-1/2 md:h-2 md:w-16",
                props.left
                  ? "right-0 translate-x-full md:left-0 md:-translate-x-full"
                  : "right-0 translate-x-full",
              )}
            />

            {/* Center circle */}
            <div className="bg-dosasce-red absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg md:h-8 md:w-8 md:shadow-xl" />
            <div className="bg-dosasce-white absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full md:h-4 md:w-4" />
          </>
        )}
      </div>

      {/* Vertical line for awards on md+ screens - absolutely positioned so it doesn't affect centering */}
      {props.awards && (
        <div className="bg-dosasce-red absolute top-0 left-1/2 hidden h-1/2 w-2 -translate-x-1/2 md:block" />
      )}

      <TimelineBox
        name={props.name}
        startDate={props.startDate}
        endDate={props.endDate}
        location={props.location}
        problemLink={props.problemLink}
        isOpen={props.isOpen}
      />
    </div>
  );
}

export default function Timeline() {
  const yearConfig = getYearConfig(2025);
  const now = new Date();

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
        const isOpen = now >= problem.startDate && now <= problem.endTime;
        const problemLink = getProblemLink(
          yearConfig.year,
          problem.problem_num,
        );

        return (
          <TimelineCard
            key={problem.problem_num}
            name={"Zadatak " + problem.problem_num}
            startDate={problem.startDate}
            endDate={problem.endTime}
            image={timelineImages[index]}
            left={index % 2 === 0}
            problemLink={problemLink}
            isOpen={isOpen}
          />
        );
      })}

      <TimelineCard
        name="Dodjela"
        startDate={yearConfig.awards.date}
        location={yearConfig.awards.location}
        awards
      />
    </section>
  );
}
