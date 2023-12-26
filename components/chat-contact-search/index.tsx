import React from "react";

import style from "./chat-contact-search.module.scss";

const ChatContactSearch = () => {
  return (
    <form onSubmit={() => false} className={style.chat_contact_search}>
      <input type="text" placeholder="Find..." autoFocus />
    </form>
  );
};

export default ChatContactSearch;
