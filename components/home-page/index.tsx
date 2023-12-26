"use client";

import React, { useState } from "react";

import ChatHomePage from "@/components/chat-home-page";
import CreateGroupPage from "@/components/create-group-page";
import CreatePrivateChat from "@/components/create-private-chat";
import style from "./home-page.module.scss";

const HomePage = () => {
  const [isopenChatContact, setIsOpenChatContact] = useState<boolean>(true);
  const [isopenCreateGroup, setIsOpenCreateGroup] = useState<boolean>(false);
  const [isopenCreatePrivate, setIsOpenCreatePrivate] =
    useState<boolean>(false);

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
