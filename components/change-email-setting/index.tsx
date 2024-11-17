import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import isEmail from "validator/lib/isEmail";

import style from "./change-email-setting.module.scss";
import Input from "../input";
import SubmitButton from "../submit-button";
import { ErrorResponseType, UserDataType } from "@/interface";
import { useHomePage } from "@/context/home-page-context";
import OTPModal from "../otp-modal";

const ChangeEmailSetting = () => {
  const [changeEmailError, setChangeEmailError] = useState<string>("");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const { register, handleSubmit, reset, clearErrors, getValues, setError } =
    useForm<ChangeEmailDataType>();

  const { mutate, isError, isPending } = useMutation<
    AxiosResponse,
    AxiosError<ErrorResponseType>,
    GetOtpDataType
  >({
    mutationKey: ["requestOTP"],
    mutationFn: async (data) => axios.post("/api/send-otp", data),
  });

  const { isOpenSetting } = useHomePage();
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData<UserDataType>(["userData"]);

  useEffect(() => {
    clearErrors();
    reset();
  }, [isOpenSetting, clearErrors, reset]);

  const onSubmit = (data: ChangeEmailDataType) => {
    if (data.email === userData?.email) return;

    setChangeEmailError("");

    mutate(data, {
      onError(error) {
        const errorResponse = error.response?.data.error;

        if (errorResponse?.code === "TOO_MANY_REQUESTS") {
          setChangeEmailError("You have sent too many requests");
          return;
        }

        if (errorResponse?.code === "DUPLICATE_VALUE") {
          setError("email", { message: "OTP has been expired" });
          return;
        }

        setChangeEmailError("Failed to change email");
      },

      onSuccess() {
        setIsOpenModal(true);
      },
    });
  };

  return (
    <div>
      <div>Change Email</div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={style.change_email_form}
      >
        <Input
          labelName="Email"
          type="email"
          placeholder="Email"
          aria-invalid={isError}
          {...register("email", {
            required: {
              value: true,
              message: "Please enter your new email",
            },
            validate: {
              isEmail: (v: string) => {
                if (!isEmail(v)) return "Email is not valid";
              },
            },
            value: userData?.email,
          })}
        />

        {changeEmailError.length > 0 && (
          <span className={style.change_email_error}>{changeEmailError}</span>
        )}

        <SubmitButton name="Change" isLoading={isPending} />
      </form>

      {isOpenModal && (
        <OTPModal
          setIsOpenModal={setIsOpenModal}
          setChangeEmailError={setChangeEmailError}
          setError={setError}
          email={getValues("email")}
        />
      )}
    </div>
  );
};

export default ChangeEmailSetting;

interface GetOtpDataType {
  email: string;
}

interface ChangeEmailDataType {
  email: string;
}
