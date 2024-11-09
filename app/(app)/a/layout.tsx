"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import clsx from "clsx";

import { DarkModeProvider } from "@/context/dark-mode-context";
import { HomePageProvider } from "@/context/home-page-context";
import { SocketProvider } from "@/context/socket-connection-context";
import HomePage from "@/components/home-page";
import { URLHashProvider } from "@/context/url-hash-context";
import cookieParser from "@/util/cookie-parser";

const ReactQueryDevtools = dynamic(
  async () => {
    return import("@tanstack/react-query-devtools/production").then((d) => ({
      default: d.ReactQueryDevtools,
    }));
  },
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

  useEffect(() => {
    const tahcuToken = cookieParser(document.cookie)?.tahcu_auth;

    const tokenExp = jwtDecode(tahcuToken ?? "").exp;

    if (!tokenExp) return;

    const fiveDaysInMs = 432_000_000;
    const fiveDaysBeforeTokenExpInMs = tokenExp * 1000 - fiveDaysInMs;

    const fiveMinutesInMs = 300_000;

    const intervalId = setInterval(() => {
      if (fiveDaysBeforeTokenExpInMs < Date.now()) {
        axios.post("/api/refresh-token").catch((err) => console.log(err));
      }
    }, fiveMinutesInMs);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV === "development" ? <ReactQueryDevtools /> : null}
      <SocketProvider>
        <DarkModeProvider value={{ isDark, setIsDark }}>
          <URLHashProvider>
            <main
              className={clsx("main-page h-full", isDark ? "dark" : "light")}
            >
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
