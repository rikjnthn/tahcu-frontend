"use client";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import Chat from "@/components/chat";
import ChatProfile from "@/components/chat-profile";
import style from "./chat-page.module.scss";
import { ChatPageProvider } from "@/context/chat-page-context";
import { ChatProvider } from "@/context/chat-context";
import {
  ContactType,
  GroupType,
  GroupWithMembershipType,
  SetStateType,
  UserDataType,
} from "@/interface";
import { useURLHash } from "@/context/url-hash-context";

const handlePrivateChat = ({
  setName,
  contact,
  userData,
}: {
  contact?: ContactType;
  userData?: UserDataType;
  setName: SetStateType<string>;
}) => {
  if (!contact || !userData) return;

  const { user_id, friends, user } = contact;

  const name = user_id === userData.user_id ? friends.username : user.username;
  setName(name);
};

const handleGroupChat = ({
  group,
  setIsGroup,
  setName,
}: {
  setIsGroup: SetStateType<boolean>;
  group: GroupType;
  setName: SetStateType<string>;
}) => {
  setIsGroup(true);
  setName(group.name);
};

const ChatPage = () => {
  const [isOpenHeader, setIsOpenHeader] = useState<boolean>(false);
  const [isRouteChangeComplete, setIsRouteChangeComplete] =
    useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [isGroup, setIsGroup] = useState<boolean>(false);

  const { hash: chatId } = useURLHash();

  useEffect(() => {
    setIsRouteChangeComplete(true);
  }, [chatId]);

  const queryClient = useQueryClient();

  const contacts = queryClient.getQueryData<ContactType[]>(["contactList"]);
  const groups = queryClient.getQueryData<GroupWithMembershipType[]>([
    "groupList",
  ]);
  const userData = queryClient.getQueryData<UserDataType>(["userData"]);

  const group = groups?.find((group) => group.id === chatId);
  const contact = contacts?.find((contact) => contact.id === chatId);

  useEffect(() => {
    if (group) handleGroupChat({ setIsGroup, group, setName });
    else handlePrivateChat({ contact, userData, setName });
  }, [chatId, contact, userData, group]);

  return (
    <ChatPageProvider
      stateContext={{ isOpenHeader, isRouteChangeComplete, isGroup, name }}
      dispatchContext={{ setIsOpenHeader, setIsRouteChangeComplete }}
    >
      <div className={style.chat_page}>
        <div
          className={`z-1 ${isOpenHeader ? "translateX-0" : "translateX-100"}`}
        >
          <ChatProfile />
        </div>
        <div
          className={`${
            isRouteChangeComplete ? "translateX-0" : "translateX-100"
          }`}
        >
          <ChatProvider>
            <Chat />
          </ChatProvider>
        </div>
      </div>
    </ChatPageProvider>
  );
};

export default ChatPage;
