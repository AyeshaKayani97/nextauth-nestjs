"use client";
import { Button } from "@/components/Button";
import InputBox from "@/components/InputBox";
import { Backend_URL } from "@/lib/Constants";
// import { Backend_URL } from "@/lib/Constants";
import Link from "next/link";
import React, { useRef } from "react";

type FormInputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword:string;
};

const SignupPage = () => {

  //Register function

  const register = async () => {
    if(data.current.password !== data.current.confirmPassword){
      alert("Passwords don't match");
      return;
    }
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
    console.log(res);

    if (!res.ok) {
      alert(res.statusText);
      return;
    }
    const response = await res.json();

    alert("User Registered!");
    console.log({ response });
  };
  const data = useRef<FormInputs>({
    username: "",
    email: "",
    password: "",
    confirmPassword:""
  });
  return (
    <div className="m-2 border rounded overflow-hidden shadow">
      <div className="p-2 bg-gradient-to-b from-white to-slate-200 text-slate-600">
        Sign up
      </div>
      <div className="p-2 flex flex-col gap-6">
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