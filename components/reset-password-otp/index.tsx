"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios, { isAxiosError } from "axios";

import style from "./reset-password-otp.module.scss";
import OTPInput from "../otp-input";
import BackButton from "../back-button";
import { ErrorResponseType, SetStateType } from "@/interface";
import { UseFormSetError } from "react-hook-form";

const ResetPasswordOtp = ({
  resetPwData,
  setIsLoading,
  setError,
  setIsOpenOTP,
  setResetPwError,
}: ResetPasswordOtpPropsType) => {
  const [isOtpError, setIsOtpError] = useState<boolean>(false);
  const [otpError, setOtpError] = useState<string>("");

  const router = useRouter();

  const resetPassword = async (otp: string) => {
    try {
      setIsLoading(true);
      setIsOtpError(false);
      setOtpError("");

      const { email, new_password } = resetPwData;

      const bodyData = { email, password: new_password, otp };

      await axios.post("/api/reset-password", bodyData);

      router.push("/a");
    } catch (error) {
      if (!isAxiosError<ErrorResponseType>(error)) return;

      const errorResponse = error.response?.data.error;

      if (errorResponse?.code === "VALIDATION_ERROR") {
        setError("email", { message: errorResponse?.message.email });
        setError("new_password", {
          message: errorResponse?.message.new_password,
        });

        setIsOpenOTP(false);
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

      setResetPwError("Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={style.otp_container}>
      <div>
        <header className={style.header}>
          <BackButton onClick={() => setIsOpenOTP(false)} fill="#000000" />
          <span>Verify OTP</span>
        </header>

        <p className={style.text_content}>
          The OTP code has been send to your email
        </p>
      </div>

      <div>
        <OTPInput
          length={4}
          handleSubmit={resetPassword}
          isLoading={false}
          error={otpError}
          isInvalid={isOtpError}
        />
      </div>
    </div>
  );
};

export default ResetPasswordOtp;

interface ResetPasswordDataType {
  email: string;
  new_password: string;
  confirm_password: string;
}

interface ResetPasswordOtpPropsType {
  resetPwData: ResetPasswordDataType;
  setIsLoading: SetStateType<boolean>;
  setIsOpenOTP: SetStateType<boolean>;
  setError: UseFormSetError<ResetPasswordDataType>;
  setResetPwError: SetStateType<string>;
}
