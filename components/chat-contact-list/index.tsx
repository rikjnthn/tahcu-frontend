"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import ChatContact from "../chat-contact";
import style from "./chat-contact.module.scss";
import { ChatType, UserDataType } from "@/interface";
import getUserData from "@/util/get-user-data";

const ChatContactList = () => {
  const { data: userData } = useQuery<UserDataType>({
    queryKey: ["userData"],
    queryFn: getUserData,
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();

  const chats = queryClient.getQueryData<ChatType[]>(["chats"]);

  return (
    <ul className={style.chat_contact_list}>
      {chats?.map((chat) => {
        if (chat.type === "Contact") {
          const { id, friends, user, user_id } = chat;

          const name =
            user_id === userData?.user_id ? friends.username : user.username;

          return (
            <ChatContact key={id} to={id} message="" name={name} unread={0} />
          );
        }

        const { id, name } = chat;

        return (
          <ChatContact key={id} to={id} message="" name={name} unread={0} />
        );
      })}
    </ul>
  );
};

export default ChatContactList;
