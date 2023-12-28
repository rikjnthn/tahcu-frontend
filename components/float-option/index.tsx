import React from "react";

import NavOption from "../nav-option";
import style from "./float-option.module.scss";
import { useHomePageDispatch } from "@/context/home-page-context";
import { SetStateType } from "@/interface";

const FloatOption = ({ setIsOpen }: { setIsOpen: SetStateType<boolean> }) => {
  const dispact = useHomePageDispatch();

  const openCreatePrivateChat = () => {
    dispact({ type: "SET_OPEN_CREATE_PRIVATE_CHAT" });

    setIsOpen(false);
  };

  const openCreateGroup = () => {
    dispact({ type: "SET_OPEN_CREATE_GROUP" });

    setIsOpen(false);
  };
  return (
    <div className={style.float_option}>
      <NavOption
        onClick={openCreatePrivateChat}
        icon="user.svg"
        name="New Contact"
      />
      <NavOption onClick={openCreateGroup} icon="group.svg" name="New Group" />
    </div>
  );
};

export default FloatOption;
