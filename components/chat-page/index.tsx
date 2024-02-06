"use client";

import { useEffect, useState } from "react";

import Chat from "@/components/chat";
import ChatProfile from "@/components/chat-profile";
import style from "./chat-page.module.scss";

const ChatPage = ({ params }: { params: { contact: string } }) => {
  const [openHeader, setOpenHeader] = useState<boolean>(false);
  const [routeChangeComplete, setRouteChangeComplete] =
    useState<boolean>(false);

  const { contact } = params;

  useEffect(() => {
    setRouteChangeComplete(true);
  }, [contact]);

  return (
    <div className={style.chat_page}>
      <div className={`z-1 ${openHeader ? "translateX-0" : "translateX-100"}`}>
        <ChatProfile
          name="John"
          isGroup={false}
          setOpenHeader={setOpenHeader}
        />
      </div>
      <div
        className={`${routeChangeComplete ? "translateX-0" : "translateX-100"}`}
      >
        <Chat
          setChangeRouteComplete={setRouteChangeComplete}
          setOpenHeader={setOpenHeader}
        />
      </div>
    </div>
  );
};

export default ChatPage;
