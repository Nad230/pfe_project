// app/root-layout.tsx (Client Component)
"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Navigation } from "@/components/navigation";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { I18nProvider } from "@/lib/i18n/context";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const isAuthPage = pathname.startsWith("/auth");

  useEffect(() => {
    if (isAuthPage) return; // Don't check auth on login/signup pages
    const token = Cookies.get("token");
    setIsAuthenticated(!!token);
  }, [isAuthPage]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <I18nProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="min-h-screen bg-background">
              {!isAuthPage && isAuthenticated && <Navigation />}
              <main className={isAuthPage ? "" : "container mx-auto px-4 py-4"}>
                {children}
              </main>
            </div>
            <Toaster />
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
