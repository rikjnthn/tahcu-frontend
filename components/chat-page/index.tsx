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
    <main>
      <div
        className={`${style.chat_profile_container} z-1 ${
          openHeader ? "translateX-0" : "translateX-100"
        }`}
      >
        <ChatProfile setOpenHeader={setOpenHeader} />
      </div>
      <div
        className={`${style.chat_page_container} ${
          routeChangeComplete ? "translateX-0" : "translateX-100"
        }`}
      >
        <Chat
          setChangeRouteComplete={setRouteChangeComplete}
          setOpenHeader={setOpenHeader}
        />
      </div>
    </main>
  );
};

export default ChatPage;
