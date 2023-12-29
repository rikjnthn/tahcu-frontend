"use client";

import React from "react";

import BackButton from "../back-button";
import EditButton from "../edit-button";
import style from "./chat-profile-header.module.scss";
import { SetStateType } from "@/interface";

const ChatProfileHeader = ({
  setOpenHeader,
  setOpenModal,
}: {
  setOpenHeader: SetStateType<boolean>;
  setOpenModal: SetStateType<boolean>;
}) => {
  return (
    <header className={style.header}>
      <BackButton onClick={() => setOpenHeader(false)} fill="#000" />
      <span>Group</span>
      <EditButton onClick={() => setOpenModal(true)} stroke="#000" />
    </header>
  );
};

export default ChatProfileHeader;
