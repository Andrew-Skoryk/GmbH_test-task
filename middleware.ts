import { NextRequest, NextResponse } from 'next/server';
import { store } from './app/lib/redux/store';

export default function middleware(_request: NextRequest) {
  console.log("Hey! I'm working!!! wtf");
  const state = store.getState();
  
  if (!state.auth.isAuthenticated) {
    return NextResponse.redirect('https://gmbh-test-task.vercel.app/');
  } 

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

