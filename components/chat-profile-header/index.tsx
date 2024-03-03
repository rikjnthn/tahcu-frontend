"use client";

import React from "react";

import BackButton from "../back-button";
import EditButton from "../edit-button";
import style from "./chat-profile-header.module.scss";
import { SetStateType } from "@/interface";
import { useChatPageDispatch } from "@/context/chat-page-context";

const ChatProfileHeader = ({
  name,
  isGroup,
  setIsOpenModal,
}: {
  name: string;
  isGroup?: boolean;
  setIsOpenModal?: SetStateType<boolean>;
}) => {
  const { setIsOpenHeader } = useChatPageDispatch();

  return (
    <header className={style.header}>
      <BackButton onClick={() => setIsOpenHeader(false)} fill="#000" />
      <span>{name}</span>
      {isGroup && setIsOpenModal ? (
        <EditButton onClick={() => setIsOpenModal(true)} stroke="#000" />
      ) : null}
    </header>
  );
};

export default ChatProfileHeader;
