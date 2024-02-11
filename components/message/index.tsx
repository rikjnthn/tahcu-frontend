"use client";

import { useState } from "react";

import style from "./message.module.scss";
import MessageContextMenu from "../message-context-menu";
import { MessageMenuCoordinateType, SetStateType } from "@/interface";

const Message = ({
  message,
  time,
  isSender,
  chatPageRef,
  setIsEditMessage,
  edittedMessage,
  setMessageObject,
}: {
  message: string;
  time: string;
  isSender: boolean;
  chatPageRef: React.RefObject<HTMLDivElement>;
  edittedMessage: string;
  setIsEditMessage: SetStateType<boolean>;
  setMessageObject: SetStateType<any>;
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
            setMessageObject={setIsEditMessage}
            setIsEditMessage={setMessageObject}
            chatPageRef={chatPageRef}
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
