'use client'

import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from './../../components/theme-provider';
import { Toaster } from './../../components/ui/sonner';
import { Header } from './components/Header';  // Import Header Component
import { usePathname } from 'next/navigation';  // Use usePathname from next/navigation

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get the current page route using usePathname
  const pathname = usePathname();

  // Function to check if the user is logged in based on the cookies
  const isLoggedIn = () => {
    // List of authentication cookies
    const authCookies = [
      'access_token',
      'refresh_token',
      'sb-zfuqbectykxdfclljtxd-auth-token.0',
      'sb-zfuqbectykxdfclljtxd-auth-token.1',
      'supabase.auth.token',
      'supabase.auth.refresh_token'
    ];

    // Check if any of the cookies exist
    return authCookies.some(cookie => document.cookie.includes(cookie));
  };

  // Check if the current page is the login page
  const isLoginPage = pathname === '/login'; // Adjust this to your actual login path

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
            {/* Only render Header if logged in and not on the login page */}
            {isLoggedIn() && !isLoginPage && <Header />}
            
            <main className="container mx-auto px-4 py-4">
              {children}
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
