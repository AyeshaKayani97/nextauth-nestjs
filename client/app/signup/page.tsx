"use client";
import { Button } from "@/components/Button";
import InputBox from "@/components/InputBox";
import { Backend_URL } from "@/lib/Constants";
// import { Backend_URL } from "@/lib/Constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

type FormInputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword:string;
};

const SignupPage = () => {
  
  
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const data = useRef<FormInputs>({
    username: "",
    email: "",
    password: "",
    confirmPassword:""
  });

  //Register function

  const register = async () => {
    if(data.current.password !== data.current.confirmPassword){
      setError("Passwords don't match");
      return;
    }
    try{
      const res = await fetch(Backend_URL + "/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: data.current.username,
          email: data.current.email,
          password: data.current.password,
          confirmPassword:data.current.confirmPassword
  
        }),
  
        headers: {
          "Content-Type": "application/json",
        },
        
      });

     
  
      if (!res.ok) {
        const errorMessage = await res.json();
        setError(errorMessage.message.join(", "));
        return;
        // alert(res.statusText);
        // return;
      }

      const response = await res.json();
      console.log("Response from signup page-------")
      console.log(response);
      console.log({response});
      alert("User Registered!");
      setError(null);
      router.push("/auth/signIn");

    }catch(err){
      setError("An unexpected error occurred. Please try again.");
      console.error(err);

    }


  };

  return (
    <div className="mt-9 overflow-hidden w-full flex flex-col justify-center items-center">
        <h1 className="p-2  text-slate-600 font-bold text-xl">
        Sign up
        </h1>
      <div className="p-4 flex flex-col gap-6 w-[500px] shadow border rounded">
      {error && (
          <div className="text-red-500 text-center">
            {error}
          </div>
        )}
        <InputBox 
          autoComplete="off"
          name="username"
          labelText="Name"
          required
          onChange={(e) => (data.current.username = e.target.value)}
        />
        <InputBox
          name="email"
          labelText="Email"
          required
          onChange={(e) => (data.current.email = e.target.value)}
        />
        <InputBox
          name="password"
          labelText="password"
          type="password"
          required
          onChange={(e) => (data.current.password = e.target.value)}
        />

        <InputBox
                  name="confirmPassword"
                  labelText="password"
                  type="password"
                  required
                  onChange={(e) => (data.current.confirmPassword = e.target.value)}
                />
        <div className="flex justify-center items-center gap-2">
          <Button onClick={register}>Submit</Button>
          <Link className="" href={"/"}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;