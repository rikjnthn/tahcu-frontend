"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios, { isAxiosError } from "axios";
import { useForm } from "react-hook-form";

import style from "@/style/login.module.scss";
import Input from "@/components/input";
import SubmitButton from "@/components/submit-button";

export default function Page() {
  const [loginError, setLoginError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm();

  const router = useRouter();

  const login = async (data: any) => {
    try {
      setIsLoading(true);
      setLoginError(false);

      await axios.post("/api/login", data);

      router.push("/a");
    } catch (e) {
      setLoginError(true);

      if (isAxiosError(e)) {
        const errorMessage = e.response?.data.message;
        for (const name in errorMessage) {
          if (name === "user_idOrEmail")
            setError(name, { message: "User id or email should not be empty" });
          else setError(name, { message: errorMessage[name] });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (data: any) => {
    login(data);
  };

  return (
    <div className={`${style.login} h-full-dvh`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <header>
          <span>Login</span>
        </header>

        <Input
          withLabel
          labelName="Email / User Id"
          errorMessage={errors.user_idOrEmail?.message?.toString()}
          type="text"
          placeholder="Email or User Id"
          {...register("user_idOrEmail", {
            required: {
              value: true,
              message: "Please enter your password",
            },
            minLength: {
              value: 4,
              message: "User id should contain a minimal of 4 letters",
            },
            validate: {
              isEmail: (v: string) => {
                if (v.includes("@")) {
                  const domain = v.split("@")[1];

                  if (domain === "gmail.com") return true;
                  return "Please use gmail.com domain";
                }
              },
            },
          })}
        />

        <Input
          withLabel
          labelName="Password"
          errorMessage={errors.password?.message?.toString()}
          type="password"
          placeholder="Password"
          {...register("password", {
            required: {
              value: true,
              message: "Please enter your password",
            },
            min: {
              value: 8,
              message: "Password should contain a minimal of 8 letters",
            },
          })}
        />

        {loginError && (
          <em className={style.login_error}>
            Failed to login. User id or password is wrong
          </em>
        )}

        <footer>
          <Link href="/sign-up">Create account</Link>
          <SubmitButton name="Login" isLoading={isLoading} />
        </footer>
      </form>
    </div>
  );
}
