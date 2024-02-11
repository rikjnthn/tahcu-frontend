"use client";
import React from "react";

import ChatHeader from "@/components/chat-header";
import MessageContainer from "@/components/message-container";
import SendMessagePlace from "@/components/send-message-place";
import style from "./chat.module.scss";
import { useChat } from "@/context/chat-context";

const Chat = () => {
  const { chatRef } = useChat();

  return (
    <div ref={chatRef} className={style.chat}>
      <ChatHeader name="John" />
      <MessageContainer />
      <SendMessagePlace />
    </div>
  );
};

export default Chat;
