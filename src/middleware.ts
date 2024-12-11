import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token");

  if (accessToken && request.nextUrl.pathname === "/auth/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!accessToken && request.nextUrl.pathname !== "/auth/login") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|svg|images).*)"],
};
