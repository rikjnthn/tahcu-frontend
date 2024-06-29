"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import BackButton from "../back-button";
import PhotoProfile from "../photo-profile";
import GroupPhoto from "../group-photo";
import style from "./chat-header.module.scss";
import { useChatPage, useChatPageDispatch } from "@/context/chat-page-context";
import ThreeDots from "../three-dots";
import ChatSetting from "../chat-setting";
import { useURLHash } from "@/context/url-hash-context";

const ChatHeader = () => {
  const [isOpenSetting, setIsOpenSetting] = useState<boolean>(false);

  const router = useRouter();
  const { setHash } = useURLHash();
  const { isGroup, name } = useChatPage();
  const { setIsRouteChangeComplete, setIsOpenHeader } = useChatPageDispatch();

  const backToMain = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsRouteChangeComplete(false);

    //To wait the transition and then change the route
    let done = false;

    const id = setTimeout(() => {
      router.replace("/a");
      setHash("");
      done = true;
    }, 100);

    done && clearTimeout(id);
  };

  const openChatSetting = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpenSetting(true);
  };

  return (
    <header onClick={() => setIsOpenHeader(true)} className={style.chat_header}>
      <div>
        <BackButton onClick={backToMain} fill="#fff" title="Close" />
        <div>
          {isGroup ? (
            <GroupPhoto groupName={name} />
          ) : (
            <PhotoProfile name={name} size="sm" />
          )}
          <span>{name}</span>
        </div>
        <ThreeDots onClick={openChatSetting} fill="#fff" />
      </div>

      {isOpenSetting && <ChatSetting setIsOpenSetting={setIsOpenSetting} />}
    </header>
  );
};

export default ChatHeader;