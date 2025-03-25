import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const token = req.cookies.get("next-auth.session-token") || req.cookies.get("__Secure-next-auth.session-token");
    const userRole = token?.name;

    // Restringir acceso a /admin solo a ADMIN
    if (pathname.startsWith("/admin") && userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"], // Proteger estas rutas
};