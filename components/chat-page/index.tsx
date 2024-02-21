"use client";
import { useEffect, useState } from "react";

import Chat from "@/components/chat";
import ChatProfile from "@/components/chat-profile";
import style from "./chat-page.module.scss";
import { ChatPageProvider } from "@/context/chat-page-context";
import { ChatProvider } from "@/context/chat-context";

const ChatPage = ({ contact }: { contact: string }) => {
  const [isOpenHeader, setIsOpenHeader] = useState<boolean>(false);
  const [isRouteChangeComplete, setIsRouteChangeComplete] =
    useState<boolean>(false);

  useEffect(() => {
    setIsRouteChangeComplete(true);
  }, [contact]);

  return (
    <ChatPageProvider
      stateContext={{ isOpenHeader, isRouteChangeComplete }}
      dispatchContext={{ setIsOpenHeader, setIsRouteChangeComplete }}
    >
      <div className={style.chat_page}>
        <div
          className={`z-1 ${isOpenHeader ? "translateX-0" : "translateX-100"}`}
        >
          <ChatProfile name="John" isGroup={false} />
        </div>
        <div
          className={`${
            isRouteChangeComplete ? "translateX-0" : "translateX-100"
          }`}
        >
          <ChatProvider>
            <Chat />
          </ChatProvider>
        </div>
      </div>
    </ChatPageProvider>
  );
};

export default ChatPage;
