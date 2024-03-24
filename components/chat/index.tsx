"use client";
import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

import ChatHeader from "@/components/chat-header";
import MessageContainer from "@/components/message-container";
import SendMessagePlace from "@/components/send-message-place";
import style from "./chat.module.scss";
import { useChat } from "@/context/chat-context";
import { groupChatSocket, privateChatSocket } from "@/socket";
import { MessageType } from "@/interface";

const handlePrivateChat = (io: Socket) => {};

const handleGroupChat = (io: Socket) => {};

const Chat = ({ name, isGroup }: { name: string; isGroup: boolean }) => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  const { chatRef } = useChat();

  return (
    <div ref={chatRef} className={style.chat}>
      <ChatHeader name={name} isGroup={isGroup} />
      <MessageContainer messages={messages} />
      <SendMessagePlace />
    </div>
  );
};

export default Chat;
