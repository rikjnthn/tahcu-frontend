"use client";

import { HomePageProvider } from "@/context/home-page-context";
import HomePage from "@/components/home-page";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div>
        <HomePageProvider>
          <HomePage />
        </HomePageProvider>
      </div>
      <div>{children}</div>
    </main>
  );
}
