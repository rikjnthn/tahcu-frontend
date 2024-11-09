import React from "react";

import BackButton from "../back-button";
import style from "./create-private-chat-header.module.scss";
import { useHomePageDispatch } from "@/context/home-page-context";
import { useDarkMode } from "@/context/dark-mode-context";

const CreatePrivateChatHeader = () => {
  const { isDark } = useDarkMode();
  const dispatch = useHomePageDispatch();

  const openChatContact = () => {
    dispatch({ type: "OPEN_CHAT_CONTACT" });
  };
  return (
    <header className={style.header}>
      <BackButton
        onClick={openChatContact}
        fill={isDark ? "#ffffff" : "#000000"}
        title="Back"
      />
      <span>Contact</span>
    </header>
  );
};

export default CreatePrivateChatHeader;
