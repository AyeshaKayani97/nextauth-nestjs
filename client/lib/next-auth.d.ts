import NextAuth  from "next-auth/next";

declare module "next-auth"{
    interface Session{
        user:{
            _id:string,
            username:string,
            password:string
        };

        backendToken:{
            accessToken:string,
            refreshToken:string,
            expiresIn: number
        }

    }
}


import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt"{
    interface JWT{
        user:{
            _id:string,
            username:string,
            password:string,
            expiresIn: number
        };

        backendToken:{
            accessToken:string,
            refreshToken:string,
            expiresIn: number
        }

    }


}