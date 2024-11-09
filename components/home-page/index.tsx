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
import { ContactType, GroupType } from "@/interface";
import { useSocket } from "@/context/socket-connection-context";
import getContacts from "@/util/get-contacts";
import getGroups from "@/util/get-groups";

const HomePage = () => {
  const {
    isOpenChatContact,
    isOpenCreateGroup,
    isOpenCreatePrivateChat,
    isOpenUserProfile,
    isOpenSetting,
  } = useHomePage();

  const messageIo = useSocket();

  const { data: contacts } = useQuery<ContactType[]>({
    queryKey: ["contacts"],
    queryFn: getContacts,
    refetchOnWindowFocus: false,
  });

  const { data: groups } = useQuery<GroupType[]>({
    queryKey: ["groups"],
    queryFn: getGroups,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const contactIds = contacts?.map(({ id }) => id) ?? [];
    const groupIds = groups?.map(({ id }) => id) ?? [];

    messageIo.emit("join-room", { ids: contactIds.concat(groupIds) });
  }, [contacts, groups, messageIo]);

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
