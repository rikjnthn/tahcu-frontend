import { useEffect, useRef, useState } from "react";

import { MessageType, SetStateType } from "@/interface";
import { useSocket } from "@/context/socket-connection-context";
import { useURLHash } from "@/context/url-hash-context";
import { useChatPage } from "@/context/chat-page-context";

export default function useMessages({
  setScrollPosition,
  setIsMessageAdded,
}: {
  setScrollPosition: SetStateType<number>;
  setIsMessageAdded: SetStateType<boolean>;
}) {
  const [messages, setMessages] = useState<MessageType[]>([]);

  const skipFactor = useRef<number>(0);
  const shouldFetch = useRef<boolean>(true);

  const { hash: chatId } = useURLHash();
  const messageIo = useSocket();
  const { isGroup } = useChatPage();

  useEffect(() => {
    messageIo.emit(
      "find-all",
      {
        group_id: isGroup ? chatId : undefined,
        contact_id: !isGroup ? chatId : undefined,
        skip: 0,
      },
      (messagesRes: MessageType[]) => {
        if (messagesRes.length < 50) {
          shouldFetch.current = false;
        }

        setMessages(
          messagesRes.sort((a, b) => (a.sent_at < b.sent_at ? -1 : 1))
        );
      }
    );
  }, [messageIo, chatId, isGroup]);

  useEffect(() => {
    messageIo.on("updated-message", (updatedMessage: MessageType) => {
      setMessages((prev) => {
        return prev.map((message) => {
          return message.id === updatedMessage.id ? updatedMessage : message;
        });
      });
    });

    messageIo.on("deleted-message", (deletedMessageId: string[]) => {
      setMessages((prev) =>
        prev.filter((val) => !deletedMessageId.includes(val.id))
      );
    });

    messageIo.on("message", (message: MessageType) => {
      const { group_id, contact_id } = message;

      if (group_id === chatId || contact_id === chatId) {
        setMessages((prev) => [...prev, message]);
      }

      setIsMessageAdded(true);
      setScrollPosition(Infinity);
    });

    return () => {
      messageIo.off("updated-message");
      messageIo.off("message");
      messageIo.off("deleted-message");
    };
  }, [messageIo, chatId, setScrollPosition, setIsMessageAdded]);

  const fetchNextMessages = () => {
    skipFactor.current += 1;

    messageIo.emit(
      "find-all",
      {
        group_id: isGroup ? chatId : undefined,
        contact_id: !isGroup ? chatId : undefined,
        skip: skipFactor.current * 50,
      },
      (messagesRes: MessageType[]) => {
        if (messagesRes.length < 50) {
          shouldFetch.current = false;
        }

        if (messagesRes.length === 0) return;

        setMessages((prev) => [
          ...messagesRes.sort((a, b) => (a.sent_at < b.sent_at ? -1 : 1)),
          ...prev,
        ]);
      }
    );
  };

  return { messages, fetchNextMessages, shouldFetch };
}
