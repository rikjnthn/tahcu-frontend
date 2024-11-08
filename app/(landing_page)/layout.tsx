import React from "react";

import { montserrat } from "@/font";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${montserrat.className} light h-full`}>{children}</div>
  );
}
