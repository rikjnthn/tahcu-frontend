"use client";

import { useState } from "react";

import ChatContactHeader from "@/components/chat-contact-header";
import Navigation from "@/components/navigation";
import ChatContactList from "@/components/chat-contact-list";
import FloatButton from "@/components/float-button";

const ChatHomePage = () => {
  const [isOpenNav, setIsOpenNav] = useState<boolean>(false);

  return (
    <div>
      <Navigation isOpenNav={isOpenNav} />
      <ChatContactHeader setIsOpenNav={setIsOpenNav} />
      <ChatContactList />
      {isOpenNav && (
        <div onClick={() => setIsOpenNav(false)} className="dark_overlay" />
      )}
      <FloatButton />
    </div>
  );
};

export default ChatHomePage;
