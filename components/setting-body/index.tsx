import React from "react";

import style from "./setting-body.module.scss";
import UserSetting from "../user-setting/indext";

const SettingBody = () => {
  return (
    <div className={style.body}>
      <UserSetting />
    </div>
  );
};

export default SettingBody;
