"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import style from "./user-setting.module.scss";

const UserSetting = () => {
  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ["deleteAccount"],
    mutationFn: async () => axios.delete("/api/users"),
  });

  const deleteAccount = () => {
    mutate();
    router.push("/");
  };

  return (
    <div className={style.user_setting}>
      <span>Account</span>

      <div>
        <div onClick={deleteAccount} className={style.delete_account}>
          Delete account
        </div>
      </div>
    </div>
  );
};

export default UserSetting;
