"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios, { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";

import style from "@/style/auth.module.scss";
import SubmitButton from "@/components/submit-button";
import Input from "@/components/input";
import SignUpOTP from "@/components/signup-otp";
import { ErrorResponseType, SignUpData } from "@/interface";

export default function Page() {
  const [isOpenOTP, setIsOpenOTPInput] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authErrorMessage, setAuthErrorMessage] = useState<string>("");

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
      setAuthErrorMessage("");

      await axios.post("/api/send-otp", sendOTPDto);

      setIsOpenOTPInput(true);
    } catch (error) {
      if (!isAxiosError<ErrorResponseType>(error)) return;

      if (error.response?.status === 429) {
        setAuthErrorMessage(
          "You have sent too many requests. Please try again later."
        );

        return;
      }

      if (error.response?.data.error.code === "DUPLICATE_VALUE") {
        const errorMessage = error.response?.data.error.message;

        setError("email", { message: errorMessage.email });
        setError("user_id", { message: errorMessage.user_id });

        return;
      }

      setAuthErrorMessage("Failed to sign up");
    }
  };

  return (
    <div className={`${style.auth} h-full-dvh`}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`absolute transition-transform ${
          isOpenOTP ? "-translateX-100-vw" : ""
        }`}
      >
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
            maxLength: {
              value: 20,
              message: "User id should contain a maximum of 20 letters",
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
            minLength: {
              value: 4,
              message: "Username should contain a minimum of 4 letters",
            },
            maxLength: {
              value: 20,
              message: "Username should contain a maximum of 20 letters",
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
                if (isEmail(v)) return true;
                return "Email is not valid";
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
            maxLength: {
              value: 64,
              message: "Password should contain a maximum of 64 letters",
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
              isSameWithPassword: (confirm_password: string) => {
                const password = getValues("password");
                if (password === confirm_password) return true;
                return "Password and confirm password does not match";
              },
            },
          })}
        />

        {authErrorMessage.length > 0 && (
          <em className={style.auth_error}>{authErrorMessage}</em>
        )}

        <footer>
          <Link href="/login">Login</Link>
          <SubmitButton name="Create" isLoading={isLoading} />
        </footer>
      </form>

      <div
        className={`${style.sign_up_otp} ${
          isOpenOTP ? "center" : "translateX-100-vw"
        }`}
      >
        <SignUpOTP
          setAuthErrorMessage={setAuthErrorMessage}
          setError={setError}
          setIsLoading={setIsLoading}
          signUpData={getValues()}
          setIsOpenOTPInput={setIsOpenOTPInput}
        />
      </div>
    </div>
  );
}
