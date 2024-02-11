"use client";

import Chat from "@/components/chat";
import ChatProfile from "@/components/chat-profile";
import style from "./chat-page.module.scss";
import { useChatPage } from "@/context/chat-page-context";
import { ChatProvider } from "@/context/chat-context";

const ChatPage = () => {
  const { isOpenHeader, isRouteChangeComplete } = useChatPage();

  return (
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
  );
};

export default ChatPage;
