"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
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
    getValues,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordDataType>();

  const { mutate: deleteAccount } = useMutation({
    mutationKey: ["deleteAccount"],
    mutationFn: async () => axios.delete("/api/users"),
  });

  const {
    mutate: changePassword,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ["changePassword"],
    mutationFn: async (data: Pick<ChangePasswordDataType, "new_password">) =>
      axios.patch("/api/users/change-password", data),
  });

  const queryClient = useQueryClient();
  const { isOpenSetting } = useHomePage();

  const groups = queryClient.getQueryData<GroupType[]>(["groupList"]);

  useEffect(() => {
    clearErrors();
  }, [isOpenSetting, clearErrors]);

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
    const { new_password } = data;

    changePassword(
      { new_password },
      {
        onSuccess() {
          reset();
        },
      }
    );
  };

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

            <Input
              labelName="Confirm Password"
              errorMessage={errors.confirm_password?.message?.toString()}
              type="password"
              placeholder="Confirm password"
              {...register("confirm_password", {
                required: {
                  value: true,
                  message: "Please enter your confirm password",
                },

                validate: {
                  isSameWithConfirmPassword: (confirm_password: string) => {
                    const newPassword = getValues("new_password");
                    if (confirm_password === newPassword) return true;

                    return "New password and confirm password does not match";
                  },
                },
              })}
            />

            {isError && (
              <em className={style.change_password_error}>
                Failed to change password
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
  confirm_password: string;
}
