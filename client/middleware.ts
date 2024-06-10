export { default } from "next-auth/middleware";

export const config = { matcher: ["/dashboard/:path*"] };
// export const config = { matcher: ["/dashboard/:path*"] };
// export const config = { matcher: ["/dashboard/"] };





// import { getToken } from 'next-auth/jwt'
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { NEXTAUTH_SECRET } from './lib/Constants'

// export async function middleware(request: NextRequest) {
//     console.log("middleware.ts - Request URL:", request.url)
    
//     // Fetch the token
//     const token = await getToken({ req: request, secret: NEXTAUTH_SECRET })
//     console.log("..........................................Middleware token................")

//     console.log("middleware.ts - Token:", token)
    
//     if (!token) {
//         // If no token is found, redirect to the login page
//         console.log("middleware.ts - No token found, redirecting to login")
//         return NextResponse.redirect(new URL('/api/auth/signin', request.url))
//     }

//     // If token is present, allow the request to proceed
//     console.log("middleware.ts - Token found, allowing access")
//     return NextResponse.next()
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/dashboard/:path*',
// }
