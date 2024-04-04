"use client";

import { useState } from "react";

import ChatContactSearch from "../chat-contact-search";
import HamburgerButton from "../hamburger-button";
import BackButton from "../back-button";
import style from "./chat-contact-header.module.scss";
import { SetStateType } from "@/interface";

const ChatContactHeader = ({
  setIsOpenNav,
}: {
  setIsOpenNav: SetStateType<boolean>;
}) => {
  const [isSearch, setIsSearch] = useState<boolean>(false);

  return (
    <header className={style.header}>
      {!isSearch && (
        <div className={style.logo_and_hamburger}>
          <HamburgerButton
            onClick={() => setIsOpenNav(true)}
            fill="#000000"
            title="Open navigation"
          />
          <span>Tahcu</span>
        </div>
      )}

      <div
        className={
          isSearch ? style.search_container : "margin-left-auto center"
        }
      >
        {isSearch && (
          <div>
            <BackButton
              onClick={() => setIsSearch(false)}
              fill="#000"
              title="Close search"
            />
            <ChatContactSearch />
          </div>
        )}
      </div>
    </header>
  );
};

export default ChatContactHeader;
