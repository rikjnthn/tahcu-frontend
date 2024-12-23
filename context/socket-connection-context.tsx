"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

import cookieParser from "@/util/cookie-parser";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
  const context = useContext(SocketContext);

  if (!context)
    throw new Error("useSocket must be used within a SocketProvider");

  return context;
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [messageIo, setMessageIo] = useState<Socket>();

  useEffect(() => {
    const cookies = cookieParser(document.cookie);

    const messageIo = io(`${process.env.NEXT_PUBLIC_API_URL}/message`, {
      path: "/message",
      extraHeaders: {
        "x-csrf-token": decodeURIComponent(cookies?.CSRF_TOKEN ?? ""),
      },
      withCredentials: true,
      autoConnect: false,
    });

    setMessageIo(messageIo);

    messageIo.connect();
    return () => {
      messageIo.disconnect();
    };
  }, []);

  if (!messageIo) return;

  return (
    <SocketContext.Provider value={messageIo}>
      {children}
    </SocketContext.Provider>
  );
};
