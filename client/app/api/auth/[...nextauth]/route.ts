import { Backend_URL } from "@/lib/Constants";
import NextAuth, { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null;

        const { username, password } = credentials;
        const res = await fetch(Backend_URL + "/auth/login", {
          method: "POST",
          body: JSON.stringify({ username, password }),
          headers: { "Content-Type": "application/json" },
        });

        if (res.status === 401) {
          console.log(res.statusText);
          return null;
        }

        const user = await res.json();
        console.log("---------------------------------user from route.ts file----------");
        console.log(user);
        console.log("------------------------user_id----------------------------");
        console.log(user._id);

        // Ensure the returned user object includes necessary fields
        return user && { ...user, id: user._id, backendTokens: user.backendTokens };
      
      },
    }),
  ],
  pages: {
    signIn: "/auth/signIn",
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log("-------------------jwt token----------");
      console.log(token);
      console.log("------------------jwt user----------");
      console.log(user);

      // Merge user object into token if user is logged in
      if (user) {
        return { ...token, ...user };
      }

      console.log("---------------jwt final token ----------------------");
      console.log(token);
      return token;
    },

    async session({ session, token }) {
      console.log("-------------------token----------");
      console.log(token);
      console.log("-------------------session----------");

      // Set user and backendTokens from token
      session.user = token.user;
      session.backendTokens = token.backendTokens;

      console.log("-------------------final  session----------");
      console.log(session);

      return session;
    },
    async authorized({ auth, request }) {
      const user = auth?.user;
      const pathname = request.nextUrl?.pathname;

      // ONLY AUTHENTICATED USERS CAN REACH THE HOME PAGE

      if ((pathname === "/login" || pathname === "/register") && user) {
        return Response.redirect(new URL("/", request.nextUrl));
      }
      // ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE
      if (pathname === "/" && !user) {
        return Response.redirect(new URL("/login", request.nextUrl));
      }

      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };


