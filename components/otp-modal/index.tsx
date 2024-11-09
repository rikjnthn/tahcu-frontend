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
  setChangeEmailErrorMessage,
  setError,
  email,
}: ChangeOtpModalPropsType) => {
  const [otpErrorMessage, setOtpErrorMessage] = useState<string>("");

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

    setChangeEmailErrorMessage("");
    setOtpErrorMessage("");

    mutate(changeEmailData, {
      onError(error) {
        if (error.response?.status === 429) {
          setChangeEmailErrorMessage(
            "You have sent too many requests to the server"
          );
          return;
        }

        if (error.response?.data.error.code === "VALIDATION_ERROR") {
          setError("email", {
            message: error.response.data.error.message.email,
          });
          return;
        }

        if (error.response?.data.error.code === "INVALID") {
          setOtpErrorMessage("OTP is not valid");
          return;
        }

        if (error.response?.data.error.code === "OTP_EXPIRED") {
          setOtpErrorMessage("OTP has expired");
          return;
        }

        setChangeEmailErrorMessage("Failed to change email");
      },

      async onSuccess(data) {
        queryClient.setQueryData(["userData"], data);
        await queryClient.invalidateQueries({
          queryKey: ["userData"],
        });

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
            error={otpErrorMessage}
            isInvalid={otpErrorMessage.length > 0}
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
  setChangeEmailErrorMessage: SetStateType<string>;
  setError: UseFormSetError<Omit<ChangeEmailDataType, "otp">>;
  email: string;
}
