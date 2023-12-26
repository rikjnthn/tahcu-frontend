"use client";

import { useState } from "react";

import ChatContactHeader from "@/components/chat-contact-header";
import Navigation from "@/components/navigation";
import ChatContactList from "@/components/chat-contact-list";
import FloatButton from "@/components/float-button";

const ChatHomePage = () => {
  const [openNav, setOpenNav] = useState<boolean>(false);

  return (
    <div>
      <Navigation openNav={openNav} />
      <ChatContactHeader setOpenNav={setOpenNav} />
      <ChatContactList />
      {openNav && (
        <div onClick={() => setOpenNav(false)} className="dark_overlay" />
      )}
      <FloatButton />
    </div>
  );
};

export default ChatHomePage;
