import React from "react";

import ChatHomePage from "@/components/chat-home-page";
import CreateGroupPage from "@/components/create-group-page";
import CreatePrivateChat from "@/components/create-private-chat";
import style from "./home-page.module.scss";

const HomePage = () => {
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
