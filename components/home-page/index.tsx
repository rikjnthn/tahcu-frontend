"use client";

import React from "react";

import ChatHomePage from "@/components/chat-home-page";
import CreateGroupPage from "@/components/create-group-page";
import CreatePrivateChat from "@/components/create-private-chat";
import style from "./home-page.module.scss";
import { useHomePage } from "@/context/home-page-context";
import UserPage from "../user-page";

const HomePage = () => {
  const {
    isOpenChatContact,
    isOpenCreateGroup,
    isOpenCreatePrivateChat,
    isOpenUserProfile,
  } = useHomePage();

  return (
    <div className={style.home}>
      <div
        className={`${isOpenChatContact ? "translateX-0" : "-translateX-10"}`}
      >
        <ChatHomePage />
      </div>
      <div
        className={`${isOpenCreateGroup ? "translateX-0" : "translateX-100"}`}
      >
        <CreateGroupPage />
      </div>
      <div
        className={`${
          isOpenCreatePrivateChat ? "translateX-0" : "translateX-100"
        }`}
      >
        <CreatePrivateChat />
      </div>
      <div
        className={`${isOpenUserProfile ? "translateX-0" : "translateX-100"}`}
      >
        <UserPage />
      </div>
    </div>
  );
};

export default HomePage;
