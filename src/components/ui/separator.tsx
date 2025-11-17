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
    snowflakes: `${svgStart}%3Cg fill='none' stroke='${color}' stroke-width='1.3' stroke-linecap='round' stroke-linejoin='round' transform='translate(2,1) scale(0.75)'%3E%3Cpath d='m10 20-1.25-2.5L6 18'/%3E%3Cpath d='M10 4 8.75 6.5 6 6'/%3E%3Cpath d='m14 20 1.25-2.5L18 18'/%3E%3Cpath d='m14 4 1.25 2.5L18 6'/%3E%3Cpath d='m17 21-3-6h-4'/%3E%3Cpath d='m17 3-3 6 1.5 3'/%3E%3Cpath d='M2 12h6.5L10 9'/%3E%3Cpath d='m20 10-1.5 2 1.5 2'/%3E%3Cpath d='M22 12h-6.5L14 15'/%3E%3Cpath d='m4 10 1.5 2L4 14'/%3E%3Cpath d='m7 21 3-6-1.5-3'/%3E%3Cpath d='m7 3 3 6h4'/%3E%3C/g%3E${svgEnd}`,
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
