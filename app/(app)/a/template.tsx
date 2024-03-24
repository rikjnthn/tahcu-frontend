"use client";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { HomePageProvider } from "@/context/home-page-context";
import HomePage from "@/components/home-page";

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
