'use server';

import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const protectedRoots = ['/dashboard'];

export const middleware = async (request: NextRequest) => {
  const requestPathname = request.nextUrl.pathname;
  const accessToken = (await cookies()).get('access_token')?.value;
  const decodedAccessToken = accessToken ? jwtDecode(accessToken) : { exp: 0 };
  const now = Math.floor(new Date().getTime() / 1000);
  const tokenIsExpired = now > decodedAccessToken?.exp!;
  const isProtectedRoot = protectedRoots.some(protectedRoot => requestPathname.startsWith(protectedRoot));
  const isLoginRoot = requestPathname.startsWith('/auth');
  switch (true) {
    case isLoginRoot:
      if (accessToken && !tokenIsExpired) return NextResponse.redirect(new URL('/', request.url));
      break;
    case isProtectedRoot:
      if (!accessToken || tokenIsExpired) return NextResponse.redirect(new URL('/auth/login', request.url));
      break;
  }
  return NextResponse.next();
};

export const config = {
  matcher: ['/auth/:path*', '/dashboard/:path*'],
};
