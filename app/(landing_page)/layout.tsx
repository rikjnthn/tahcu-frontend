import React from "react";

import { montserrat } from "@/font";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${montserrat.className} overflow-scroll`}>{children}</div>
  );
}

export default Layout;
