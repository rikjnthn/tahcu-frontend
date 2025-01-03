"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { ChatType, SetStateType } from "@/interface";

const URLHashContext = createContext<URLHashContextType | null>(null);

export const useURLHash = () => {
  const context = useContext(URLHashContext);

  if (!context)
    throw new Error("useURLHash must be used within a URLHashProvider");

  return context;
};

export const URLHashProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [hash, setHash] = useState<string>("");

  const router = useRouter();
  const queryClient = useQueryClient();

  const chats = queryClient.getQueryData<ChatType[]>(["chats"]);

  useEffect(() => {
    setHash(window.location.hash.substring(1));
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const chatId = window.location.hash.substring(1);

      const isChatValid = chats?.find((chat) => chat.id === chatId);

      if (!isChatValid) {
        router.push(`${window.location.origin}/a#${hash}`);
        setHash(hash);
        return;
      }

      setHash(window.location.hash.substring(1));
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [chats, hash, router]);

  return (
    <URLHashContext.Provider value={{ hash, setHash }}>
      {children}
    </URLHashContext.Provider>
  );
};

interface URLHashContextType {
  hash: string;
  setHash: SetStateType<string>;
}
