"use client";
import React from "react";
import { useQueryClient } from "@tanstack/react-query";

import CreatePrivateChatHeader from "../create-private-chat-header";
import NewContactOption from "../new-contact-option";
import { ChatType, UserDataType } from "@/interface";
import ChatContact from "../chat-contact";

const CreatePrivateChat = () => {
  const queryClient = useQueryClient();

  const chats = queryClient.getQueryData<ChatType[]>(["chats"]);
  const contacts = chats?.filter((chat) => chat.type === "Contact");

  const userData = queryClient.getQueryData<UserDataType>(["userData"]);

  return (
    <div>
      <CreatePrivateChatHeader />
      <ul>
        {contacts?.map(({ friends, id, user_id, user }) => (
          <ChatContact
            key={id}
            to={id}
            message=""
            name={
              user_id === userData?.user_id ? friends?.username : user.username
            }
            unread={0}
          />
        ))}
      </ul>
      <NewContactOption />
    </div>
  );
};

export default CreatePrivateChat;
