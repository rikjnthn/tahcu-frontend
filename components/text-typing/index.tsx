"use client";

import React, { forwardRef, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Socket } from "socket.io-client";

import style from "./text-typing.module.scss";
import { useChat, useChatDispatch } from "@/context/chat-context";
import { useSocket } from "@/context/socket-connection-context";
import { useChatPage } from "@/context/chat-page-context";
import { ContactType, GroupType, UserDataType } from "@/interface";
import { useDarkMode } from "@/context/dark-mode-context";
import { useURLHash } from "@/context/url-hash-context";

const handleGroup = ({
  io,
  isEditMessage,
  editMessageId,
  message,
  user,
  group,
}: {
  io: Socket;
  isEditMessage: boolean;
  editMessageId?: string;
  group?: GroupType;
  user?: UserDataType;
  message: string;
}) => {
  if (isEditMessage) {
    io.emit("update", {
      group_id: group?.id,
      data: {
        message_id: editMessageId,
        group_id: group?.id,
        sender_id: user?.user_id,
        message,
      },
    });

    return;
  }

  io.emit("create", {
    group_id: group?.id,
    data: {
      sender_id: user?.user_id,
      group_id: group?.id,
      message,
    },
  });
};

const handlePrivateChat = ({
  io,
  isEditMessage,
  contact,
  user,
  message,
  editMessageId,
}: {
  io: Socket;
  isEditMessage: boolean;
  user?: UserDataType;
  contact?: ContactType;
  editMessageId?: string;
  message: string;
}) => {
  if (isEditMessage) {
    io.emit("update", {
      chat_id: contact?.id,
      data: {
        id: editMessageId,
        sender_id: user?.user_id,
        receiver_id:
          user?.user_id === contact?.user_id
            ? contact?.friends_id
            : contact?.user_id,
        message,
      },
    });

    return;
  }

  io.emit("create", {
    chat_id: contact?.id,
    data: {
      sender_id: user?.user_id,
      receiver_id:
        user?.user_id === contact?.user_id
          ? contact?.friends_id
          : contact?.user_id,
      message,
    },
  });
};

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
  const { groupChatIo, privateChatIo } = useSocket();
  const { isEditMessage, editMessageId } = useChat();
  const { isGroup } = useChatPage();
  const { setIsEditMessage } = useChatDispatch();
  const { isDark } = useDarkMode();

  const group = queryClient.getQueryData<GroupType>(["group", chatId]);
  const user = queryClient.getQueryData<UserDataType>(["userData"]);
  const contacts = queryClient.getQueryData<ContactType[]>(["contactList"]);
  const contact = contacts?.find((val) => val.id === chatId);

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

    isGroup
      ? handleGroup({
          io: groupChatIo,
          isEditMessage,
          editMessageId,
          message,
          user,
          group,
        })
      : handlePrivateChat({
          io: privateChatIo,
          isEditMessage,
          user,
          contact,
          editMessageId,
          message,
        });

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
