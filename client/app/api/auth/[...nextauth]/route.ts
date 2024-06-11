import { Backend_URL } from "@/lib/Constants";
import NextAuth, { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "jsmith",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null;
        const { username, password } = credentials;
        const res = await fetch(Backend_URL + "/auth/login", {
          method: "POST",
          body: JSON.stringify({
            username,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status == 401) {
          console.log(res.statusText);

          return null;
        }
        const user = await res.json();
        console.log("---------------------------------user from route.ts file----------")
        console.log(user)
        return user;
      },
    }),
  ],
  pages:{
    signIn:"/auth/signIn"
  },
// callbacks are asynchronous functions that control what hapens when action is performed 
  callbacks: {
        // when user signed in to the app, jwt callback, takes token and user, will be called.
     // jwt returns the token, then the token will be received by session callback 

     // in jwt callback, we gonna receive a user only if he or she is logged in 
    async jwt({ token, user }) {
      console.log("-------------------jwt token----------")
      console.log(token)
      console.log("------------------jwt user----------")
      console.log(user)
      token.id = user.id
      // console.log("---------------jwt final token ----------------------")
      // console.log(token)
      return token

      
    },

    async session({ token, session }) {
      console.log("-------------------token----------")
     
      console.log(token);


      console.log("-------------------session----------")
      
  // { user: { name: undefined, email: undefined, image: undefined },
  // expires: '2024-07-10T07:06:27.475Z' }
  session._id = token.id;
  session.backendTokens = token.backendTokens;
  return session;


    },




  },
};


// export const authOptions:NextAuthOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         username: { label: "username", type: "text", placeholder: "jsmith" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials, req) {
//         if (!credentials?.username || !credentials.password) {
//           return null;
//         }
        
//         const { username, password } = credentials;
//         // console.log(username, "username");
//         // console.log(password, "password");


//         const res = await fetch(Backend_URL + "/auth/login", {
//           method: "POST",
//           body: JSON.stringify({ username, password }),
//           headers: {
//             "Content-Type": "application/json"
//           }
//         });
    
//         if (res.status === 401) {
//           console.log(res.statusText);
//           return null;
//         }
    
//         const user = await res.json();
//         console.log(user, "user");
//         return user;
//       }
//     })
//     // ...add more providers here
//   ],
//   // callbacks are asynchronous functions that control what hapens when action is performed 
//   callbacks:{
//     // when user signed in to the app, jwt callback, takes token and user, will be called.
//     // jwt returns the token, then the token will be received by session callback 

//     // in jwt callbackify, we gonna receive a user only if he or she is logged in 
//     async jwt({token, user}){
//       console.log("NextAuth JWT Callback -  user:", { token });
//       console.log("NextAuth JWT Callback -  user:", { token });

//       if(user) return {...token, ...user}
//       // console.log("..............................................");

//       // console.log(token, "token")
//       return token
//     },
//     session({token, session}){
//       session.user = token.user;
//       session.backendToken = token.backendToken;
//       return session;
//     }
//   }
// };

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};