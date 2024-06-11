export { default } from "next-auth/middleware";

// export const config = { matcher: ["/dashboard/:path*"] };
export const config = { matcher: ["/dashboard/:path*"] };
// export const config = { matcher: ["/dashboard/"] };

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// // const protectedRoutes = ["/dashboard", "/profile", "/profile/2fa_settings"];
// const protectedRoutes = ["/dashboard"];


// export default function middleware(req: NextRequest) {
//   const token = req.cookies.get("token")?.value;

//   if (
//     !token &&
//     protectedRoutes.includes(req.nextUrl.pathname)
//   ) {
//     const absoluteURL = new URL("/login", req.nextUrl.origin);
//     return NextResponse.redirect(absoluteURL.toString());
//   }  
// }