import React from "react";
import clsx from "clsx";

import { montserrat } from "@/font";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={clsx(montserrat.className, "light h-full")}>{children}</div>
  );
}
