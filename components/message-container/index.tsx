"use client";
import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";

import Message from "../message";
import style from "./message-container.module.scss";
import { MessageType, UserDataType } from "@/interface";

const MessageContainer = ({ messages }: { messages: MessageType[] }) => {
  const messageContainerRef = useRef<HTMLUListElement>(null);

  const queryClient = useQueryClient();

  const userData = queryClient.getQueryData<UserDataType>(["userData"]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, []);

  return (
    <ul ref={messageContainerRef} className={style.message_container}>
      {messages.map(({ id, message, sent_at, sender_id }) => (
        <Message
          key={id}
          isSender={sender_id === userData?.user_id}
          message={message}
          time={sent_at.getTime().toString()}
        />
      ))}
    </ul>
  );
};

export default MessageContainer;
