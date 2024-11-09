"use client";

import { createContext, useContext } from "react";

import { SetStateType } from "@/interface";

const ChatPageContext = createContext<ChatPageStateType | null>(null);

const ChatPageDispatchContext = createContext<ChatPageSetStateType | null>(
  null
);

export const useChatPage = () => {
  const context = useContext(ChatPageContext);

  if (!context)
    throw new Error("useChatPage must be used within a ChatPageProvider");

  return context;
};

export const useChatPageDispatch = () => {
  const context = useContext(ChatPageDispatchContext);

  if (!context)
    throw new Error(
      "useChatPageDispatch must be used within a ChatPageProvider"
    );

  return context;
};

export const ChatPageProvider = ({
  stateContext,
  dispatchContext,
  children,
}: {
  stateContext: ChatPageStateType;
  dispatchContext: ChatPageSetStateType;
  children: React.ReactNode;
}) => {
  return (
    <ChatPageDispatchContext.Provider value={dispatchContext}>
      <ChatPageContext.Provider value={stateContext}>
        {children}
      </ChatPageContext.Provider>
    </ChatPageDispatchContext.Provider>
  );
};

interface ChatPageStateType {
  isOpenHeader: boolean;
  isRouteChangeComplete: boolean;
  isGroup: boolean;
  name: string;
}

interface ChatPageSetStateType {
  setIsOpenHeader: SetStateType<boolean>;
  setIsRouteChangeComplete: SetStateType<boolean>;
}
