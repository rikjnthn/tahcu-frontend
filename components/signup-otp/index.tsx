import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios, { isAxiosError } from "axios";
import { UseFormSetError } from "react-hook-form";

import style from "./signup-otp.module.scss";
import BackButton from "../back-button";
import OTPInput from "../otp-input";
import { ErrorResponseType, SetStateType, SignUpData } from "@/interface";

const SignUpOTP = ({
  setIsOpenOTPInput,
  setIsLoading,
  setSignupError,
  setError,
  signUpData,
}: SignUpOTPPropsType) => {
  const [isOtpError, setIsOtpError] = useState<boolean>(false);
  const [otpError, setOtpError] = useState<string>("");

  const router = useRouter();

  const signup = async (otp: string) => {
    try {
      setIsLoading(true);
      setIsOtpError(false);
      setOtpError("");

      const { confirm_password, ...data } = signUpData;

      const bodyData = { data, otp };

      await axios.post("/api/sign-up", bodyData);

      router.push("/a");
    } catch (error) {
      if (!isAxiosError<ErrorResponseType>(error)) return;

      const errorResponse = error.response?.data.error;

      if (errorResponse?.code === "VALIDATION_ERROR") {
        const signUpDataKeys = [
          "user_id",
          "username",
          "password",
          "email",
        ] as const;

        signUpDataKeys.forEach((name) => {
          setError(name, { message: errorResponse?.message[name] });
        });

        setIsOpenOTPInput(false);

        return;
      }

      if (errorResponse?.code === "OTP_EXPIRED") {
        setIsOtpError(true);
        setOtpError("OTP has been expired");

        return;
      }

      if (errorResponse?.code === "INVALID") {
        setIsOtpError(true);
        setOtpError("OTP is invalid");

        return;
      }

      setSignupError("Failed to sign up");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={style.otp_container}>
      <div>
        <header className={style.header}>
          <BackButton onClick={() => setIsOpenOTPInput(false)} fill="#000000" />
          <span>Verify OTP</span>
        </header>

        <p className={style.text_content}>
          The OTP code has been send to your email
        </p>
      </div>

      <div>
        <OTPInput
          length={4}
          handleSubmit={signup}
          isLoading={false}
          error={otpError}
          isInvalid={isOtpError}
        />
      </div>
    </div>
  );
};

export default SignUpOTP;

interface SignUpOTPPropsType {
  setIsLoading: SetStateType<boolean>;
  setIsOpenOTPInput: SetStateType<boolean>;
  setError: UseFormSetError<SignUpData>;
  setSignupError: SetStateType<string>;
  signUpData: SignUpData;
}
