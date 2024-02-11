"use client";

import React from "react";
import { useRouter } from "next/navigation";

import BackButton from "../back-button";
import PhotoProfile from "../photo-profile";
import GroupPhoto from "../group-photo";
import style from "./chat-header.module.scss";
import { SetStateType } from "@/interface";
import { useChatPageDispatch } from "@/context/chat-page-context";

const ChatHeader = ({ name }: { name: string }) => {
  const router = useRouter();

  const { setIsRouteChangeComplete, setIsOpenHeader } = useChatPageDispatch();

  const backToMain = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsRouteChangeComplete(false);

    //To wait the transition and change the route
    let done = false;

    const id = setTimeout(() => {
      router.replace("/a");
      done = true;
    }, 100);

    done && clearTimeout(id);
  };

  return (
    <header onClick={() => setIsOpenHeader(true)} className={style.chat_header}>
      <div>
        <BackButton onClick={backToMain} fill="#fff" title="Back" />
        <div>
          {true ? (
            <GroupPhoto groupName={name} />
          ) : (
            <PhotoProfile name={name} size="sm" />
          )}
          <span>{name}</span>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
