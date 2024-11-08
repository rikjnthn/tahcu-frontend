"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios, { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import clsx from "clsx";

import style from "@/style/auth.module.scss";
import Input from "@/components/input";
import SubmitButton from "@/components/submit-button";
import { ErrorResponseType } from "@/interface";

export default function Page() {
  const [loginError, setLoginError] = useState<string>("");
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
      setLoginError("");

      await axios.post("/api/login", data);

      router.push("/a");
    } catch (error) {
      if (!isAxiosError<ErrorResponseType>(error)) return;

      const errorResponse = error.response?.data.error;

      if (errorResponse?.code === "TOO_MANY_REQUESTS") {
        setLoginError(
          "You have sent too many requests. Please try again later."
        );
        return;
      }

      if (errorResponse?.code === "VALIDATION_ERROR") {
        setError("user_idOrEmail", {
          message: errorResponse?.message.user_idOrEmail,
        });
        setError("password", { message: errorResponse?.message.password });
        return;
      }

      if (errorResponse?.code === "INVALID") {
        setLoginError(errorResponse?.message);
        return;
      }

      setLoginError("Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={clsx(style.auth)}>
      <div className={style.form_container}>
        <div className={clsx(style.title)}>Login</div>

        <form onSubmit={handleSubmit(login)}>
          <Input
            noTransition
            labelName="Email / User Id"
            error={errors.user_idOrEmail?.message?.toString()}
            type="text"
            inputMode="email"
            placeholder="Email or User Id"
            {...register("user_idOrEmail", {
              required: {
                value: true,
                message: "Please enter your password",
              },
              minLength: {
                value: 4,
                message: "User id should contain a minimum of 4 letters",
              },
              validate: {
                isNotContainSpace: (v) => {
                  if (/\s+/.test(v)) return "Space character is not allowed";
                },
              },
            })}
          />

          <Input
            noTransition
            labelName="Password"
            error={errors.password?.message?.toString()}
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
              maxLength: {
                value: 64,
                message: "Password should contain a maximum of 64 letters",
              },
              validate: {
                isNotContainSpace: (v) => {
                  if (/\s+/.test(v)) return "Space character is not allowed";
                },
              },
            })}
          />

          {loginError.length > 0 && (
            <div className={style.auth_error}>{loginError}</div>
          )}

          <div className={clsx(style.button_and_nav)}>
            <div>
              <Link href="/sign-up">Create account</Link>
              <Link href="/forget-password">Forget password</Link>
            </div>
            <SubmitButton name="Login" isLoading={isLoading} />
          </div>
        </form>
      </div>
    </div>
  );
}

interface LoginDataType {
  user_idOrEmail: string;
  password: string;
}
