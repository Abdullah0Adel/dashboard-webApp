// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en'
});

// الـ routes اللي محتاجة login
const protectedRoutes = ['/dashboard', '/products', '/settings'];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  // شيل الـ locale من الـ path عشان تقدر تقارن
  // يعني /en/dashboard تبقى /dashboard
  const pathnameWithoutLocale = pathname.replace(/^\/(en|ar)/, '') || '/';

  const isProtected = protectedRoutes.some(route =>
    pathnameWithoutLocale.startsWith(route)
  );

  const isAuthPage = pathnameWithoutLocale.startsWith('/login');

  // لو محتاج login ومفيش token → روح login
  if (isProtected && !token) {
    const loginUrl = new URL(`/login`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  // لو عنده token وراح login → روح dashboard
  if (isAuthPage && token) {
    const dashboardUrl = new URL(`/dashboard`, request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // في الحالتين التانيتين → خلي next-intl يكمل شغله
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(en|ar)/:path*']
};