import React from "react";
import { Viewport } from "next";
import { redirect } from "next/navigation";

import { poppins } from "@/font";
import { isTahcuTokenVerified } from "@/action/auth";

export const viewport: Viewport = {
  userScalable: false,
};

async function Layout({ children }: { children: React.ReactNode }) {
  const isValid = await isTahcuTokenVerified();

  if (!isValid) redirect("/");
  return (
    <div
      className={`${poppins.className} user-select-none overflow-hidden h-full`}
    >
      {children}
    </div>
  );
}

export default Layout;
