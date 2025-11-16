import MovingIconBackground from "@/components/background/moving-icon-background";
import "@styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"antialiased"}>
        <MovingIconBackground />
        {children}
      </body>
    </html>
  );
}
