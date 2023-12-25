import React from "react";

import NavOption from "../nav-option";
import style from "./float-option.module.scss";

const FloatOption = () => {
  return (
    <div className={style.float_option}>
      <NavOption icon="user.svg" name="New Contact" />
      <NavOption icon="group.svg" name="New Group" />
    </div>
  );
};

export default FloatOption;
