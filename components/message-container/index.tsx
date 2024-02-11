import { useEffect, useRef } from "react";

import Message from "../message";
import style from "./message-container.module.scss";

const MessageContainer = () => {
  const messageContainerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, []);

  const messages = new Array(10).fill(1).map((_, idx) => idx);

  return (
    <ul ref={messageContainerRef} className={style.message_container}>
      {messages.map((v) => (
        <Message
          key={v}
          isSender={Math.floor(Math.random() * 10) > 2}
          message={"message " + v.toString()}
          time="17.59"
        />
      ))}
    </ul>
  );
};

export default MessageContainer;
