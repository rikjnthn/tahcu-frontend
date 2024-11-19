"use client";
import React from "react";
import Image from "next/image";

import NavOption from "../nav-option";
import style from "./float-option.module.scss";
import { useHomePageDispatch } from "@/context/home-page-context";
import { SetStateType } from "@/interface";
import { useDarkMode } from "@/context/dark-mode-context";
import clsx from "clsx";

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
      <div onClick={openCreatePrivateChat} className={clsx(style.option)}>
        <Image
          src={isDark ? "user-white.svg" : "user-black.svg"}
          alt="New contact"
          width={15}
          height={15}
        />
        <span>New Contact</span>
      </div>

      <div onClick={openCreateGroup} className={clsx(style.option)}>
        <Image
          src={isDark ? "group-white.svg" : "group-black.svg"}
          alt="New contact"
          width={15}
          height={15}
        />
        <span>New Group</span>
      </div>
    </div>
  );
};

export default FloatOption;
