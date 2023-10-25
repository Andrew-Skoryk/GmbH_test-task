import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'cookie';

export default function middleware(request: NextRequest) {
  const cookies = parse(request.headers.get('cookie') || '');

  if (!cookies.isAuthenticated || cookies.isAuthenticated !== 'true') {
    return NextResponse.rewrite(new URL('/', request.url));
  }

  return NextResponse.next();
}




export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
