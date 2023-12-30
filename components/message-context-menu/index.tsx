import React, { useEffect, useRef } from "react";

import style from "./message-context-menu.module.scss";
import { MessageMenuCoordinateType } from "@/interface";

const MessageContextMenu = ({
  message,
  menuCoordinate,
}: {
  message: string;
  menuCoordinate: MessageMenuCoordinateType;
}) => {
  const messageContextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageContextRef.current) {
      const messageContext = messageContextRef.current;

      const { left, top } = menuCoordinate;

      messageContext.style.left = `${left}px`;
      messageContext.style.top = `${top}px`;
    }
  });

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div ref={messageContextRef} className={`${style.message_context}`}>
      <button onClick={handleCopyMessage}>Copy</button>
    </div>
  );
};

export default MessageContextMenu;
