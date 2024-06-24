import React from "react";

import CreatePrivateChatHeader from "../create-private-chat-header";
import NewContactOption from "../new-contact-option";
import ChatContactList from "../chat-contact-list";

const CreatePrivateChat = () => {
  return (
    <div>
      <CreatePrivateChatHeader />
      <ChatContactList />
      <NewContactOption />
    </div>
  );
};

export default CreatePrivateChat;
