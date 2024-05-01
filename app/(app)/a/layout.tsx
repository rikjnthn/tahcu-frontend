"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";

import { DarkModeProvider } from "@/context/dark-mode-context";
import { HomePageProvider } from "@/context/home-page-context";
import HomePage from "@/components/home-page";
import { URLHashProvider } from "@/context/url-hash-context";

const ReactQueryDevtools = dynamic(
  async () => {
    return import("@tanstack/react-query-devtools/production").then((d) => ({
      default: d.ReactQueryDevtools,
    }));
  },
  { ssr: false }
);

const SocketProvider = dynamic(
  () =>
    import("@/context/socket-connection-context").then((d) => ({
      default: d.SocketProvider,
    })),
  { ssr: false }
);

const getDarkModeValue = () => {
  if (typeof localStorage === "undefined") return false;

  const theme = localStorage.getItem("theme");
  const isDarkMode = theme === "dark";
  return isDarkMode;
};

const queryClient = new QueryClient();

export default function Layout({ children }: { children: React.ReactNode }) {
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
      {process.env.NODE_ENV === "development" ? <ReactQueryDevtools /> : null}
      <SocketProvider>
        <DarkModeProvider value={{ isDark, setIsDark }}>
          <URLHashProvider>
            <main className={`main-page ${isDark ? "dark" : "light"}`}>
              <div className="home-page-container">
                <HomePageProvider>
                  <HomePage />
                </HomePageProvider>
              </div>
              <div className="chat-page-container">{children}</div>
            </main>
          </URLHashProvider>
        </DarkModeProvider>
      </SocketProvider>
    </QueryClientProvider>
  );
}
