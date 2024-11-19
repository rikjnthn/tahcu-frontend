"use client";

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";

import ChatHomePage from "@/components/chat-home-page";
import CreateGroupPage from "@/components/create-group-page";
import CreatePrivateChat from "@/components/create-private-chat";
import style from "./home-page.module.scss";
import { useHomePage } from "@/context/home-page-context";
import UserPage from "../user-page";
import SettingPage from "../setting-page";
import { CreateGroupProvider } from "@/context/create-group-context";
import { ChatType } from "@/interface";
import { useSocket } from "@/context/socket-connection-context";
import getChats from "@/util/get-chats";

const HomePage = () => {
  const {
    isOpenChatContact,
    isOpenCreateGroup,
    isOpenCreatePrivateChat,
    isOpenUserProfile,
    isOpenSetting,
  } = useHomePage();

  const messageIo = useSocket();

  const { data: chats } = useQuery<ChatType[]>({
    queryKey: ["chats"],
    queryFn: getChats,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const chatIds = chats?.map(({ id }) => id) ?? [];

    messageIo.emit("join-room", { ids: chatIds });
  }, [chats, messageIo]);

  return (
    <div className={style.home}>
      <div
        className={clsx(isOpenChatContact ? "translateX-0" : "-translateX-10")}
      >
        <ChatHomePage />
      </div>
      <div
        className={clsx(isOpenCreateGroup ? "translateX-0" : "translateX-100")}
      >
        <CreateGroupProvider>
          <CreateGroupPage />
        </CreateGroupProvider>
      </div>
      <div
        className={clsx(
          isOpenCreatePrivateChat ? "translateX-0" : "translateX-100"
        )}
      >
        <CreatePrivateChat />
      </div>
      <div
        className={clsx(isOpenUserProfile ? "translateX-0" : "translateX-100")}
      >
        <UserPage />
      </div>
      <div className={clsx(isOpenSetting ? "translateX-0" : "translateX-100")}>
        <SettingPage />
      </div>
    </div>
  );
};

export default HomePage;
