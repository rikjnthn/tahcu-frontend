"use client";
import { useState } from "react";
import axios, { isAxiosError } from "axios";
import Link from "next/link";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";

import style from "@/style/auth.module.scss";
import Input from "@/components/input";
import SubmitButton from "@/components/submit-button";
import { ErrorResponseType } from "@/interface";
import ResetPasswordOtp from "@/components/reset-password-otp";

export default function Page() {
  const [resetPwError, setResetPwError] = useState<string>("");
  const [isOpenOTP, setIsOpenOTP] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    formState: { errors },
    register,
    getValues,
    setError,
  } = useForm<ResetPasswordDataType>();

  const onSubmit = async (data: ResetPasswordDataType) => {
    setIsLoading(true);

    const sendResetPwOtpData = { email: data.email };

    try {
      await axios.post("/api/send-reset-password-otp", sendResetPwOtpData);

      setIsOpenOTP(true);
    } catch (error) {
      if (isAxiosError<ErrorResponseType>(error)) {
        const errorRes = error.response?.data.error;

        if (errorRes?.code === "TOO_MANY_REQUESTS") {
          setResetPwError("You have sent too many request");
          return;
        }

        if (errorRes?.code === "VALIDATION_ERROR") {
          setError("email", { message: errorRes.message });
          return;
        }

        setResetPwError("Failed to request reset password");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={clsx(style.auth)}>
      <div
        className={clsx(style.form_container, !isOpenOTP ? "center" : "hidden")}
      >
        <div className={clsx(style.title)}>Reset Password</div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={clsx("transition-transform", {
            "-translateX-100-vw": isOpenOTP,
          })}
        >
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
                  if (!isEmail(v)) return "Email is not valid";
                },
              },
            })}
          />

          <Input
            noTransition
            labelName="New Password"
            error={errors.new_password?.message?.toString()}
            type="password"
            placeholder="New Password"
            {...register("new_password", {
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
                  const password = getValues("new_password");
                  if (password !== confirm_password)
                    return "Password and confirm password does not match";
                },
              },
            })}
          />

          {resetPwError.length > 0 && (
            <div className={style.auth_error}>{resetPwError}</div>
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
        <ResetPasswordOtp
          resetPwData={getValues()}
          setError={setError}
          setIsLoading={setIsLoading}
          setIsOpenOTP={setIsOpenOTP}
          setResetPwError={setResetPwError}
        />
      </div>
    </div>
  );
}

interface ResetPasswordDataType {
  email: string;
  new_password: string;
  confirm_password: string;
}
