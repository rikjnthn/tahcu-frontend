"use client";

import React from "react";

import UserData from "../user-data";
import style from "./user-datas.module.scss";

const UserDatas = ({
  userId,
  username,
  email,
}: {
  username?: string;
  userId?: string;
  email?: string;
}) => {
  return (
    <div className={style.user_datas}>
      <div>
        <UserData name="Username" value={username} />
        <UserData name="User Id" value={userId} />
        <UserData name="Email" value={email} />
      </div>
    </div>
  );
};

export default UserDatas;
