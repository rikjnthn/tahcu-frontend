import { io } from "socket.io-client";

import cookieParser from "@/util/cookie-parser";
import { redirect } from "next/navigation";
import { isTahcuTokenVerified } from "@/action/auth";

const isVerified = isTahcuTokenVerified();
if (!isVerified) redirect("/");

export const privateChatSocket = () => {
  const cookies = cookieParser(document.cookie);

  return io(`${process.env.NEXT_PUBLIC_API_URL}/message`, {
    path: "/private-message",
    extraHeaders: {
      "x-csrf-token": decodeURIComponent(cookies.CSRF_TOKEN),
    },
    withCredentials: true,
    autoConnect: false,
  });
};

export const groupChatSocket = () => {
  const cookies = cookieParser(document.cookie);

  return io(`${process.env.NEXT_PUBLIC_API_URL}/message`, {
    path: "/group-message",
    extraHeaders: {
      "x-csrf-token": decodeURIComponent(cookies.CSRF_TOKEN),
    },
    withCredentials: true,
    autoConnect: false,
  });
};
