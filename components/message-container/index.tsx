"use client";
import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import Message from "../message";
import style from "./message-container.module.scss";
import { MessageType, UserDataType } from "@/interface";
import { useSocket } from "@/context/socket-connection-context";
import { useURLHash } from "@/context/url-hash-context";
import { useChatPage } from "@/context/chat-page-context";

const MessageContainer = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  const messageContainerRef = useRef<HTMLUListElement>(null);

  const { hash: chatId } = useURLHash();
  const messageIo = useSocket();
  const { isGroup } = useChatPage();
  const queryClient = useQueryClient();

  const userData = queryClient.getQueryData<UserDataType>(["userData"]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    messageIo.emit(
      "find-all",
      {
        group_id: isGroup ? chatId : undefined,
        contact_id: !isGroup ? chatId : undefined,
        skip: 0,
      },
      (messages: MessageType[]) => {
        setMessages(
          messages.sort((message1, message2) =>
            message1.sent_at < message2.sent_at ? -1 : 1
          )
        );
      }
    );
  }, [messageIo, chatId, isGroup]);

  useEffect(() => {
    messageIo.on("updated-message", (updatedMessage: MessageType) => {
      setMessages((prev) => {
        const newMessages = prev.map((message) => {
          return message.id === updatedMessage.id ? updatedMessage : message;
        });

        return newMessages;
      });
    });

    return () => {
      messageIo.off("updated-message");
    };
  }, [messageIo]);

  useEffect(() => {
    messageIo.on("deleted-message", (deletedMessageId: string[]) => {
      setMessages((prev) =>
        prev.filter((val) => !deletedMessageId.includes(val.id))
      );
    });

    return () => {
      messageIo.off("deleted-message");
    };
  }, [messageIo]);

  useEffect(() => {
    messageIo.on("message", (message: MessageType) => {
      const { group_id, contact_id } = message;

      if (group_id === chatId || contact_id === chatId) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      messageIo.off("message");
    };
  }, [messageIo, chatId]);

  return (
    <ul ref={messageContainerRef} className={style.message_container}>
      {messages.map(
        ({ id, message, sent_at, sender_id, sender: { username } }) => (
          <Message
            key={id}
            id={id}
            isSender={sender_id === userData?.user_id}
            message={message}
            time={new Date(sent_at).toLocaleTimeString("en-En", {
              timeStyle: "short",
              hour12: false,
            })}
            name={username}
            setMessages={setMessages}
          />
        )
      )}
    </ul>
  );
};

export default MessageContainer;
