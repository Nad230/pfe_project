"use client";

import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { Navigation } from '@/components/navigation';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const isAuthPage = pathname?.startsWith('/auth');

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );

    if (token) {
      // Try to validate token here, set authenticated state accordingly
      // For now, we'll just assume the token exists if it is in cookies.
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    // Redirect to login if not authenticated and not on an auth page
    if (!isAuthPage && isAuthenticated === false) {
      router.push('/auth');
    }
  }, [isAuthenticated, isAuthPage, router]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background">
            {/* Only show navigation if the user is authenticated */}
            {!isAuthPage && isAuthenticated && <Navigation />}
            <main className={!isAuthPage ? "container mx-auto px-4 py-4" : ""}>
              {children}
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
