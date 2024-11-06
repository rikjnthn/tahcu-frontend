import React from "react";
import Image from "next/image";

import style from "./landing-page-body.module.scss";
import GroupChat from "@/public/group-chat.png";
import User1 from "@/public/user-1.jpg";
import User2 from "@/public/user-2.jpg";

const LandingPageBody = () => {
  return (
    <section>
      <div className={style.first}>
        <h1>Chat in Private Chat</h1>
        <div className={style.chat_preview}>
          <div className={style.user_1}>
            <div>Hello there!</div>
            <Image src={User1} alt="User one" width={640} height={960} />
          </div>
          <div className={style.user_2}>
            <Image src={User2} alt="User two" width={640} height={427} />
            <div>Hi</div>
          </div>
        </div>
      </div>
      <div className={style.second}>
        <h1>Or in Group Chat</h1>
        <Image src={GroupChat} alt="group chat" />
      </div>
    </section>
  );
};

export default LandingPageBody;
