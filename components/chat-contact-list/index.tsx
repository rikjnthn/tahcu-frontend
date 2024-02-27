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

const ChatContactList = () => {
  const { data } = useQuery({
    queryKey: ["contactList"],
    queryFn: getContactList,
  });

  return (
    <ul className={style.chat_contact_list}>
      {data
        ? data.map((val) => (
            <ChatContact
              key={val.id}
              to="t"
              message="lorem"
              name="John"
              unread={0}
            />
          ))
        : null}
    </ul>
  );
};

export default ChatContactList;
