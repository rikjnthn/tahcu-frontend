import { io } from "socket.io-client";

import cookieParser from "@/util/cookie-parser";

export const messageSocket = () => {
  const cookies = cookieParser(document.cookie);

  return io(`${process.env.NEXT_PUBLIC_API_URL}/message`, {
    path: "/message",
    extraHeaders: {
      "x-csrf-token": decodeURIComponent(cookies?.CSRF_TOKEN ?? ""),
    },
    withCredentials: true,
    autoConnect: false,
  });
};
