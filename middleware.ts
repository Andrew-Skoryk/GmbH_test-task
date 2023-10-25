import { NextRequest, NextResponse } from 'next/server';
import { store } from './app/lib/redux/store';

export default function middleware(request: NextRequest) {
  const state = store.getState();
  const currentPath = request.nextUrl.pathname;

  if (!state.auth.isAuthenticated) {
    if (currentPath !== "/") {
      return NextResponse.redirect('https://gmbh-test-task.vercel.app/');
    }
  } else {
    if (currentPath !== "/table") {
      return NextResponse.redirect('https://gmbh-test-task.vercel.app/table');
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
