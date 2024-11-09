import React from "react";
import { useQueryClient } from "@tanstack/react-query";

import CreatePrivateChatHeader from "../create-private-chat-header";
import NewContactOption from "../new-contact-option";
import { ContactType, UserDataType } from "@/interface";
import ChatContact from "../chat-contact";

const ContactList = () => {
  const queryClient = useQueryClient();

  const contacts = queryClient.getQueryData<ContactType[]>(["contacts"]);
  const userData = queryClient.getQueryData<UserDataType>(["userData"]);

  return (
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
  );
};

const CreatePrivateChat = () => {
  return (
    <div>
      <CreatePrivateChatHeader />
      <ContactList />
      <NewContactOption />
    </div>
  );
};

export default CreatePrivateChat;
