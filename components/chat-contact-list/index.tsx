"use client";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import ChatContact from "../chat-contact";
import style from "./chat-contact.module.scss";
import { ContactType, GroupType, UserDataType } from "@/interface";

const getUserData = async () => {
  const { data } = await axios.get<UserDataType>("/api/users", {
    withCredentials: true,
    withXSRFToken: true,
    xsrfCookieName: "CSRF_TOKEN",
    xsrfHeaderName: "x-csrf-token",
  });

  return data;
};

const ChatContactList = () => {
  const { data: userData } = useQuery<UserDataType>({
    queryKey: ["userData"],
    queryFn: getUserData,
  });

  const queryClient = useQueryClient();

  const contacts = queryClient.getQueryData<ContactType[]>(["contactList"]);
  const groups = queryClient.getQueryData<GroupType[]>(["groupList"]);

  return (
    <ul className={style.chat_contact_list}>
      {contacts && userData
        ? contacts.map(({ id, user_id, friends, user }) => (
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

      {groups
        ? groups.map(({ id, name }) => (
            <ChatContact key={id} to={id} message="" name={name} unread={0} />
          ))
        : null}
    </ul>
  );
};

export default ChatContactList;
