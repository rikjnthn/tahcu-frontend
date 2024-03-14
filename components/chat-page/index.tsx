"use client";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

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

const getGroup = async ({ queryKey }: { queryKey: string[] }) => {
  const [_, contactId] = queryKey;

  const { data } = await axios.get<GroupWithMembershipType>(
    `/api/group/${contactId}`,
    {
      withCredentials: true,
      withXSRFToken: true,
      xsrfCookieName: "CSRF_TOKEN",
      xsrfHeaderName: "x-csrf-token",
    }
  );

  return data;
};

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
  const [name, setName] = useState<string>("");
  const [isGroup, setIsGroup] = useState<boolean>(false);

  useEffect(() => {
    setIsRouteChangeComplete(true);
  }, [contactId]);

  const { data: group } = useQuery({
    queryKey: ["group", contactId],
    queryFn: getGroup,
    retry: false,
  });

  const queryClient = useQueryClient();

  const contacts = queryClient.getQueryData<ContactType[]>(["contactList"]);
  const userData = queryClient.getQueryData<UserDataType>(["userData"]);

  useEffect(() => {
    if (group) handleGroupChat({ setIsGroup, group, setName });
    else handlePrivateChat({ contacts, userData, setName, contactId });
  }, [contactId, contacts, userData, group]);

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
            <Chat name={name} isGroup={isGroup} />
          </ChatProvider>
        </div>
      </div>
    </ChatPageProvider>
  );
};

export default ChatPage;
