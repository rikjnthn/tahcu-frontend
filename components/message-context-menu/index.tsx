import React, { useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";

import style from "./message-context-menu.module.scss";
import {
  MessageMenuCoordinateType,
  MessageType,
  SetStateType,
  UserDataType,
} from "@/interface";
import { useChat, useChatDispatch } from "@/context/chat-context";
import { useSocket } from "@/context/socket-connection-context";
import { useChatPage } from "@/context/chat-page-context";
import { useURLHash } from "@/context/url-hash-context";

const handleGroup = ({
  io,
  messageId,
  groupId,
  senderId,
}: {
  io: Socket;
  messageId: string;
  groupId: string;
  senderId?: string;
}) => {
  io.emit("delete", {
    chat_id: groupId,
    data: {
      ids: [messageId],
      group_id: groupId,
      sender_id: senderId,
    },
  });
};

const handlePrivateChat = ({
  io,
  messageId,
  contactId,
}: {
  io: Socket;
  messageId: string;
  contactId: string;
}) => {
  io.emit("remove", {
    chat_id: contactId,
    data: {
      ids: [messageId],
    },
  });
};

const MessageContextMenu = ({
  id,
  message,
  menuCoordinate,
  isSender,
  setMessages,
}: {
  id: string;
  message: string;
  menuCoordinate: MessageMenuCoordinateType;
  isSender: boolean;
  setMessages: SetStateType<MessageType[]>;
}) => {
  const messageContextRef = useRef<HTMLDivElement>(null);

  const { hash: chatId } = useURLHash();
  const { chatRef } = useChat();
  const { isGroup } = useChatPage();
  const { setEditMessage, setEditMessageId, setIsEditMessage } =
    useChatDispatch();
  const { groupChatIo, privateChatIo } = useSocket();
  const queryClient = useQueryClient();

  const userData = queryClient.getQueryData<UserDataType>(["userData"]);

  useEffect(() => {
    if (messageContextRef.current) {
      const messageContext = messageContextRef.current;
      const chatPageElement = chatRef.current;

      const chatPageWidth = chatPageElement?.clientWidth ?? 0;
      const chatPageHeight = chatPageElement?.clientHeight ?? 0;

      const { left, top } = menuCoordinate;

      const halfScreenWidth =
        chatPageWidth / 2 + (window.innerWidth - chatPageWidth);
      const halfScreenHeight = chatPageHeight / 2;

      if (left > halfScreenWidth) {
        messageContext.style.right = `${window.innerWidth - left}px`;
      } else {
        messageContext.style.left = `${
          left - window.innerWidth + chatPageWidth
        }px`;
      }

      if (top > halfScreenHeight) {
        messageContext.style.bottom = `${window.innerHeight - top}px`;
      } else messageContext.style.top = `${top}px`;
    }
  });

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteMessage = () => {
    isGroup
      ? handleGroup({
          io: groupChatIo,
          groupId: chatId,
          messageId: id,
          senderId: userData?.user_id,
        })
      : handlePrivateChat({
          io: privateChatIo,
          messageId: id,
          contactId: chatId,
        });

    setMessages((prev) => prev.filter((val) => val.id !== id));
  };

  const handleEditMessage = () => {
    setIsEditMessage(true);
    setEditMessage(message);
    setEditMessageId(id);
  };

  return (
    <div ref={messageContextRef} className={`${style.message_context}`}>
      <button onClick={handleCopyMessage} title="Copy message">
        Copy
      </button>
      {isSender && (
        <button onClick={handleDeleteMessage} title="Delete message">
          Delete
        </button>
      )}
      {isSender && (
        <button onClick={handleEditMessage} title="Edit message">
          Edit
        </button>
      )}
    </div>
  );
};

export default MessageContextMenu;
