"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useForm } from "react-hook-form";

import style from "./user-setting.module.scss";
import { GroupType } from "@/interface";
import Input from "../input";
import SubmitButton from "../submit-button";
import { useHomePage } from "@/context/home-page-context";

const UserSetting = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordDataType>();

  const { mutate: deleteAccount } = useMutation<
    AxiosResponse,
    AxiosError,
    void
  >({
    mutationKey: ["deleteAccount"],
    mutationFn: async () => axios.delete("/api/users"),
  });

  const {
    mutate: changePassword,
    isPending,
    isError,
    failureReason,
  } = useMutation<AxiosResponse, AxiosError, ChangePasswordDataType>({
    mutationKey: ["changePassword"],
    mutationFn: async (data) => axios.patch("/api/users/change-password", data),
  });

  const queryClient = useQueryClient();
  const { isOpenSetting } = useHomePage();

  const groups = queryClient.getQueryData<GroupType[]>(["groupList"]);

  useEffect(() => {
    clearErrors();
    reset();
  }, [isOpenSetting, clearErrors, reset]);

  const handleDeleteAccount = () => {
    if (groups && groups.length > 0) {
      alert("Exit from all joined groups before delete your account");

      return;
    }

    deleteAccount(undefined, {
      onSuccess() {
        router.push("/");
      },
    });
  };

  const onSubmit = (data: ChangePasswordDataType) => {
    changePassword(data, {
      onSuccess() {
        reset();
      },
    });
  };

  const changePasswordStatus = failureReason?.response?.status;

  return (
    <div className={style.user_setting}>
      <span>Account</span>

      <div>
        <div>
          <div>Change Password</div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className={style.change_password_form}
          >
            <Input
              labelName="Current Password"
              errorMessage={errors.current_password?.message?.toString()}
              type="password"
              placeholder="Confirm password"
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
                  message:
                    "Maximum password length exceeded (Maximum 64 letters)",
                },
              })}
            />

            <Input
              labelName="New Password"
              errorMessage={errors.new_password?.message?.toString()}
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
                  message:
                    "Maximum password length exceeded (Maximum 64 letters)",
                },
              })}
            />

            {isError && (
              <em className={style.change_password_error}>
                {changePasswordStatus === 429
                  ? "Too much request"
                  : "Failed to change password"}
              </em>
            )}

            <SubmitButton name="Confrim" isLoading={isPending} />
          </form>
        </div>
      </div>

      <div>
        <div>
          <div>Delete Account</div>
          <p className={style.delete_account_information}>
            Deleting your account will delete your account information, all your
            contacts and messages.
          </p>
        </div>

        <button
          onClick={handleDeleteAccount}
          className={style.user_setting_button}
          title="Delete account"
        >
          Delete account
        </button>
      </div>
    </div>
  );
};

export default UserSetting;

interface ChangePasswordDataType {
  new_password: string;
  current_password: string;
}
