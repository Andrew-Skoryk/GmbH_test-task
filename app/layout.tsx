import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import { cn } from "./lib/utils";

export const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GmbH Test task",
  description: "Simple test task to show skill level in Next JS, Redux",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn("antialiased min-h-screen", inter.className)}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
