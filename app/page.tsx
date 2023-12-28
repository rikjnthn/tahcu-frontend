"use client";

import React from "react";

import HomePage from "@/components/home-page";
import { HomePageProvider } from "@/context/home-page-context";

export default function Page() {
  return (
    <main>
      <HomePageProvider>
        <HomePage />
      </HomePageProvider>
    </main>
  );
}
