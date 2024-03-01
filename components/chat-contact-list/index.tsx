"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import ChatContact from "../chat-contact";
import style from "./chat-contact.module.scss";

const getContactList = async (): Promise<Array<any>> => {
  const { data } = await axios.get("/api/chat-contact", {
    withCredentials: true,
    withXSRFToken: true,
    xsrfCookieName: "CSRF_TOKEN",
    xsrfHeaderName: "x-csrf-token",
  });
  return data;
};

const getUserData = async () => {
  const { data } = await axios.get("/api/users", {
    withCredentials: true,
    withXSRFToken: true,
    xsrfCookieName: "CSRF_TOKEN",
    xsrfHeaderName: "x-csrf-token",
  });

  return data;
};

const ChatContactList = () => {
  const { data: contact } = useQuery({
    queryKey: ["contactList"],
    queryFn: getContactList,
  });

  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: getUserData,
  });

  return (
    <ul className={style.chat_contact_list}>
      {contact
        ? contact.map(({ id, user_id, friends, user }) => (
            <ChatContact
              key={id}
              to={id}
              message=""
              name={
                user_id === userData?.user_id ? friends.username : user.username
              }
              unread={0}
            />
          ))
        : null}
    </ul>
  );
};

export default ChatContactList;
