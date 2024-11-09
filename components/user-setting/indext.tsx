"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

import style from "./user-setting.module.scss";
import { GroupType } from "@/interface";
import ChangePasswordSetting from "../change-password-setting";
import ChangeEmailSetting from "../change-email-setting";

const UserSetting = () => {
  const router = useRouter();

  const { mutate: deleteAccount } = useMutation<
    AxiosResponse,
    AxiosError,
    void
  >({
    mutationKey: ["deleteAccount"],
    mutationFn: async () => axios.delete("/api/users"),
  });

  const queryClient = useQueryClient();

  const groups = queryClient.getQueryData<GroupType[]>(["groups"]);

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

  return (
    <div className={style.user_setting}>
      <span>Account</span>

      <div>
        <ChangeEmailSetting />
      </div>

      <div>
        <ChangePasswordSetting />
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
