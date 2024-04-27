import React, { createContext, useContext, useEffect, useMemo } from "react";
import { Socket } from "socket.io-client";

import { groupChatSocket, privateChatSocket } from "@/socket";

const SocketContext = createContext<SocketsType | null>(null);

export const useSocket = () => {
  const context = useContext(SocketContext);

  if (!context)
    throw new Error("useSocket must be used within a SocketProvider");

  return context;
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const groupChatIo = useMemo(groupChatSocket, []);
  const privateChatIo = useMemo(privateChatSocket, []);

  useEffect(() => {
    groupChatIo.connect();
    privateChatIo.connect();

    return () => {
      groupChatIo.disconnect();
      privateChatIo.disconnect();
    };
  }, [groupChatIo, privateChatIo]);

  return (
    <SocketContext.Provider
      value={{
        groupChatIo,
        privateChatIo,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

interface SocketsType {
  privateChatIo: Socket;
  groupChatIo: Socket;
}
