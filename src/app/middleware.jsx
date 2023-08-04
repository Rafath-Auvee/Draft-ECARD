// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";

// export default async function middleware(req) {
//   // Get the pathname of the request (e.g. /, /protected)
//   const path = req.nextUrl.pathname;

//   console.log(path);

//   // If it's the root path, just render it
//   if (path === "/") {
//     return NextResponse.next();
//   }

//   const session = await getToken({
//     req,
//     secret: process.env.NEXTAUTH_SECRET,
//   });

//   const isProtected = path.includes("/test");

//   if (!session && isProtected) {
//     return NextResponse.redirect(new URL("/restore", req.url));
//   } else if (session && (path === "/test" || path === "/register")) {
//     return NextResponse.redirect(new URL("/test", req.url));
//   }
//   return NextResponse.next();
// }

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    // authorize roles
    const url = req.nextUrl.pathname;
    const userRole = req?.nextauth?.token?.user?.role;

    console.log(req);
    
    if (url?.startsWith("/admin") && userRole !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (!token) {
          return false;
        }
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
