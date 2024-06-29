import React, { createContext, useContext, useEffect, useMemo } from "react";
import { Socket } from "socket.io-client";

import { messageSocket } from "@/socket";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
  const context = useContext(SocketContext);

  if (!context)
    throw new Error("useSocket must be used within a SocketProvider");

  return context;
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const messageIo = useMemo(messageSocket, []);

  useEffect(() => {
    messageIo.connect();
    return () => {
      messageIo.disconnect();
    };
  }, [messageIo]);

  return (
    <SocketContext.Provider value={messageIo}>
      {children}
    </SocketContext.Provider>
  );
};
