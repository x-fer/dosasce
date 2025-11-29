import MovingIconBackground from "@/components/background/moving-icon-background";
import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import QueryProvider from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/toaster";
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
          "flex min-h-screen flex-col",
        )}
      >
        <MovingIconBackground />

        <QueryProvider>
          <Header />
          <main className="flex h-full grow flex-col overflow-x-hidden overscroll-contain">
            {children}
          </main>
          <Footer />
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
