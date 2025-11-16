import { cn } from "@/lib/utils";
import { Icon } from "./icon";

const IconRow = ({ direction }: { direction: "left" | "right" }) => {
  return (
    <div
      className={cn(
        "flex h-[100px] w-full whitespace-nowrap",
        direction === "left" ? "animate-marquee-left" : "animate-marquee-right",
      )}
    >
      <Icon
        icon="christmas-tree"
        className="bg-dosasce-light-red"
        size={"100px"}
      />
      <Icon
        icon="christmas-ball"
        className="bg-dosasce-light-red"
        size={"100px"}
      />
      <Icon
        icon="christmas-lights"
        className="bg-dosasce-light-red"
        size={"100px"}
      />
      <Icon
        icon="christmas-hat"
        className="bg-dosasce-light-red"
        size={"100px"}
      />
      <Icon icon="santa" className="bg-dosasce-light-red" size={"100px"} />
      <Icon icon="snowflake" className="bg-dosasce-light-red" size={"100px"} />
      <Icon
        icon="christmas-tree"
        className="bg-dosasce-light-red"
        size={"100px"}
      />
      <Icon
        icon="christmas-ball"
        className="bg-dosasce-light-red"
        size={"100px"}
      />
      <Icon
        icon="christmas-lights"
        className="bg-dosasce-light-red"
        size={"100px"}
      />
      <Icon
        icon="christmas-hat"
        className="bg-dosasce-light-red"
        size={"100px"}
      />
      <Icon icon="santa" className="bg-dosasce-light-red" size={"100px"} />
      <Icon icon="snowflake" className="bg-dosasce-light-red" size={"100px"} />
      <Icon
        icon="christmas-tree"
        className="bg-dosasce-light-red"
        size={"100px"}
      />
      <Icon
        icon="christmas-ball"
        className="bg-dosasce-light-red"
        size={"100px"}
      />
      <Icon
        icon="christmas-lights"
        className="bg-dosasce-light-red"
        size={"100px"}
      />
      <Icon
        icon="christmas-hat"
        className="bg-dosasce-light-red"
        size={"100px"}
      />
      <Icon icon="santa" className="bg-dosasce-light-red" size={"100px"} />
      <Icon icon="snowflake" className="bg-dosasce-light-red" size={"100px"} />
      <Icon
        icon="christmas-tree"
        className="bg-dosasce-light-red"
        size={"100px"}
      />
      <Icon
        icon="christmas-ball"
        className="bg-dosasce-light-red"
        size={"100px"}
      />
      <Icon
        icon="christmas-lights"
        className="bg-dosasce-light-red"
        size={"100px"}
      />
      <Icon
        icon="christmas-hat"
        className="bg-dosasce-light-red"
        size={"100px"}
      />
      <Icon icon="santa" className="bg-dosasce-light-red" size={"100px"} />
      <Icon icon="snowflake" className="bg-dosasce-light-red" size={"100px"} />
      <Icon
        icon="christmas-tree"
        className="bg-dosasce-light-red"
        size={"100px"}
      />
      <Icon
        icon="christmas-ball"
        className="bg-dosasce-light-red"
        size={"100px"}
      />
      <Icon
        icon="christmas-lights"
        className="bg-dosasce-light-red"
        size={"100px"}
      />
      <Icon
        icon="christmas-hat"
        className="bg-dosasce-light-red"
        size={"100px"}
      />
      <Icon icon="santa" className="bg-dosasce-light-red" size={"100px"} />
      <Icon icon="snowflake" className="bg-dosasce-light-red" size={"100px"} />
    </div>
  );
};

export default IconRow;
