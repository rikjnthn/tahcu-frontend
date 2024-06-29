"use client";

import { useState } from "react";

import style from "./message.module.scss";
import MessageContextMenu from "../message-context-menu";
import {
  MessageMenuCoordinateType,
  MessageType,
  SetStateType,
} from "@/interface";
import { useChatPage } from "@/context/chat-page-context";

const Message = ({
  id,
  message,
  time,
  isSender,
  name,
  setMessages,
}: {
  id: string;
  message: string;
  time: string;
  isSender: boolean;
  name?: string;
  setMessages: SetStateType<MessageType[]>;
}) => {
  const [openMessageMenu, setOpenMessageMenu] = useState<boolean>(false);
  const [menuCoordinate, setMenuCoordinate] =
    useState<MessageMenuCoordinateType>({
      left: 0,
      top: 0,
    });

  const { isGroup } = useChatPage();

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
      className={`${style.message_container} ${
        isSender ? "margin-left-auto flex-row-reversed" : ""
      }`}
      title={`${name}, ${time}`}
    >
      <div className={style.message}>
        {!isSender && isGroup ? (
          <span className={style.username}>{name}</span>
        ) : null}
        <div>
          <span className={style.message_text}>{message}</span>
          <span className={style.time}>{time}</span>
        </div>
      </div>

      {openMessageMenu && (
        <div
          onClick={() => setOpenMessageMenu(false)}
          className={`${style.message_context_container}`}
        >
          <MessageContextMenu
            id={id}
            message={message}
            menuCoordinate={menuCoordinate}
            isSender={isSender}
            setMessages={setMessages}
          />
        </div>
      )}
    </li>
  );
};

export default Message;
