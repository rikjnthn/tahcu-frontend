"use client";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";

import { HomePageProvider } from "@/context/home-page-context";
import HomePage from "@/components/home-page";
import { useEffect } from "react";
import cookieParser from "@/util/cookie-parser";

const ReactQueryDevtools = dynamic(() =>
  import("@tanstack/react-query-devtools/production").then((d) => ({
    default: d.ReactQueryDevtools,
  }))
);

const SocketProvider = dynamic(
  () =>
    import("@/context/socket-connection-context").then((d) => ({
      default: d.SocketProvider,
    })),
  { ssr: false }
);

const queryClient = new QueryClient();

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const cookies = cookieParser(document.cookie);

    axios.defaults.headers.common["x-csrf-token"] = decodeURIComponent(
      cookies.CSRF_TOKEN
    );
    axios.defaults.withCredentials = true;
  }, []);

  console.log("first");
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <SocketProvider>
        <main className="main-page">
          <div className="home-page-container">
            <HomePageProvider>
              <HomePage />
            </HomePageProvider>
          </div>
          <div className="chat-page-container">{children}</div>
        </main>
      </SocketProvider>
    </QueryClientProvider>
  );
}
