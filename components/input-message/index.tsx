"use client";
import React, { forwardRef, useRef } from "react";

import style from "./input-message.module.scss";
import { useChat, useChatDispatch } from "@/context/chat-context";
import { useSocket } from "@/context/socket-connection-context";
import { useDarkMode } from "@/context/dark-mode-context";
import { useURLHash } from "@/context/url-hash-context";
import { useChatPage } from "@/context/chat-page-context";

const InputMessage = (
  { inputMessageRef, onInput }: InputMessagePropsType,
  ref: React.ForwardedRef<HTMLTextAreaElement>
) => {
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const { hash: chatId } = useURLHash();
  const messageIo = useSocket();
  const { isEditMessage, editMessageId } = useChat();
  const { isGroup } = useChatPage();
  const { setIsEditMessage } = useChatDispatch();
  const { isDark } = useDarkMode();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      submitButtonRef.current?.click();
      e.preventDefault();
    }
  };

  const handleSendMessage = (message: string) => {
    if (messageIo.disconnected) return;

    if (isEditMessage) {
      messageIo.emit("update", {
        chat_id: chatId,
        data: { id: editMessageId, message },
      });

      return;
    }

    messageIo.emit("create", {
      chat_id: chatId,
      data: {
        group_id: isGroup ? chatId : undefined,
        contact_id: !isGroup ? chatId : undefined,
        message,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = inputMessageRef.current?.value;

    setIsEditMessage(false);

    if (!message) return;

    handleSendMessage(message);

    const textarea = inputMessageRef.current;
    const inputMessageContainer = textarea.parentElement?.parentElement;

    textarea.value = "";
    textarea.style.height = "0px";

    if (inputMessageContainer) {
      inputMessageContainer.style.height = "0px";
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className={style.text_typing}
    >
      <textarea
        ref={ref}
        onInput={onInput}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        placeholder="Text here..."
      />

      <button
        ref={submitButtonRef}
        className={`icon ${style.plane_button}`}
        type="submit"
        title="Send message"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.74878 4.94412L14.2758 0.768443L10.6054 13.2894L8.60146 6.99126L8.51816 6.72945L8.25251 6.65939L1.74878 4.94412Z"
            stroke={isDark ? "#fff" : "#000"}
          />
        </svg>
      </button>
    </form>
  );
};

export default forwardRef(InputMessage);

interface InputMessagePropsType {
  inputMessageRef: React.RefObject<HTMLTextAreaElement>;
  onInput?: React.FormEventHandler<HTMLTextAreaElement>;
}
