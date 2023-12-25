import React from "react";

import style from "./search-and-create-private-chat.module.scss";
import SearchButton from "../search-button";

const SearchAndCreatePrivateChat = ({
  onSubmit,
}: {
  onSubmit?: React.FormEventHandler;
}) => {
  return (
    <div className={style.search_bar}>
      <SearchButton fill="#000" />
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="User" />
      </form>
    </div>
  );
};

export default SearchAndCreatePrivateChat;
