"use client";
import { memo, useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import Message from "../message";
import style from "./message-container.module.scss";
import { ContactType, MessageType, UserDataType } from "@/interface";
import { useSocket } from "@/context/socket-connection-context";
import { useChatPage } from "@/context/chat-page-context";

const MessageContainer = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  const messageContainerRef = useRef<HTMLUListElement>(null);

  const param = useParams();
  const { groupChatIo, privateChatIo } = useSocket();
  const { isGroup } = useChatPage();
  const queryClient = useQueryClient();

  const userData = queryClient.getQueryData<UserDataType>(["userData"]);
  const contacts = queryClient.getQueryData<ContactType[]>(["contactList"]);
  const contact = contacts?.find((val) => val.id === param.contact);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!isGroup) return;

    const io = groupChatIo;

    io.emit(
      "find-all",
      {
        group_id: param.contact,
      },
      (messages: MessageType[]) => {
        setMessages(messages);
      }
    );

    io.on("updated-message", (updatedMessage: MessageType) => {
      setMessages((prev) => {
        const newMessages = [...prev];
        const updateMessageIndex = newMessages.findIndex(
          (val) => val.id === updatedMessage.id
        );

        newMessages[updateMessageIndex] = updatedMessage;
        return newMessages;
      });
    });

    io.on("deleted-message", (deletedMessageId: string[]) => {
      setMessages((prev) =>
        prev.filter((val) => !deletedMessageId.includes(val.id))
      );
    });

    io.on("message", (message: MessageType) => {
      const { group_id } = message;

      if (group_id === param.contact) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      io.off("message");
      io.off("updated-message");
      io.off("deleted-message");
    };
  }, [groupChatIo, isGroup, param, userData]);

  useEffect(() => {
    if (isGroup) return;

    const io = privateChatIo;

    io.emit(
      "find-all",
      {
        sender_id: contact?.user_id,
        receiver_id: contact?.friends_id,
      },
      (messages: MessageType[]) => {
        setMessages(messages);
      }
    );

    io.on("updated-message", (updatedMessage: MessageType) => {
      setMessages((prev) => {
        const newMessages = [...prev];
        const updateMessageIndex = newMessages.findIndex(
          (val) => val.id === updatedMessage.id
        );

        newMessages[updateMessageIndex] = updatedMessage;
        return newMessages;
      });
    });

    io.on("deleted-message", (deletedMessageId: string[]) => {
      setMessages((prev) =>
        prev.filter((val) => !deletedMessageId.includes(val.id))
      );
    });

    io.on("message", (message: MessageType) => {
      const { receiver_id, sender_id } = message;

      const friendsId =
        userData?.user_id === contact?.user_id
          ? contact?.friends_id
          : contact?.user_id;

      if (receiver_id === friendsId || sender_id === friendsId) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      io.off("message");
      io.off("updated-message");
      io.off("deleted-message");
    };
  }, [isGroup, privateChatIo, contact, userData, param]);

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
