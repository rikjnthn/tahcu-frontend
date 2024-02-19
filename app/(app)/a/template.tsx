"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";

import { HomePageProvider } from "@/context/home-page-context";
import HomePage from "@/components/home-page";

const ReactQueryDevtools = dynamic(() =>
  import("@tanstack/react-query-devtools/production").then((d) => ({
    default: d.ReactQueryDevtools,
  }))
);

const queryClient = new QueryClient();

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <main className="main-page">
        <div className="home-page-container">
          <HomePageProvider>
            <HomePage />
          </HomePageProvider>
        </div>
        <div className="chat-page-container">{children}</div>
      </main>
    </QueryClientProvider>
  );
}
