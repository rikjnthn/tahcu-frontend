import React from "react";

import { useHomePageDispatch } from "@/context/home-page-context";
import BackButton from "../back-button";
import style from "./setting-header.module.scss";
import { useDarkMode } from "@/context/dark-mode-context";

const SettingHeader = () => {
  const { isDark } = useDarkMode();
  const dispatch = useHomePageDispatch();

  return (
    <header className={style.header}>
      <BackButton
        onClick={() => dispatch({ type: "OPEN_CHAT_CONTACT" })}
        fill={isDark ? "#ffffff" : "#000000"}
        title="Back"
      />
      <span>Setting</span>
    </header>
  );
};

export default SettingHeader;
