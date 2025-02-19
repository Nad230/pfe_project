// app/layout.tsx (Server Component)
import type { Metadata } from "next";
import RootLayout from "./root-layout"; // Move RootLayout to another file

export const metadata: Metadata = {
  title: "IndieTracker - Financial Management for Solopreneurs",
  description: "Track your indie business finances with ease",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout>{children}</RootLayout>;
}
