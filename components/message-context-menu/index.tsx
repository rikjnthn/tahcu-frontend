import React, { useEffect, useRef } from "react";

import style from "./message-context-menu.module.scss";
import { MessageMenuCoordinateType } from "@/interface";
import { useChat, useChatDispatch } from "@/context/chat-context";

const MessageContextMenu = ({
  id,
  message,
  menuCoordinate,
  isSender,
}: {
  id: string;
  message: string;
  menuCoordinate: MessageMenuCoordinateType;
  isSender: boolean;
}) => {
  const messageContextRef = useRef<HTMLDivElement>(null);

  const { chatRef } = useChat();
  const { setEditMessage, setEditMessageId, setIsEditMessage } =
    useChatDispatch();

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

  const handleDeleteMessage = () => {};

  const handleEditMessage = () => {
    setIsEditMessage(true);
    setEditMessage(message);
    setEditMessageId(id);
  };

  return (
    <div ref={messageContextRef} className={`${style.message_context}`}>
      <button onClick={handleCopyMessage}>Copy</button>
      <button onClick={handleDeleteMessage}>Delete</button>
      {isSender && <button onClick={handleEditMessage}>Edit</button>}
    </div>
  );
};

export default MessageContextMenu;
