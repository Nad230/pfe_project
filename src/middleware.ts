import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose'; // Import from the jose package

export async function middleware(request: Request) {
  // Get the cookie header from the request
  const cookieHeader = request.headers.get('cookie');
  const token = cookieHeader?.split(';').find((cookie) => cookie.trim().startsWith('token='))?.split('=')[1];

  // Log the token to confirm it's being correctly retrieved
  console.log('Token from cookies:', token);

  // Check if token exists and is valid
  if (token) {
    try {
      // Verify the token using jose
      const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));

      return NextResponse.next(); // Token is valid, allow access to the page
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Invalid token:', error.message); // Log error if the token is invalid
      }
    }
  }

  // Define special pages where users can access without authentication (login, signup, etc.)
  const isLoginPage = request.url.startsWith('/auth');
  const isForgotPage = request.url.startsWith('/forgot-password');
  const isResetPage = request.url.startsWith('/reset-password');

  // Allow the request to proceed if it's a special page or the user has a valid token
  if (isLoginPage || isForgotPage || isResetPage) {
    return NextResponse.next(); // Allow the request to proceed
  }

  // If the user is not logged in and trying to access a protected page, redirect to login
  const url = new URL('/auth', request.url); // Correct way to clone and modify the URL
  return NextResponse.redirect(url);
}

// Configuration for middleware
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
