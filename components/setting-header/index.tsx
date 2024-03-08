import React from "react";

import { useHomePageDispatch } from "@/context/home-page-context";
import BackButton from "../back-button";
import style from "./setting-header.module.scss";

const SettingHeader = () => {
  const dispatch = useHomePageDispatch();

  return (
    <header className={style.header}>
      <BackButton
        onClick={() => dispatch({ type: "SET_OPEN_CHAT_CONTACT" })}
        fill="#000"
      />
      <span>Setting</span>
    </header>
  );
};

export default SettingHeader;
