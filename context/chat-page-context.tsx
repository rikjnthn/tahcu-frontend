import { createContext, useContext, useEffect, useState } from "react";

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
  contact,
  children,
}: {
  contact: string;
  children: React.ReactNode;
}) => {
  const [isOpenHeader, setIsOpenHeader] = useState<boolean>(false);
  const [isRouteChangeComplete, setIsRouteChangeComplete] =
    useState<boolean>(false);

  useEffect(() => {
    setIsRouteChangeComplete(true);
  }, [contact]);
  return (
    <ChatPageContext.Provider value={{ isOpenHeader, isRouteChangeComplete }}>
      <ChatPageDispatchContext.Provider
        value={{ setIsOpenHeader, setIsRouteChangeComplete }}
      >
        {children}
      </ChatPageDispatchContext.Provider>
    </ChatPageContext.Provider>
  );
};

interface ChatPageStateType {
  isOpenHeader: boolean;
  isRouteChangeComplete: boolean;
}

interface ChatPageSetStateType {
  setIsOpenHeader: SetStateType<boolean>;
  setIsRouteChangeComplete: SetStateType<boolean>;
}
