import React from "react";
import Image from "next/image";

import style from "./landing-page-body.module.scss";

const LandingPageBody = () => {
  return (
    <section>
      <div className={style.first}>
        <h1>Chat With Someone Privately</h1>
        <div className={style.chat_preview}>
          <div className={style.user_1}>
            <div>Hello there!</div>
            <Image src="/user-1.jpg" alt="User one" width={640} height={960} />
          </div>
          <div className={style.user_2}>
            <Image src="/user-2.jpg" alt="User two" width={640} height={427} />
            <div>Hi</div>
          </div>
        </div>
      </div>
      <div className={style.second}>
        <h1>Create Group With Your Friends</h1>
        <Image
          src="/group-chat.png"
          alt="group chat"
          width={517}
          height={932}
        />
      </div>
    </section>
  );
};

export default LandingPageBody;
