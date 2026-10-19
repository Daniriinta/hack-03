import type { Metadata } from "next";
import "./globals.css";
import { Shell } from "@/components/shell";

export const metadata: Metadata = {
  title: "Forest Guardian | Chiang Mai",
  description: "Forest conservation intelligence for Chiang Mai.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Shell>{children}</Shell></body></html>;
}
