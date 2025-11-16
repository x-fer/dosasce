import { cn } from "@/lib/utils";
import { Icon } from "./icon";
import { Fragment } from "react/jsx-runtime";

const OneIconPattern = (
  <>
    <Icon icon="christmas-tree" />
    <Icon icon="christmas-ball" />
    <Icon icon="christmas-lights" />
    <Icon icon="christmas-hat" />
    <Icon icon="santa" />
    <Icon icon="snowflake" />
  </>
);

const IconRow = ({ direction }: { direction: "left" | "right" }) => {
  return (
    <div
      className={cn(
        "flex w-full whitespace-nowrap",
        direction === "left" ? "animate-marquee-left" : "animate-marquee-right",
      )}
      style={{ willChange: "transform" }}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <Fragment key={i}>{OneIconPattern}</Fragment>
      ))}
    </div>
  );
};

export default IconRow;
