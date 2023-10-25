import { NextRequest, NextResponse } from 'next/server';
import { store } from './app/lib/redux/store';

export default function middleware(_request: NextRequest) {
  const state = store.getState();

  if (!state.auth.isAuthenticated) {
    return NextResponse.redirect('https://gmbh-test-task.vercel.app/');
  } else {
    return NextResponse.redirect('https://gmbh-test-task.vercel.app/table');
  }

}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

