import React from "react";

import style from "./user-setting.module.scss";

const UserSetting = () => {
  return (
    <div className={style.user_setting}>
      <span>Account</span>

      <div>
        <div className={style.delete_account}>Delete account</div>
      </div>
    </div>
  );
};

export default UserSetting;
