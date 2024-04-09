"use client";

import React from "react";

import BackButton from "../back-button";
import EditButton from "../edit-button";
import style from "./chat-profile-header.module.scss";
import { SetStateType } from "@/interface";
import { useChatPage, useChatPageDispatch } from "@/context/chat-page-context";
import { useDarkMode } from "@/context/dark-mode-context";

const ChatProfileHeader = ({
  setIsOpenModal,
}: {
  setIsOpenModal?: SetStateType<boolean>;
}) => {
  const { isDark } = useDarkMode();
  const { isGroup, name } = useChatPage();
  const { setIsOpenHeader } = useChatPageDispatch();

  return (
    <header className={style.header}>
      <BackButton
        onClick={() => setIsOpenHeader(false)}
        fill={isDark ? "#ffffff" : "#000000"}
        title="Close"
      />
      <span>{name}</span>
      {isGroup && setIsOpenModal ? (
        <EditButton
          onClick={() => setIsOpenModal(true)}
          stroke={isDark ? "#ffffff" : "#000000"}
          title="Edit group"
        />
      ) : null}
    </header>
  );
};

export default ChatProfileHeader;
