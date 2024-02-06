"use client";

import React from "react";

import BackButton from "../back-button";
import EditButton from "../edit-button";
import style from "./chat-profile-header.module.scss";
import { SetStateType } from "@/interface";

const ChatProfileHeader = ({
  name,
  isGroup,
  setOpenHeader,
  setOpenModal,
}: {
  name: string;
  isGroup?: boolean;
  setOpenHeader: SetStateType<boolean>;
  setOpenModal?: SetStateType<boolean>;
}) => {
  return (
    <header className={style.header}>
      <BackButton onClick={() => setOpenHeader(false)} fill="#000" />
      <span>{name}</span>
      {isGroup && setOpenModal ? (
        <EditButton onClick={() => setOpenModal(true)} stroke="#000" />
      ) : null}
    </header>
  );
};

export default ChatProfileHeader;
