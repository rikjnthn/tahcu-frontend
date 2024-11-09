import React from "react";

import NavOption from "../nav-option";
import style from "./float-option.module.scss";
import { useHomePageDispatch } from "@/context/home-page-context";
import { SetStateType } from "@/interface";
import { useDarkMode } from "@/context/dark-mode-context";

const FloatOption = ({ setIsOpen }: { setIsOpen: SetStateType<boolean> }) => {
  const { isDark } = useDarkMode();
  const dispact = useHomePageDispatch();

  const openCreatePrivateChat = () => {
    dispact({ type: "OPEN_CREATE_PRIVATE_CHAT" });

    setIsOpen(false);
  };

  const openCreateGroup = () => {
    dispact({ type: "OPEN_CREATE_GROUP" });

    setIsOpen(false);
  };
  return (
    <div className={style.float_option}>
      <NavOption
        onClick={openCreatePrivateChat}
        icon={isDark ? "user-white.svg" : "user-black.svg"}
        name="New Contact"
      />
      <NavOption
        onClick={openCreateGroup}
        icon={isDark ? "group-white.svg" : "group-black.svg"}
        name="New Group"
      />
    </div>
  );
};

export default FloatOption;
