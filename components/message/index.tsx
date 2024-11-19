"use client";
import { useState } from "react";
import clsx from "clsx";

import style from "./message.module.scss";
import MessageContextMenu from "../message-context-menu";
import { MessageMenuCoordinateType } from "@/interface";
import { useChatPage } from "@/context/chat-page-context";

const Message = ({ id, message, time, isSender, name }: MessagePropsType) => {
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
      className={clsx(style.message_wrapper, {
        "margin-left-auto flex-row-reversed": isSender,
      })}
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
          className={style.message_context_container}
        >
          <MessageContextMenu
            id={id}
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

interface MessagePropsType {
  id: string;
  message: string;
  time: string;
  isSender: boolean;
  name?: string;
}
