import React from "react";

import UserData from "../user-data";
import style from "./user-datas.module.scss";

const UserDatas = () => {
  return (
    <div className={style.user_datas}>
      <div>
        <UserData name="Username" value="User" />
        <UserData name="User Id" value="User123" />
        <UserData name="Phone" value="0812345678" />
      </div>
    </div>
  );
};

export default UserDatas;
