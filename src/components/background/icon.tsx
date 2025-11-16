import { cn } from "@/lib/utils";
import ChristmasBall from "./icons/christmas-ball.svg";
import ChristmasHat from "./icons/christmas-hat.svg";
import ChristmasLights from "./icons/christmas-lights.svg";
import ChristmasTree from "./icons/christmas-tree.svg";
import Santa from "./icons/santa.svg";
import Snowflake from "./icons/snowflake.svg";

const icons = {
  "christmas-ball": ChristmasBall,
  "christmas-hat": ChristmasHat,
  "christmas-lights": ChristmasLights,
  "christmas-tree": ChristmasTree,
  santa: Santa,
  snowflake: Snowflake,
} as const;

export type IconName = keyof typeof icons;

export const Icon = ({
  icon,
  size,
  className,
}: {
  icon: IconName;
  size?: string | number;
  className?: string;
}) => {
  return (
    <div
      className={cn("transition-all duration-200 ease-in", className)}
      style={{
        height: size ? size : "24px",
        minHeight: size ? size : "24px",
        width: size ? size : "24px",
        minWidth: size ? size : "24px",
        WebkitMaskImage: `url('${icons[icon]}')`,
        maskImage: `url('${icons[icon]}')`,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        WebkitMaskPosition: "center center",
        maskRepeat: "no-repeat",
      }}
    />
  );
};

export default Icon;
