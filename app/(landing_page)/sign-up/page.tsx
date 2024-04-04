"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios, { isAxiosError } from "axios";
import { useForm } from "react-hook-form";

import style from "@/style/auth.module.scss";
import SubmitButton from "@/components/submit-button";
import Input from "@/components/input";

export default function Page() {
  const [signupError, setSignupError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const router = useRouter();

  const signup = async (data: any) => {
    try {
      setIsLoading(true);
      setSignupError(false);

      const { confirm_password, ...bodyData } = data;
      await axios.post("/api/sign-up", bodyData);

      router.push("/a");
    } catch (error) {
      setSignupError(true);

      if (isAxiosError(error)) {
        const errorMessage = error.response?.data.message;

        if (errorMessage) {
          ["user_id", "username", "password", "email"].forEach((name) => {
            setError(name, { message: errorMessage[name] });
          });
        }

        if (Array.isArray(errorMessage.meta)) {
          if (errorMessage.type === "Duplicate field value") {
            errorMessage.meta.forEach((name: string) => {
              setError(name, {
                message: `Someone had already using that ${name.replace(
                  "_",
                  " "
                )}`,
              });
            });
          }
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (data: any) => {
    signup(data);
  };

  return (
    <div className={`${style.auth} h-full-dvh`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <header>
          <span>Sign Up</span>
        </header>

        <Input
          noTransition
          labelName="User Id"
          errorMessage={errors.user_id?.message?.toString()}
          type="text"
          placeholder="User Id"
          {...register("user_id", {
            required: {
              value: true,
              message: "Please enter your user id",
            },
            minLength: {
              value: 4,
              message: "User id should contain a minimum of 4 letters",
            },
          })}
        />

        <Input
          noTransition
          labelName="Username"
          errorMessage={errors.username?.message?.toString()}
          type="text"
          placeholder="Username"
          {...register("username", {
            required: {
              value: true,
              message: "Please enter your username",
            },
          })}
        />

        <Input
          noTransition
          labelName="Email"
          errorMessage={errors.email?.message?.toString()}
          type="email"
          placeholder="Email"
          {...register("email", {
            required: {
              value: true,
              message: "Please enter your email",
            },
            validate: {
              isEmail: (v: string) => {
                const domain = v.split("@")[1];
                if (domain === "gmail.com") return true;

                return "Please use gmail.com domain";
              },
            },
          })}
        />

        <Input
          noTransition
          labelName="Password"
          errorMessage={errors.password?.message?.toString()}
          type="password"
          placeholder="Password"
          {...register("password", {
            required: {
              value: true,
              message: "Please enter your password",
            },
            minLength: {
              value: 8,
              message: "Password should contain a minimum of 8 letters",
            },
          })}
        />

        <Input
          noTransition
          labelName="Confirm password"
          errorMessage={errors.confirm_password?.message?.toString()}
          type="password"
          placeholder="Confirm Password"
          {...register("confirm_password", {
            required: {
              value: true,
              message: "Please enter the confirm password",
            },
            validate: {
              isSameWithPassword: (v: string) => {
                const password = getValues("password");

                if (password === v) return true;

                return "Password and confirm password does not match";
              },
            },
          })}
        />

        {signupError && (
          <em className={style.auth_error}>Failed to create account</em>
        )}

        <footer>
          <Link href="/login">Login</Link>
          <SubmitButton name="Create" isLoading={isLoading} />
        </footer>
      </form>
    </div>
  );
}
