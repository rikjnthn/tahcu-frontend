"use client";
import React, { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseFormSetError } from "react-hook-form";

import style from "./otp-modal.module.scss";
import Modal from "../modal";
import CloseButton from "../close-button";
import { useDarkMode } from "@/context/dark-mode-context";
import { ErrorResponseType, SetStateType, UserDataType } from "@/interface";
import OTPInput from "../otp-input";

const OTPModal = ({
  setIsOpenModal,
  setChangeEmailError,
  setError,
  email,
}: ChangeOtpModalPropsType) => {
  const [otpError, setOtpError] = useState<string>("");

  const { mutate, isPending } = useMutation<
    AxiosResponse<UserDataType>,
    AxiosError<ErrorResponseType>,
    ChangeEmailDataType
  >({
    mutationKey: ["verify-otp-then-change-email"],
    mutationFn: async (data) => axios.patch("/api/users/change-email", data),
  });

  const queryClient = useQueryClient();
  const { isDark } = useDarkMode();

  const onSubmit = (otp: string) => {
    const changeEmailData = { otp, email };

    setChangeEmailError("");
    setOtpError("");

    mutate(changeEmailData, {
      onError(error) {
        const errorResponse = error.response?.data.error;

        if (errorResponse?.code === "TOO_MANY_REQUESTS") {
          setChangeEmailError("You have sent too many requests");
          return;
        }

        if (errorResponse?.code === "VALIDATION_ERROR") {
          setError("email", {
            message: errorResponse?.message.email,
          });
          return;
        }

        if (errorResponse?.code === "INVALID") {
          setOtpError("OTP is not valid");
          return;
        }

        if (errorResponse?.code === "OTP_EXPIRED") {
          setOtpError("OTP has expired");
          return;
        }

        setChangeEmailError("Failed to change email");
      },

      onSuccess(data) {
        if (typeof localStorage !== "undefined") {
          localStorage.setItem("user", JSON.stringify(data.data));
        }

        queryClient.setQueryData(["userData"], data.data);

        setIsOpenModal(false);
      },
    });
  };

  return (
    <Modal
      setIsOpenModal={setIsOpenModal}
      onClick={(e) => {
        if (e.currentTarget === e.target) setIsOpenModal(false);
      }}
    >
      <div className={style.otp_container}>
        <div>
          <header className={style.header}>
            <CloseButton
              onClick={() => setIsOpenModal(false)}
              stroke={isDark ? "#ffffff" : "#000000"}
            />
            <span>Verify OTP</span>
          </header>

          <p className={style.text_content}>
            The OTP code has been send to your email
          </p>
        </div>

        <div>
          <OTPInput
            length={4}
            handleSubmit={onSubmit}
            isLoading={isPending}
            error={otpError}
            isInvalid={otpError.length > 0}
            autoFocus
          />
        </div>
      </div>
    </Modal>
  );
};

export default OTPModal;

interface ChangeEmailDataType {
  otp: string;
  email: string;
}

interface ChangeOtpModalPropsType {
  setIsOpenModal: SetStateType<boolean>;
  setChangeEmailError: SetStateType<string>;
  setError: UseFormSetError<Omit<ChangeEmailDataType, "otp">>;
  email: string;
}
