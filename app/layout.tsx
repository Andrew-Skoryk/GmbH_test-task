import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import { cn } from "./lib/utils";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "GmbH Test task",
  description: "Simple test task to show skill level in Next JS, Redux ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "antialiased min-h-screen font-sans",
            fontSans.variable
          )}
        >
          {children}
        </body>
      </html>
    </Provider>
  );
}
