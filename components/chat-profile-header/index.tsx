"use client";
import React from "react";
import { useQueryClient } from "@tanstack/react-query";

import BackButton from "../back-button";
import EditButton from "../edit-button";
import style from "./chat-profile-header.module.scss";
import { ChatType, SetStateType, UserDataType } from "@/interface";
import { useChatPage, useChatPageDispatch } from "@/context/chat-page-context";
import { useDarkMode } from "@/context/dark-mode-context";
import { useURLHash } from "@/context/url-hash-context";

const ChatProfileHeader = ({
  setIsOpenModal,
}: {
  setIsOpenModal?: SetStateType<boolean>;
}) => {
  const { hash: chatId } = useURLHash();
  const { isDark } = useDarkMode();
  const { isGroup, name } = useChatPage();
  const { setIsOpenHeader } = useChatPageDispatch();

  const queryClient = useQueryClient();

  const userData = queryClient.getQueryData<UserDataType>(["userData"]);
  const chats = queryClient.getQueryData<ChatType[]>(["chats"]);
  const foundChat = chats?.find((chat) => chat.id === chatId);
  const group = foundChat?.type === "Group" ? foundChat : undefined;

  const isAdmin = userData?.user_id === group?.admin_id;
  return (
    <header className={style.header}>
      <BackButton
        onClick={() => setIsOpenHeader(false)}
        fill={isDark ? "#ffffff" : "#000000"}
        title="Close"
      />
      <span>{name}</span>
      {isAdmin && isGroup && setIsOpenModal ? (
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
