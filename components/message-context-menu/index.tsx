import React, { useEffect, useRef } from "react";

import style from "./message-context-menu.module.scss";
import { MessageMenuCoordinateType, SetStateType } from "@/interface";

const MessageContextMenu = ({
  id,
  message,
  menuCoordinate,
  chatPageRef,
  setIsEditMessage,
  isSender,
  setMessageObject,
}: {
  id: string;
  message: string;
  menuCoordinate: MessageMenuCoordinateType;
  chatPageRef: React.RefObject<HTMLDivElement>;
  setIsEditMessage: SetStateType<boolean>;
  isSender: boolean;
  setMessageObject: SetStateType<any>;
}) => {
  const messageContextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageContextRef.current) {
      const messageContext = messageContextRef.current;
      const chatPageElement = chatPageRef.current;

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

    setMessageObject({
      id,
      message,
    });
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
