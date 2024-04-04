"use client";

import { useEffect, useRef } from "react";

import style from "./send-message-place.module.scss";
import TextTyping from "../text-typing";
import CloseButton from "../close-button";
import { useChat, useChatDispatch } from "@/context/chat-context";

const SendMessagePlace = () => {
  const sendMassagePlaceRef = useRef<HTMLDivElement>(null);
  const textTypingRef = useRef<HTMLTextAreaElement>(null);

  const { isEditMessage, editMessage } = useChat();
  const { setIsEditMessage } = useChatDispatch();

  const handleInput = () => {
    if (textTypingRef.current && sendMassagePlaceRef.current) {
      textTypingRef.current.style.height = "0";
      sendMassagePlaceRef.current.style.height = "0";

      const { scrollHeight } = textTypingRef.current;

      textTypingRef.current.style.height = `${scrollHeight}px`;
      sendMassagePlaceRef.current.style.height = `${28 + scrollHeight}px`;
    }
  };

  const handleEditMessage = () => {
    setIsEditMessage(false);

    if (!textTypingRef.current) return;

    textTypingRef.current.value = "";
  };

  useEffect(() => {
    if (isEditMessage) textTypingRef.current?.focus();
  }, [isEditMessage]);

  return (
    <div>
      {isEditMessage && (
        <div className={style.edit_message_container}>
          <div className={style.edit_message}>
            <span>Editting</span>
            <span className={style.message}>{editMessage}</span>
          </div>
          <div className={style.close}>
            <CloseButton
              onClick={handleEditMessage}
              stroke="#000"
              title="Cancel edit message"
            />
          </div>
        </div>
      )}
      <div ref={sendMassagePlaceRef} className={style.send_message_place}>
        <TextTyping
          onInput={handleInput}
          textareaRef={textTypingRef}
          ref={textTypingRef}
        />
      </div>
    </div>
  );
};

export default SendMessagePlace;
