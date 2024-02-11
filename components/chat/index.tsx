"use client";
import React, { useRef, useState } from "react";

import ChatHeader from "@/components/chat-header";
import MessageContainer from "@/components/message-container";
import SendMessagePlace from "@/components/send-message-place";
import style from "./chat.module.scss";
import { SetStateType } from "@/interface";

const Chat = ({
  setOpenHeader,
  setChangeRouteComplete,
}: {
  setOpenHeader: SetStateType<boolean>;
  setChangeRouteComplete: SetStateType<boolean>;
}) => {
  const [isEditMessage, setIsEditMessage] = useState<boolean>(false);
  const [messageObject, setMessageObject] = useState<{
    id: string;
    message: string;
  }>({
    id: "",
    message: "",
  });

  const chatPageRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={chatPageRef} className={style.chat}>
      <ChatHeader
        setRouteChangeComplete={setChangeRouteComplete}
        setOpenHeader={setOpenHeader}
        name="John"
      />
      <MessageContainer
        edittedMessage={messageObject.message}
        setMessageObject={setMessageObject}
        setIsEditMessage={setIsEditMessage}
        chatPageRef={chatPageRef}
      />
      <SendMessagePlace
        messageObject={messageObject}
        setMessageObject={setMessageObject}
        setIsEditMessage={setIsEditMessage}
        isEditMessage={isEditMessage}
      />
    </div>
  );
};

export default Chat;
