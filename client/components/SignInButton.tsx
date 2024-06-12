"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const SignInButton = () => {
  // `session` will match the returned value of `callbacks.session()` from `NextAuth()`
  const { data: session } = useSession();

  if (session) {
    const user = session.user;
    const {username } = user;

    // console.log("----------user from session from navbar starts here----------------");
    // console.log(user);
    // console.log("User ID:", _id);
    // console.log("Username:", username);
    // console.log("----------user from session from navbar ends here----------------");

    return (
      <div className="flex gap-4 ml-auto">
        <p className="text-sky-600">{username}</p>
        <Link className="transition-colors hover:text-blue-500" href={"/profile"}>
          Profile
        </Link>
        <Link href="/api/auth/signout" className="flex gap-4 ml-auto text-red-600">
          Sign Out
        </Link>
      </div>
    );
  }

  return (
    <div className="flex gap-3 ml-auto items-center">
      <Link href="/api/auth/signin" className="flex gap-4 ml-auto text-green-600">
        Sign In
      </Link>

      <Link href="/signup" className="flex gap-4 ml-auto bg-green-600 text-green-200 p-2 rounded">
        Sign Up
      </Link>
    </div>
  );
};

export default SignInButton;
