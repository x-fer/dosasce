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
};

export type IconName = keyof typeof icons;

export const Icon = ({ icon }: { icon: IconName }) => {
  // Next.js returns SVG imports as objects with a 'src' property
  const iconSrc =
    typeof icons[icon] === "string" ? icons[icon] : (icons[icon] as any).src;

  // If you change the size, you need to change the animation in the animations.css file
  // 6 icons * 100px = 600px -> this part
  const size = "100px";
  return (
    <div
      className={"bg-dosasce-light-red transition-all duration-200 ease-in"}
      style={{
        height: size,
        minHeight: size,
        width: size,
        minWidth: size,
        WebkitMaskImage: `url('${iconSrc}')`,
        maskImage: `url('${iconSrc}')`,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        WebkitMaskPosition: "center center",
        maskRepeat: "no-repeat",
        maskSize: "contain",
        maskPosition: "center center",
      }}
    />
  );
};

export default Icon;
