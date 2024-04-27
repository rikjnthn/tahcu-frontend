"use client";

import React, { forwardRef, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";

import style from "./text-typing.module.scss";
import { useChat, useChatDispatch } from "@/context/chat-context";
import { useSocket } from "@/context/socket-connection-context";
import { UserDataType } from "@/interface";
import { useDarkMode } from "@/context/dark-mode-context";
import { useURLHash } from "@/context/url-hash-context";
import { useChatPage } from "@/context/chat-page-context";

const TextTyping = (
  {
    textareaRef,
    onInput,
  }: {
    textareaRef: React.RefObject<HTMLTextAreaElement>;
    onInput?: React.FormEventHandler<HTMLTextAreaElement>;
  },
  ref: React.ForwardedRef<HTMLTextAreaElement>
) => {
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const { hash: chatId } = useURLHash();
  const queryClient = useQueryClient();
  const messageIo = useSocket();
  const { isEditMessage, editMessageId } = useChat();
  const { isGroup } = useChatPage();
  const { setIsEditMessage } = useChatDispatch();
  const { isDark } = useDarkMode();

  const user = queryClient.getQueryData<UserDataType>(["userData"]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      submitButtonRef.current?.click();
      e.preventDefault();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = textareaRef.current?.value ?? "";
    setIsEditMessage(false);

    if (isEditMessage) {
      messageIo.emit("update", {
        chat_id: chatId,
        data: { id: editMessageId, message },
      });
    } else {
      messageIo.emit("create", {
        chat_id: chatId,
        data: {
          sender_id: user?.user_id,
          group_id: isGroup ? chatId : undefined,
          contact_id: !isGroup ? chatId : undefined,
          message,
        },
      });
    }
    if (textareaRef.current) textareaRef.current.value = "";
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

export default forwardRef(TextTyping);
