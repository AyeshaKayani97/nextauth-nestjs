import NextAuth  from "next-auth/next";

declare module "next-auth"{
    interface Session{
        user:{
            _id: string;
            username: string;
            email: string;
            password: string;
            confirmPassword: string;
            profileImg: string | null;
            forgotPasswordToken: string | null;
            createdAt: string;
            updatedAt: string;
            __v: number;
        };

        backendTokens:{
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
            _id: string;
            username: string;
            email: string;
            password: string;
            confirmPassword: string;
            profileImg: string | null;
            forgotPasswordToken: string | null;
            createdAt: string;
            updatedAt: string;
            __v: number;
            expiresIn: number
        };

        backendTokens:{
            accessToken:string,
            refreshToken:string,
            expiresIn: number
        }

    }


}