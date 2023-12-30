"use client";

import { useState } from "react";

import ChatContactHeader from "@/components/chat-contact-header";
import Navigation from "@/components/navigation";
import ChatContactList from "@/components/chat-contact-list";
import FloatButton from "@/components/float-button";
import { useHomePage } from "@/context/home-page-context";

const ChatHomePage = () => {
  const [isOpenNav, setIsOpenNav] = useState<boolean>(false);

  const { isOpenChatContact } = useHomePage();

  return (
    <div>
      <Navigation isOpenNav={isOpenNav} />
      <div className={`${isOpenChatContact ? "" : "scale-90"}`}>
        <ChatContactHeader setIsOpenNav={setIsOpenNav} />
        <ChatContactList />
        {isOpenNav && (
          <div onClick={() => setIsOpenNav(false)} className="dark_overlay" />
        )}
        <FloatButton />
      </div>
    </div>
  );
};

export default ChatHomePage;
