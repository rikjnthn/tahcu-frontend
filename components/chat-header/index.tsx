"use client";

import React from "react";
import { useRouter } from "next/navigation";

import BackButton from "../back-button";
import PhotoProfile from "../photo-profile";
import GroupPhoto from "../group-photo";
import style from "./chat-header.module.scss";
import { SetStateType } from "@/interface";

const ChatHeader = ({
  name,
  setOpenHeader,
  setRouteChangeComplete,
}: {
  name: string;
  setOpenHeader: SetStateType<boolean>;
  setRouteChangeComplete: SetStateType<boolean>;
}) => {
  const router = useRouter();

  const backToMain = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setRouteChangeComplete(false);

    let done = false;

    const id = setTimeout(() => {
      router.replace("/");
      done = true;
    }, 100);

    done && clearTimeout(id);
  };

  return (
    <header onClick={() => setOpenHeader(true)} className={style.chat_header}>
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
