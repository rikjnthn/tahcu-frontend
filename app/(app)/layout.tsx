import React from "react";
import { Viewport } from "next";

import { poppins } from "@/font";


export const viewport: Viewport = {
  userScalable: false,
};

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${poppins.className} user-select-none`}>{children}</div>
  );
}

export default Layout;
