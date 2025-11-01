import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yeschef - Get your weekly food sorted",
  description:
    "Yeschef is an app that helps you figure out what to eat this week.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground`}>
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
