"use client";
import { useEffect, useRef } from "react";

import style from "./input-message-container.module.scss";
import InputMessage from "../input-message";
import CloseButton from "../close-button";
import { useChat, useChatDispatch } from "@/context/chat-context";
import { useDarkMode } from "@/context/dark-mode-context";

const InputMessageContainer = () => {
  const inputMessageContainerRef = useRef<HTMLDivElement>(null);
  const inputMessageRef = useRef<HTMLTextAreaElement>(null);

  const { isEditMessage, editMessage } = useChat();
  const { setIsEditMessage } = useChatDispatch();
  const { isDark } = useDarkMode();

  const handleInput = () => {
    const inputMessage = inputMessageRef.current;
    const inputMessageContainer = inputMessageContainerRef.current;

    if (inputMessage && inputMessageContainer) {
      inputMessage.style.height = "0";
      inputMessageContainer.style.height = "0";

      inputMessage.style.height = `${inputMessage.scrollHeight}px`;
      inputMessageContainer.style.height = `${
        28 + inputMessage.scrollHeight
      }px`;
    }
  };

  const cancelEditMessage = () => {
    const inputMessage = inputMessageRef.current;
    const inputMessageContainer = inputMessageContainerRef.current;

    setIsEditMessage(false);

    if (inputMessage && inputMessageContainer) {
      inputMessage.value = "";
      inputMessage.style.height = "0px";
      inputMessageContainer.style.height = "0px";
    }
  };

  useEffect(() => {
    const inputMessage = inputMessageRef.current;
    const inputMessageContainer = inputMessageContainerRef.current;

    if (isEditMessage && inputMessage && inputMessageContainer) {
      inputMessage.focus();
      inputMessage.value = editMessage;

      inputMessage.style.height = `${inputMessage.scrollHeight}px`;
      inputMessageContainer.style.height = `${
        inputMessage.scrollHeight + 28
      }px`;
    }
  }, [isEditMessage, editMessage]);

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
              onClick={cancelEditMessage}
              stroke={isDark ? "#fff" : "#000"}
              title="Cancel edit message"
            />
          </div>
        </div>
      )}
      <div ref={inputMessageContainerRef} className={style.send_message_place}>
        <InputMessage
          onInput={handleInput}
          inputMessageRef={inputMessageRef}
          ref={inputMessageRef}
        />
      </div>
    </div>
  );
};

export default InputMessageContainer;
