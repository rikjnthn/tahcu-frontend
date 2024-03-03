"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import ChatContact from "../chat-contact";
import style from "./chat-contact.module.scss";
import { ContactType, GroupType, UserDataType } from "@/interface";

const getContactList = async (): Promise<Array<any>> => {
  const { data } = await axios.get<ContactType[]>("/api/chat-contact", {
    withCredentials: true,
    withXSRFToken: true,
    xsrfCookieName: "CSRF_TOKEN",
    xsrfHeaderName: "x-csrf-token",
  });
  return data;
};

const getUserData = async () => {
  const { data } = await axios.get<UserDataType>("/api/users", {
    withCredentials: true,
    withXSRFToken: true,
    xsrfCookieName: "CSRF_TOKEN",
    xsrfHeaderName: "x-csrf-token",
  });

  return data;
};

const getGroupList = async () => {
  const { data } = await axios.get<GroupType[]>("/api/group", {
    withCredentials: true,
    withXSRFToken: true,
    xsrfCookieName: "CSRF_TOKEN",
    xsrfHeaderName: "x-csrf-token",
  });

  return data;
};

const ChatContactList = () => {
  const { data: contact } = useQuery<ContactType[]>({
    queryKey: ["contactList"],
    queryFn: getContactList,
  });

  const { data: group } = useQuery<GroupType[]>({
    queryKey: ["groupList"],
    queryFn: getGroupList,
  });

  const { data: userData } = useQuery<UserDataType>({
    queryKey: ["userData"],
    queryFn: getUserData,
  });

  return (
    <ul className={style.chat_contact_list}>
      {contact && userData
        ? contact.map(({ id, user_id, friends, user }) => (
            <ChatContact
              key={id}
              to={id}
              message=""
              name={
                user_id === userData.user_id ? friends.username : user.username
              }
              unread={0}
            />
          ))
        : null}

      {group
        ? group.map(({ id, name }) => (
            <ChatContact key={id} to={id} message="" name={name} unread={0} />
          ))
        : null}
    </ul>
  );
};

export default ChatContactList;
