"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios, { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import clsx from "clsx";

import style from "@/style/auth.module.scss";
import SubmitButton from "@/components/submit-button";
import Input from "@/components/input";
import SignUpOTP from "@/components/signup-otp";
import { ErrorResponseType, SignUpData } from "@/interface";

export default function Page() {
  const [isOpenOTP, setIsOpenOTPInput] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [signUpError, setSignupError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm<SignUpData>();

  const onSubmit = async (data: SignUpData) => {
    const sendOTPDto = {
      email: data.email,
      user_id: data.user_id,
    };

    try {
      setSignupError("");

      await axios.post("/api/send-otp", sendOTPDto);

      setIsOpenOTPInput(true);
    } catch (error) {
      if (!isAxiosError<ErrorResponseType>(error)) return;

      const errorResponse = error.response?.data.error;

      if (errorResponse?.code === "TOO_MANY_REQUESTS") {
        setSignupError(
          "You have sent too many requests. Please try again later."
        );
        return;
      }

      if (errorResponse?.code === "DUPLICATE_VALUE") {
        setError("email", { message: errorResponse?.message.email });
        setError("user_id", { message: errorResponse?.message.user_id });
        return;
      }

      setSignupError("Failed to sign up");
    }
  };

  return (
    <div className={clsx(style.auth)}>
      <div
        className={clsx(style.form_container, !isOpenOTP ? "center" : "hidden")}
      >
        <div className={clsx(style.title)}>Sign Up</div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={clsx("transition-transform", {
            "-translateX-100-vw": isOpenOTP,
          })}
        >
          <Input
            noTransition
            labelName="User Id"
            error={errors.user_id?.message?.toString()}
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
              maxLength: {
                value: 20,
                message: "User id should contain a maximum of 20 letters",
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
            labelName="Username"
            error={errors.username?.message?.toString()}
            type="text"
            placeholder="Username"
            {...register("username", {
              required: {
                value: true,
                message: "Please enter your username",
              },
              minLength: {
                value: 4,
                message: "Username should contain a minimum of 4 letters",
              },
              maxLength: {
                value: 20,
                message: "Username should contain a maximum of 20 letters",
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
            labelName="Email"
            error={errors.email?.message?.toString()}
            type="email"
            inputMode="email"
            placeholder="Email"
            {...register("email", {
              required: {
                value: true,
                message: "Please enter your email",
              },
              validate: {
                isEmail: (v: string) => {
                  if (isEmail(v)) return true;
                  return "Email is not valid";
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

          <Input
            noTransition
            labelName="Confirm password"
            error={errors.confirm_password?.message?.toString()}
            type="password"
            placeholder="Confirm Password"
            {...register("confirm_password", {
              required: {
                value: true,
                message: "Please enter the confirm password",
              },
              validate: {
                isSameWithPassword: (confirm_password: string) => {
                  const password = getValues("password");
                  if (password === confirm_password) return true;
                  return "Password and confirm password does not match";
                },
              },
            })}
          />

          {signUpError.length > 0 && (
            <div className={style.auth_error}>{signUpError}</div>
          )}

          <div className={clsx(style.button_and_nav)}>
            <div>
              <Link href="/login">Login</Link>
            </div>
            <SubmitButton name="Create" isLoading={isLoading} />
          </div>
        </form>
      </div>

      <div className={clsx(style.sign_up_otp, isOpenOTP ? "center" : "hidden")}>
        <SignUpOTP
          setSignupError={setSignupError}
          setError={setError}
          setIsLoading={setIsLoading}
          signUpData={getValues()}
          setIsOpenOTPInput={setIsOpenOTPInput}
        />
      </div>
    </div>
  );
}
