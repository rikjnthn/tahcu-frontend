"use client";

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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

const getContactList = async (): Promise<Array<any>> => {
  const { data } = await axios.get<ContactType[]>("/api/chat-contact");
  return data;
};

const getGroupList = async () => {
  const { data } = await axios.get<GroupType[]>("/api/group");
  return data;
};

const HomePage = () => {
  const {
    isOpenChatContact,
    isOpenCreateGroup,
    isOpenCreatePrivateChat,
    isOpenUserProfile,
    isOpenSetting,
  } = useHomePage();

  const { groupChatIo, privateChatIo } = useSocket();

  const { data: contacts } = useQuery<ContactType[]>({
    queryKey: ["contactList"],
    queryFn: getContactList,
  });

  const { data: groups } = useQuery<GroupType[]>({
    queryKey: ["groupList"],
    queryFn: getGroupList,
  });

  useEffect(() => {
    if (!privateChatIo.connected || !groupChatIo.connected!) {
      privateChatIo.connect();
      groupChatIo.connect();
    }

    const contactIds = contacts?.map(({ id }) => id) ?? [];
    const groupIds = groups?.map(({ id }) => id) ?? [];

    privateChatIo.emit("join-room", { contact_ids: contactIds });
    groupChatIo.emit("join-room", { group_ids: groupIds });

    return () => {
      privateChatIo.disconnect();
      groupChatIo.disconnect();
    };
  }, [contacts, groups, privateChatIo, groupChatIo]);

  return (
    <div className={style.home}>
      <div
        className={`${isOpenChatContact ? "translateX-0" : "-translateX-10"}`}
      >
        <ChatHomePage />
      </div>
      <div
        className={`${isOpenCreateGroup ? "translateX-0" : "translateX-100"}`}
      >
        <CreateGroupProvider>
          <CreateGroupPage />
        </CreateGroupProvider>
      </div>
      <div
        className={`${
          isOpenCreatePrivateChat ? "translateX-0" : "translateX-100"
        }`}
      >
        <CreatePrivateChat />
      </div>
      <div
        className={`${isOpenUserProfile ? "translateX-0" : "translateX-100"}`}
      >
        <UserPage />
      </div>
      <div className={`${isOpenSetting ? "translateX-0" : "translateX-100"}`}>
        <SettingPage />
      </div>
    </div>
  );
};

export default HomePage;
