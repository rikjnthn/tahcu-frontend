"use client";

import { useState } from "react";

import ChatContactSearch from "../chat-contact-search";
import HamburgerButton from "../hamburger-button";
import SearchButton from "../search-button";
import BackButton from "../back-button";
import style from "./chat-contact-header.module.scss";

const ChatContactHeader = ({
  setIsOpenNav,
}: {
  setIsOpenNav: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const handleSearchClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsSearch((prev) => !prev);
  };

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
          <div className="tes tes2">
            <BackButton
              onClick={() => setIsSearch(false)}
              fill="#000"
              title="Close search"
            />
            <ChatContactSearch />
          </div>
        )}
        <SearchButton
          onClick={handleSearchClick}
          fill={isSearch ? "#000" : "#000000"}
          title="Search"
        />
      </div>
    </header>
  );
};

export default ChatContactHeader;
