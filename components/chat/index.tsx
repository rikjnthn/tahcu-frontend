"use client";
import React from "react";

import ChatHeader from "@/components/chat-header";
import MessageContainer from "@/components/message-container";
import SendMessagePlace from "@/components/send-message-place";
import style from "./chat.module.scss";
import { SetStateType } from "@/interface";

const Chat = ({
  setOpenHeader,
  setChangeRouteComplete,
}: {
  setOpenHeader: SetStateType<boolean>;
  setChangeRouteComplete: SetStateType<boolean>;
}) => {
  return (
    <div className={style.chat}>
      <ChatHeader
        setRouteChangeComplete={setChangeRouteComplete}
        setOpenHeader={setOpenHeader}
        name="John"
      />
      <MessageContainer />
      <SendMessagePlace />
    </div>
  );
};

export default Chat;
