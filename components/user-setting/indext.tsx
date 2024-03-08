import React from "react";

import style from "./user-setting.module.scss";
import { SetStateType } from "@/interface";

const UserSetting = ({
  setIsOpenModal,
}: {
  setIsOpenModal: SetStateType<boolean>;
}) => {
  return (
    <div className={style.user_setting}>
      <span>Account</span>

      <div>
        <div
          onClick={() => setIsOpenModal(true)}
          className={style.delete_account}
        >
          Delete account
        </div>
      </div>
    </div>
  );
};

export default UserSetting;
