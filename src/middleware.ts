import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = await req.nextUrl.pathname;

  if (url.includes("/api/register") || url.includes("/api/auth"))
    return NextResponse.next();

  if (req.nextUrl.pathname.startsWith("/api")) {
    if (!token) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }
  }

  if (!token) return NextResponse.redirect(new URL("/signin", req.url));
  const role = token.role as string | undefined;

  if (typeof token.exp === "number" && Date.now() / 1000 > token.exp) {
    return NextResponse.redirect(new URL("/signin?expired=true", req.url));
  }

  const reqPath = req.nextUrl.pathname;

  if (
    reqPath.startsWith("/dashboard") ||
    reqPath.startsWith("/goods") ||
    reqPath.startsWith("/units") ||
    reqPath.startsWith("/users")
  ) {
    if (role?.toLocaleLowerCase() !== "admin") {
      return NextResponse.redirect(new URL("/403", req.url));
    }
  }

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("user-id", token.id as string);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: [
    "/api/:path*",
    "/sales/:path*",
    "/dashboard/:path*",
    "/users/:path*",
    "/units/:path*",
    "/goods/:path*",
    "/suppliers/:path*",
    "/purchases/:path*",
    "/customers/:path*",
    "/sales/:path*",
    "/dashboard",
  ],
};
