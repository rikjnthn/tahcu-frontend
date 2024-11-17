import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useForm } from "react-hook-form";

import style from "./change-password-setting.module.scss";
import Input from "../input";
import SubmitButton from "../submit-button";
import { useHomePage } from "@/context/home-page-context";
import { ErrorResponseType } from "@/interface";

const ChangePasswordSetting = () => {
  const [changePasswordErrorMessage, setChangePasswordErrorMessage] =
    useState<string>("");

  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
    setError,
  } = useForm<ChangePasswordDataType>();

  const { mutate, isPending } = useMutation<
    AxiosResponse,
    AxiosError<ErrorResponseType>,
    ChangePasswordDataType
  >({
    mutationKey: ["changePassword"],
    mutationFn: async (data) => axios.patch("/api/users/change-password", data),
  });

  const { isOpenSetting } = useHomePage();

  useEffect(() => {
    clearErrors();
    reset();
  }, [isOpenSetting, clearErrors, reset]);

  const onSubmit = (data: ChangePasswordDataType) => {
    setChangePasswordErrorMessage("");

    mutate(data, {
      onError(error) {
        const errorResponse = error.response?.data.error;

        if (errorResponse?.code === "TOO_MANY_REQUESTS") {
          setChangePasswordErrorMessage(
            "You have sent too many requests to the server."
          );

          return;
        }

        if (errorResponse?.code === "VALIDATION_ERROR") {
          setError("current_password", {
            message: errorResponse.message?.current_password,
          });
          setError("new_password", {
            message: errorResponse.message?.new_password,
          });

          return;
        }

        if (errorResponse?.code === "NOT_FOUND") {
          setChangePasswordErrorMessage("User not found");
          return;
        }

        if (errorResponse?.code === "UNAUTHORIZED") {
          setError("current_password", { message: "Wrong password" });
          return;
        }

        setChangePasswordErrorMessage("Failed to change password");
      },
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <div>
      <div>Change Password</div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={style.change_password_form}
      >
        <Input
          labelName="Current Password"
          error={errors.current_password?.message?.toString()}
          type="password"
          placeholder="Password"
          {...register("current_password", {
            required: {
              value: true,
              message: "Please enter your confirm password",
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
          })}
        />

        {changePasswordErrorMessage.length > 0 && (
          <span className={style.change_password_error}>
            {changePasswordErrorMessage}
          </span>
        )}

        <SubmitButton name="Confrim" isLoading={isPending} />
      </form>
    </div>
  );
};

export default ChangePasswordSetting;

interface ChangePasswordDataType {
  new_password: string;
  current_password: string;
}
