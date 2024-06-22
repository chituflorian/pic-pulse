import { Inter } from "next/font/google";
import * as React from "react";

import "../styles/globals.css";

import { cn } from "@/lib/utils";

import { TailwindIndicator } from "@/components/tailwind-indicator";

import Providers from "@/lib/react-query/Providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body
        className={cn(
          "bg-background flex h-screen antialiased",
          inter.className
        )}
      >
        <Providers>{children}</Providers>
        <TailwindIndicator />
      </body>
    </html>
  );
}
