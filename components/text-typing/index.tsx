"use client";

import React, { forwardRef, useRef } from "react";

import style from "./text-typing.module.scss";
import { SetStateType } from "@/interface";

const TextTyping = (
  {
    onInput,
    isEditMessage,
    setIsEditMessage,
    messageObject,
    setMessageObject,
  }: {
    onInput?: React.FormEventHandler<HTMLTextAreaElement>;
    isEditMessage: boolean;
    setIsEditMessage: SetStateType<boolean>;
    setMessageObject: SetStateType<any>;
    messageObject: any;
  },
  ref: React.Ref<HTMLTextAreaElement>
) => {
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      submitButtonRef.current?.click();
      e.preventDefault();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    setIsEditMessage(false);
    e.preventDefault();
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
        title="send"
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
            stroke="#000"
          />
        </svg>
      </button>
    </form>
  );
};

export default forwardRef(TextTyping);
