import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = await req.nextUrl.pathname;
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("user-id", token?.id as string);
  if (!token) return NextResponse.redirect(new URL("/signin", url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/users", "/api/me", "/api/auth", "/api/users"],
};
