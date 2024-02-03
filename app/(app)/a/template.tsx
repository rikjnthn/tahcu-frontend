"use client";

import { HomePageProvider } from "@/context/home-page-context";
import HomePage from "@/components/home-page";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <main className="main-page">
      <div className="home-page-container">
        <HomePageProvider>
          <HomePage />
        </HomePageProvider>
      </div>
      <div className="chat-page-container">{children}</div>
    </main>
  );
}
