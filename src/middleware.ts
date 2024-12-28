import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token");
  const role = request.cookies.get("role")?.value;
  const url = request.nextUrl;

  // If the user is logged in and tries to access the login page, redirect to the home page
  if (accessToken && url.pathname === "/auth/login") {
    return NextResponse.redirect(new URL("/", url));
  }

  // If the user is not logged in and tries to access a protected page, redirect to the login page
  if (!accessToken && url.pathname !== "/auth/login") {
    return NextResponse.redirect(new URL("/auth/login", url));
  }

  // Role-based access control
  if (url.pathname.startsWith("/admin")) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", url)); // Redirect non-admin users
    }
  }

  if (url.pathname.startsWith("/teacher")) {
    if (role !== "teacher" && role !== "admin") {
      return NextResponse.redirect(new URL("/", url)); // Redirect non-teacher and non-admin users
    }
  }

  if (url.pathname.startsWith("/student")) {
    if (role !== "student") {
      return NextResponse.redirect(new URL("/", url)); // Redirect non-student users
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|svg|images|auth).*)", // Match all routes except public assets
  ],
};
