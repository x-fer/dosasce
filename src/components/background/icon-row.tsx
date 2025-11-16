import { cn } from "@/lib/utils";
import { Icon } from "./icon";

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
    >
      {OneIconPattern}
      {OneIconPattern}
      {OneIconPattern}
      {OneIconPattern}
    </div>
  );
};

export default IconRow;
