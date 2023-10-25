import { NextRequest, NextResponse } from 'next/server';
import { store } from './lib/redux/store';

export function middleware(_request: NextRequest) {
  const state = store.getState();
  
  if (!state.auth.isAuthenticated) {
    return NextResponse.redirect('/');
  }

  return NextResponse.next();
}
