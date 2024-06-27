"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios, { isAxiosError } from "axios";
import { useForm } from "react-hook-form";

import style from "@/style/auth.module.scss";
import Input from "@/components/input";
import SubmitButton from "@/components/submit-button";
import { ErrorResponseType } from "@/interface";

const sixtyDaysInMs = "5184000000";

export default function Page() {
  const [authErrorMessage, setAuthErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<LoginDataType>();

  const router = useRouter();

  const login = async (data: LoginDataType) => {
    try {
      setIsLoading(true);
      setAuthErrorMessage("");

      await axios.post("/api/login", data);

      localStorage.setItem(
        "token_exp",
        JSON.stringify(
          new Date(
            Date.now() +
              parseInt(process.env.NEXT_PUBLIC_TOKEN_EXPIRED ?? sixtyDaysInMs)
          )
        )
      );

      router.push("/a");
    } catch (error) {
      if (!isAxiosError<ErrorResponseType>(error)) return;

      if (error.response?.status === 429) {
        setAuthErrorMessage(
          "You have sent too many requests. Please try again later."
        );

        return;
      }

      const errorResponse = error.response?.data.error;

      if (errorResponse?.code === "VALIDATION_ERROR") {
        setError("user_idOrEmail", {
          message: errorResponse?.message.user_idOrEmail,
        });
        setError("password", { message: errorResponse?.message.password });
        return;
      }

      if (errorResponse?.code === "INVALID") {
        setAuthErrorMessage(errorResponse?.message);
        return;
      }

      setAuthErrorMessage("Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${style.auth} h-full-dvh`}>
      <form onSubmit={handleSubmit(login)}>
        <header>
          <span>Login</span>
        </header>

        <Input
          noTransition
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
              message: "Password should contain a minimal of 8 letters",
            },
            maxLength: {
              value: 64,
              message: "Maximum password length exceeded (Maximum 64 letters)",
            },
          })}
        />

        {authErrorMessage.length > 0 && (
          <em className={style.auth_error}>{authErrorMessage}</em>
        )}

        <footer>
          <Link href="/sign-up">Create account</Link>
          <SubmitButton name="Login" isLoading={isLoading} />
        </footer>
      </form>
    </div>
  );
}

interface LoginDataType {
  user_idOrEmail: string;
  password: string;
}
