"use client";

import { useRef } from "react";

import style from "./send-message-place.module.scss";
import TextTyping from "../text-typing";

const SendMessagePlace = () => {
  const sendMassagePlaceRef = useRef<HTMLDivElement>(null);
  const textTypingRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    if (textTypingRef.current && sendMassagePlaceRef.current) {
      textTypingRef.current.style.height = "0";
      sendMassagePlaceRef.current.style.height = "0";

      const { scrollHeight } = textTypingRef.current;

      textTypingRef.current.style.height = `${scrollHeight}px`;
      sendMassagePlaceRef.current.style.height = `${28 + scrollHeight}px`;
    }
  };
  return (
    <div ref={sendMassagePlaceRef} className={style.send_message_place}>
      <TextTyping onInput={handleInput} ref={textTypingRef} />
    </div>
  );
};

export default SendMessagePlace;
