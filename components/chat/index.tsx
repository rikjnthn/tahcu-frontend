"use client";
import React from "react";

import ChatHeader from "@/components/chat-header";
import MessageContainer from "@/components/message-container";
import InputMessageContainer from "@/components/input-message-container";
import style from "./chat.module.scss";
import { useChat } from "@/context/chat-context";

const Chat = () => {
  const { chatRef } = useChat();

  return (
    <div ref={chatRef} className={style.chat}>
      <ChatHeader />
      <MessageContainer />
      <InputMessageContainer />
    </div>
  );
};

export default Chat;
