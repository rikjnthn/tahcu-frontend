"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";

import { HomePageProvider } from "@/context/home-page-context";
import HomePage from "@/components/home-page";
import { DarkModeProvider } from "@/context/dark-mode-context";

const ReactQueryDevtools = dynamic(
  () =>
    import("@tanstack/react-query-devtools/production").then((d) => ({
      default: d.ReactQueryDevtools,
    })),
  { ssr: false }
);

const SocketProvider = dynamic(
  () =>
    import("@/context/socket-connection-context").then((d) => ({
      default: d.SocketProvider,
    })),
  { ssr: false }
);

const queryClient = new QueryClient();

const getDarkModeValue = () => {
  if (typeof localStorage === "undefined") return false;

  const theme = localStorage.getItem("theme");
  const isDarkMode = theme === "dark";
  return isDarkMode;
};

export default function Template({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(getDarkModeValue);

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    axios.defaults.withXSRFToken = true;
    axios.defaults.xsrfCookieName = "CSRF_TOKEN";
    axios.defaults.xsrfHeaderName = "x-csrf-token";
    axios.defaults.withCredentials = true;
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <SocketProvider>
        <DarkModeProvider value={{ isDark, setIsDark }}>
          <main className={`main-page ${isDark ? "dark" : "light"}`}>
            <div className="home-page-container">
              <HomePageProvider>
                <HomePage />
              </HomePageProvider>
            </div>
            <div className="chat-page-container">{children}</div>
          </main>
        </DarkModeProvider>
      </SocketProvider>
    </QueryClientProvider>
  );
}
