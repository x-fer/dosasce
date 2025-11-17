import MovingIconBackground from "@/components/background/moving-icon-background";
import { cn } from "@/lib/utils";
import "@styles/globals.css";
import { Albert_Sans, Fira_Code } from "next/font/google";

const albertSans = Albert_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-albert-sans",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  style: ["normal"],
  variable: "--font-fira-code",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr" dir="ltr">
      <body
        className={cn(
          "font-sans antialiased",
          albertSans.variable,
          firaCode.variable,
        )}
      >
        <MovingIconBackground />
        {children}
      </body>
    </html>
  );
}
