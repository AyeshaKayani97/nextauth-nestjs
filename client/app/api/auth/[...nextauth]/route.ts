import { Backend_URL, NEXTAUTH_SECRET } from "@/lib/Constants";
import NextAuth, { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { NextApiRequest } from "next";


export const authOptions: NextAuthOptions = {
 
  secret:NEXTAUTH_SECRET,

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

        if (user) {
          return user
        } else {
          return null;
        }
        // console.log(user);
        // console.log("------------------------user_id----------------------------");
        // console.log(user._id);

        // Ensure the returned user object includes necessary fields
        
        // return user && { ...user, id: user._id, backendTokens: user.backendTokens };
        // return {
        //   id: user._id,
        //   email: user.email,
        //   name: user.name,
        // };
        // console.log(user)



        
      
      },
    }),
  ],
  pages: {
    signIn: "/auth/signIn",
  },
  callbacks: {
  
    // async jwt({ token, user }) {
    //   console.log("-------------------jwt token----------");
    //   console.log(token);
    //   console.log("------------------jwt user----------");
    //   console.log(user);

    //   // Merge user object into token if user is logged in
    //   if (user) {
    //     return { ...token, ...user };
    //   }

    //   console.log("---------------jwt final token ----------------------");
    //   console.log(token);
    //   return token;
    // },
    jwt: ({ token, user }) => {
        console.log("-------------------jwt token----------");
      console.log(token);
      console.log("-------------------jwt user----------");
      console.log(user);
      if (user) {
        return { ...token, ...user };
      }
      console.log("---------------jwt final token ----------------------");
      console.log(token);
      return token;
    },


    async session({ session, token }) {
    console.log("-------------------  session----------");
    session.user = token.user;
    session.backendTokens = token.backendTokens
    console.log("-------------------final  session----------");
      console.log(session);
      return session;
    },

    
    


  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };


