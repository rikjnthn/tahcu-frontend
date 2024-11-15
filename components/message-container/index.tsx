"use client";
import React, { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";

import Message from "../message";
import style from "./message-container.module.scss";
import { UserDataType } from "@/interface";
import useMessages from "@/hooks/useMessage";
import { useChat } from "@/context/chat-context";

const MessageContainer = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [isMessageAdded, setIsMessageAdded] = useState<boolean>(false);
  const [isAtBottom, setIsAtBottom] = useState<boolean>(false);

  const messageContainerRef = useRef<HTMLUListElement>(null);
  const isAfterEdit = useRef<boolean>(false);

  const { messages, fetchNextMessages, shouldFetch } = useMessages({
    setScrollPosition,
    setIsMessageAdded,
  });
  const { isEditMessage } = useChat();
  const queryClient = useQueryClient();

  const userData = queryClient.getQueryData<UserDataType>(["userData"]);

  useEffect(() => {
    const messageContainer = messageContainerRef.current;

    if (!messageContainer) return;

    const scrollTop = messageContainer.scrollTop;
    const clientHeight = messageContainer.clientHeight;
    const scrollHeight = messageContainer.scrollHeight;

    if (isAfterEdit.current) {
      isAfterEdit.current = false;
      return;
    }

    if (isAtBottom && isMessageAdded) {
      messageContainer.scrollTo({ top: scrollTop + clientHeight });

      setIsMessageAdded(false);
      return;
    }

    if (scrollPosition !== messageContainer.scrollHeight) {
      const diff = scrollHeight - scrollPosition;

      if (diff > 0) messageContainer.scrollTo({ top: diff });

      setScrollPosition(scrollHeight);
    }
  }, [scrollPosition, messages, isMessageAdded, isAtBottom]);

  useEffect(() => {
    const firstChild = messageContainerRef.current?.firstElementChild;

    if (!firstChild) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!messageContainerRef.current) return;

          setScrollPosition(messageContainerRef.current.scrollHeight);
        }
      });
    });

    observer.observe(firstChild);
  }, [messages]);

  useEffect(() => {
    if (isEditMessage) isAfterEdit.current = true;
  }, [isEditMessage]);

  const handleScroll = async (e: React.UIEvent<HTMLUListElement, UIEvent>) => {
    const clientHeight = e.currentTarget.clientHeight;
    const scrollTop = e.currentTarget.scrollTop;
    const scrollHeight = e.currentTarget.scrollHeight;

    if (Math.abs(scrollTop + clientHeight - scrollHeight) < 3) {
      setIsAtBottom(true);
    } else {
      setIsAtBottom(false);
      setScrollPosition(scrollHeight);
    }

    if (!shouldFetch.current) return;

    if (scrollTop === 0) fetchNextMessages();
  };

  const locale = navigator.languages
    ? navigator.languages[0]
    : navigator.language;

  const time = new Intl.DateTimeFormat(locale, {
    timeStyle: "short",
    hour12: false,
  });

  const date = new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <ul
      ref={messageContainerRef}
      onScroll={handleScroll}
      className={clsx(style.message_container)}
    >
      {messages.map(({ id, message, sent_at, sender_id, sender }, idx) => {
        const currentDate = date.format(new Date(sent_at));

        if (!messages[idx - 1])
          return (
            <React.Fragment key={id}>
              <li key={currentDate} className={clsx(style.date_badge)}>
                {currentDate}
              </li>

              <Message
                key={id}
                id={id}
                isSender={sender_id === userData?.user_id}
                message={message}
                time={time.format(new Date(sent_at))}
                name={sender.username}
              />
            </React.Fragment>
          );

        const prevDate = date.format(new Date(messages[idx - 1]?.sent_at));

        if (currentDate === prevDate) {
          return (
            <Message
              key={id}
              id={id}
              isSender={sender_id === userData?.user_id}
              message={message}
              time={time.format(new Date(sent_at))}
              name={sender.username}
            />
          );
        }

        return (
          <React.Fragment key={id}>
            <li key={currentDate} className={clsx(style.date_badge)}>
              {currentDate}
            </li>

            <Message
              key={id}
              id={id}
              isSender={sender_id === userData?.user_id}
              message={message}
              time={time.format(new Date(sent_at))}
              name={sender.username}
            />
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default MessageContainer;
