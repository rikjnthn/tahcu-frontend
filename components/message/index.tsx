"use client";

import { useState } from "react";

import style from "./message.module.scss";
import MessageContextMenu from "../message-context-menu";
import { MessageMenuCoordinateType } from "@/interface";

const Message = ({
  message,
  time,
  isSender,
}: {
  message: string;
  time: string;
  isSender: boolean;
}) => {
  const [openMessageMenu, setOpenMessageMenu] = useState<boolean>(false);
  const [menuCoordinate, setMenuCoordinate] =
    useState<MessageMenuCoordinateType>({
      left: 0,
      top: 0,
    });

  const handleMessageContext = (e: React.MouseEvent) => {
    if (!openMessageMenu) {
      setOpenMessageMenu(true);
      e.preventDefault();
    } else setOpenMessageMenu(false);

    const left = e.clientX + 1;
    const top = e.clientY;

    setMenuCoordinate({ left, top });
  };

  return (
    <li
      onContextMenu={handleMessageContext}
      className={`${style.message} ${
        isSender ? "margin-left-auto flex-row-reversed" : ""
      }`}
    >
      <div>
        <span>{message}</span>
        <span className={style.time}>{time}</span>
      </div>

      {openMessageMenu && (
        <div
          onClick={() => setOpenMessageMenu(false)}
          className={`${style.message_context_container}`}
        >
          <MessageContextMenu
            id=""
            message={message}
            menuCoordinate={menuCoordinate}
            isSender={isSender}
          />
        </div>
      )}
    </li>
  );
};

export default Message;
