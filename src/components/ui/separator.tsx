type SeparatorVariant = "circles" | "crosses" | "snowflakes" | "christmas-tree";

interface SeparatorProps {
  variant?: SeparatorVariant;
}

export default function Separator({ variant = "circles" }: SeparatorProps) {
  const svgStart = `url("data:image/svg+xml,%3Csvg width='24' height='20' viewBox='0 0 24 20' xmlns='http://www.w3.org/2000/svg'%3E`;
  const svgEnd = `/%3E%3C/svg%3E")`;
  const color = "%23e63047"; // #e63047 URL-encoded

  const patterns = {
    circles: `${svgStart}%3Ccircle cx='12' cy='10' r='5' fill='none' stroke='${color}' stroke-width='2'${svgEnd}`,
    crosses: `${svgStart}%3Cpath d='M 0 0 L 12 10 L 0 20 M 12 10 L 24 0 M 12 10 L 24 20' stroke='${color}' stroke-width='4' stroke-linejoin='miter' fill='none'${svgEnd}`,
    snowflakes: `${svgStart}%3Cpath d='M 12 3 L 12 17 M 12 5 L 10 7 M 12 5 L 14 7 M 12 15 L 10 13 M 12 15 L 14 13' stroke='${color}' stroke-width='1.5' stroke-linecap='round'/%3E%3Cpath d='M 6.5 6 L 17.5 14 M 8 6.5 L 7 8.5 M 8.5 8 L 6.5 8 M 16 12 L 17 14 M 15.5 12.5 L 17.5 12.5' stroke='${color}' stroke-width='1.5' stroke-linecap='round'/%3E%3Cpath d='M 6.5 14 L 17.5 6 M 8 13.5 L 7 11.5 M 8.5 12 L 6.5 12 M 16 8 L 17 6 M 15.5 7.5 L 17.5 7.5' stroke='${color}' stroke-width='1.5' stroke-linecap='round'${svgEnd}`,
    "christmas-tree": `${svgStart}%3Cpath d='M 6 2 L 10 9 L 8 9 L 12 15 L 9 15 L 14 20 L -2 20 L 3 15 L 0 15 L 4 9 L 2 9 Z' fill='${color}'/%3E%3Cpath d='M 18 2 L 22 9 L 20 9 L 24 15 L 21 15 L 26 20 L 10 20 L 15 15 L 12 15 L 16 9 L 14 9 Z' fill='${color}'${svgEnd}`,
  };

  return (
    <hr
      role="separator"
      aria-label={`Decorative separator with ${variant} pattern`}
      className="border-dosasce-red bg-dosasce-white z-20 h-5 w-full border-0 border-y-4 border-solid"
      style={{
        backgroundImage: patterns[variant],
        backgroundRepeat: "repeat-x",
        backgroundPosition: "center",
        backgroundSize: "24px 20px",
      }}
    />
  );
}
