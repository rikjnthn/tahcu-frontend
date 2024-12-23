"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

import style from "./user-setting.module.scss";
import ChangePasswordSetting from "../change-password-setting";
import ChangeEmailSetting from "../change-email-setting";
import cookieParser from "@/util/cookie-parser";

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

  const handleDeleteAccount = () => {
    deleteAccount(undefined, {
      onSuccess() {
        if (typeof localStorage !== "undefined") {
          localStorage.clear();
        }

        const cookies = cookieParser(document.cookie);

        for (const cookieName in cookies) {
          document.cookie = `${cookieName}=${
            cookies[cookieName]
          }; expires=${new Date(0).toUTCString()};`;
        }

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
