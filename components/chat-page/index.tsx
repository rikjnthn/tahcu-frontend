"use client";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";

import Chat from "@/components/chat";
import ChatProfile from "@/components/chat-profile";
import style from "./chat-page.module.scss";
import { ChatPageProvider } from "@/context/chat-page-context";
import { ChatProvider } from "@/context/chat-context";
import { ChatType, UserDataType } from "@/interface";
import { useURLHash } from "@/context/url-hash-context";
import getChats from "@/util/get-chats";

const ChatPage = () => {
  const [isOpenHeader, setIsOpenHeader] = useState<boolean>(false);
  const [isCloseChatPage, setIsCloseChatPage] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [isGroup, setIsGroup] = useState<boolean>(false);

  const { hash: chatId } = useURLHash();

  useEffect(() => {
    setIsCloseChatPage(true);
  }, [chatId]);

  const queryClient = useQueryClient();

  const { data: chats } = useQuery<ChatType[]>({
    queryKey: ["chats"],
    queryFn: getChats,
    refetchOnWindowFocus: false,
  });
  const userData = queryClient.getQueryData<UserDataType>(["userData"]);

  useEffect(() => {
    const foundChat = chats?.find((chat) => chat.id === chatId);

    if (!foundChat) return;

    if (foundChat?.type === "Group") {
      setIsGroup(true);
      setName(foundChat.name);
    } else {
      const { friends, user_id, user } = foundChat;

      const name =
        user_id === userData?.user_id ? friends.username : user.username;

      setIsGroup(false);
      setName(name);
    }
  }, [chatId, chats, userData]);

  return (
    <ChatPageProvider
      stateContext={{ isOpenHeader, isCloseChatPage, isGroup, name }}
      dispatchContext={{ setIsOpenHeader, setIsCloseChatPage }}
    >
      <div className={style.chat_page}>
        <div
          className={clsx(
            "z-1",
            isOpenHeader ? "translateX-0" : "translateX-100"
          )}
        >
          <ChatProfile />
        </div>
        <div
          className={clsx(isCloseChatPage ? "translateX-0" : "translateX-100")}
        >
          <ChatProvider>
            <Chat />
          </ChatProvider>
        </div>
      </div>
    </ChatPageProvider>
  );
};

export default ChatPage;
