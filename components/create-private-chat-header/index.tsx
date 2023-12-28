import React from "react";

import BackButton from "../back-button";
import style from "./create-private-chat-header.module.scss";
import SearchAndCreatePrivateChat from "../search-and-create-private-chat";
import { useHomePageDispatch } from "@/context/home-page-context";

const CreatePrivateChatHeader = () => {
  const dispatch = useHomePageDispatch();

  const openChatContact = () => {
    dispatch({ type: "SET_OPEN_CHAT_CONTACT" });
  };
  return (
    <header className={style.header}>
      <BackButton onClick={openChatContact} fill="#000" />
      <SearchAndCreatePrivateChat />
    </header>
  );
};

export default CreatePrivateChatHeader;
