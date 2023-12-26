"use client";

import React, { useState } from "react";

import ChatHomePage from "@/components/chat-home-page";
import CreateGroupPage from "@/components/create-group-page";
import CreatePrivateChat from "@/components/create-private-chat";
import style from "./home-page.module.scss";

const HomePage = () => {
  const [openChatContact, setOpenChatContact] = useState<boolean>(true);
  const [openCreateGroup, setOpenCreateGroup] = useState<boolean>(false);
  const [openCreatePrivate, setOpenCreatePrivate] = useState<boolean>(false);

  return (
    <div className={style.home}>
      <div>
        <ChatHomePage />
      </div>
      <div>
        <CreateGroupPage />
      </div>
      <div>
        <CreatePrivateChat />
      </div>
    </div>
  );
};

export default HomePage;
