import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/signup";
  const token = request.cookies.get("token")?.value || "";
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
  if (!isPublicPath && token) {
    const admin = request.cookies.get("admin")?.value === "true" || false;
    const isAdminPath =
      path.startsWith("/admin/") || path.startsWith("/api/admin/");
    if (isAdminPath && !admin) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/dashboard",
    "/profile",
    "/admin/([^/.]*)",
    "/api/admin/([^/.]*)",
  ],
};
