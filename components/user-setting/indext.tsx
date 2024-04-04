"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import style from "./user-setting.module.scss";
import { GroupType } from "@/interface";

const UserSetting = () => {
  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ["deleteAccount"],
    mutationFn: async () => axios.delete("/api/users"),
  });

  const queryClient = useQueryClient();
  const groups = queryClient.getQueryData<GroupType[]>(["groupList"]);

  const deleteAccount = () => {
    if (groups && groups.length > 0) {
      alert("Exit from all joined groups before delete your account");

      return;
    }

    mutate();
    router.push("/");
  };

  return (
    <div className={style.user_setting}>
      <span>Account</span>

      <div>
        <div
          onClick={deleteAccount}
          className={style.delete_account}
          title="Delete account"
        >
          Delete account
        </div>
      </div>
    </div>
  );
};

export default UserSetting;
