// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth(
//   async function middleware(req) {
//     // authorize roles
//     const url = req.nextUrl.pathname;
//     const userRole = req?.nextauth?.token?.user?.role;
//     console.log(req);
    

//     if (url?.startsWith("/admin") && userRole !== "admin") {
//       return NextResponse.redirect(new URL("/", req.url));
//     }
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => {
//         if (!token) {
//           return false;
//         }
//       },
//     },
//   }
// );

import { withAuth } from "next-auth/middleware";

export default withAuth(
  
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log(req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token }) => (console.log(token)),
    },
  }
);

export const config = { matcher: ["/admin"] }
