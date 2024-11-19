"use client";
import React, { useEffect, useRef } from "react";

import style from "./message-context-menu.module.scss";
import { MessageMenuCoordinateType } from "@/interface";
import { useChat, useChatDispatch } from "@/context/chat-context";
import { useSocket } from "@/context/socket-connection-context";
import { useURLHash } from "@/context/url-hash-context";

const MessageContextMenu = ({
  id,
  message,
  menuCoordinate,
  isSender,
}: MessageContextMenuType) => {
  const messageContextRef = useRef<HTMLDivElement>(null);

  const { hash: chatId } = useURLHash();
  const { chatRef } = useChat();
  const { setEditMessage, setEditMessageId, setIsEditMessage } =
    useChatDispatch();
  const messageIo = useSocket();

  useEffect(() => {
    if (!messageContextRef.current) return;

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
  }, [chatRef, menuCoordinate]);

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteMessage = () => {
    messageIo.emit("remove", {
      chat_id: chatId,
      data: { ids: [id] },
    });
  };

  const handleEditMessage = () => {
    setIsEditMessage(true);
    setEditMessage(message);
    setEditMessageId(id);
  };

  return (
    <div ref={messageContextRef} className={style.message_context}>
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

interface MessageContextMenuType {
  id: string;
  message: string;
  menuCoordinate: MessageMenuCoordinateType;
  isSender: boolean;
}
