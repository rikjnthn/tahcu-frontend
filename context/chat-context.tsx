import { SetStateType } from "@/interface";
import { createContext, useContext, useRef, useState } from "react";

const ChatContext = createContext<ChatStateType | null>(null);

const ChatDispatchContext = createContext<ChatSetStateType | null>(null);

export const useChat = () => {
  const context = useContext(ChatContext);

  if (!context)
    throw new Error("useChat must be used within a ChatPageProvider");

  return context;
};

export const useChatDispatch = () => {
  const context = useContext(ChatDispatchContext);

  if (!context)
    throw new Error("useChatDispatch must be used within a ChatPageProvider");

  return context;
};

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [isEditMessage, setIsEditMessage] = useState<boolean>(false);
  const [editMessageId, setEditMessageId] = useState<string>("");
  const [editMessage, setEditMessage] = useState<string>("");

  const chatRef = useRef<HTMLDivElement>(null);
  return (
    <ChatContext.Provider
      value={{ isEditMessage, editMessage, editMessageId, chatRef }}
    >
      <ChatDispatchContext.Provider
        value={{ setEditMessage, setEditMessageId, setIsEditMessage }}
      >
        {children}
      </ChatDispatchContext.Provider>
    </ChatContext.Provider>
  );
};

interface ChatStateType {
  isEditMessage: boolean;
  editMessageId: string;
  editMessage: string;
  chatRef: React.RefObject<HTMLDivElement>;
}

interface ChatSetStateType {
  setIsEditMessage: SetStateType<boolean>;
  setEditMessageId: SetStateType<string>;
  setEditMessage: SetStateType<string>;
}
