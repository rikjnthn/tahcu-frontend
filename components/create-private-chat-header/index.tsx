import React from "react";

import BackButton from "../back-button";
import style from "./create-private-chat-header.module.scss";
import SearchAndCreatePrivateChat from "../search-and-create-private-chat";

const CreatePrivateChatHeader = () => {
  return (
    <header className={style.header}>
      <BackButton fill="#000" />
      <SearchAndCreatePrivateChat />
      {/* <span>New Private Chat</span> */}
    </header>
  );
};

export default CreatePrivateChatHeader;
