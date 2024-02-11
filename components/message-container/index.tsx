import { useEffect, useRef } from "react";

import Message from "../message";
import style from "./message-container.module.scss";
import { SetStateType } from "@/interface";

const MessageContainer = ({
  chatPageRef,
  setIsEditMessage,
  edittedMessage,
  setMessageObject,
}: {
  chatPageRef: React.RefObject<HTMLDivElement>;
  edittedMessage: string;
  setIsEditMessage: SetStateType<boolean>;
  setMessageObject: SetStateType<any>;
}) => {
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
          edittedMessage={edittedMessage}
          setMessageObject={setIsEditMessage}
          chatPageRef={chatPageRef}
          setIsEditMessage={setMessageObject}
          isSender={Math.floor(Math.random() * 10) > 2}
          message={"message " + v.toString()}
          time="17.59"
        />
      ))}
    </ul>
  );
};

export default MessageContainer;
