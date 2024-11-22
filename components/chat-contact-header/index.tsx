"use client";

import HamburgerButton from "../hamburger-button";
import style from "./chat-contact-header.module.scss";
import { SetStateType } from "@/interface";
import { useDarkMode } from "@/context/dark-mode-context";

const ChatContactHeader = ({
  setIsOpenNav,
}: {
  setIsOpenNav: SetStateType<boolean>;
}) => {
  const { isDark } = useDarkMode();

  return (
    <header className={style.header}>
      <div className={style.logo_and_hamburger}>
        <HamburgerButton
          onClick={() => setIsOpenNav(true)}
          fill={isDark ? "#ffffff" : "#000000"}
          title="Open navigation"
        />
        <span>Tahcu</span>
      </div>
    </header>
  );
};

export default ChatContactHeader;
