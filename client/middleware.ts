export { default } from "next-auth/middleware"

// we want to protect dashboard page and its all children pages

export const config = { matcher: ["/dashboard/:path*"] }


console.log('Middleware executed');