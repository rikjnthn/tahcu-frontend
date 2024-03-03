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
  SetStateType,
  UserDataType,
} from "@/interface";

const handlePrivateChat = ({
  contactId,
  setName,
  contacts,
  userData,
}: {
  contactId: string;
  contacts?: ContactType[];
  userData?: UserDataType;
  setName: SetStateType<string>;
}) => {
  if (!contacts) return;
  if (!userData) return;

  const contact = contacts.find((val) => val.id === contactId);

  if (!contact) return;

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

const ChatPage = ({ contactId }: { contactId: string }) => {
  const [isOpenHeader, setIsOpenHeader] = useState<boolean>(false);
  const [isRouteChangeComplete, setIsRouteChangeComplete] =
    useState<boolean>(false);
  const [name, setName] = useState<string>("tes");
  const [isGroup, setIsGroup] = useState<boolean>(false);

  useEffect(() => {
    setIsRouteChangeComplete(true);
  }, [contactId]);

  const queryClient = useQueryClient();

  const contacts = queryClient.getQueryData<ContactType[]>(["contactList"]);
  const groups = queryClient.getQueryData<GroupType[]>(["groupList"]);
  const userData = queryClient.getQueryData<UserDataType>(["userData"]);

  useEffect(() => {
    if (!groups) return;

    const group = groups.find(({ id }) => id === contactId);

    if (group) handleGroupChat({ setIsGroup, group, setName });
    else handlePrivateChat({ contacts, userData, setName, contactId });
  }, [contactId, contacts, userData, groups]);

  return (
    <ChatPageProvider
      stateContext={{ isOpenHeader, isRouteChangeComplete }}
      dispatchContext={{ setIsOpenHeader, setIsRouteChangeComplete }}
    >
      <div className={style.chat_page}>
        <div
          className={`z-1 ${isOpenHeader ? "translateX-0" : "translateX-100"}`}
        >
          <ChatProfile name={name} isGroup={isGroup} />
        </div>
        <div
          className={`${
            isRouteChangeComplete ? "translateX-0" : "translateX-100"
          }`}
        >
          <ChatProvider>
            <Chat name={name} />
          </ChatProvider>
        </div>
      </div>
    </ChatPageProvider>
  );
};

export default ChatPage;
