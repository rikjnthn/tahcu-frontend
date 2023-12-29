import type { Metadata } from "next";

import { poppins } from "@/font";
import "../style/globals.scss";

export const metadata: Metadata = {
  title: "Tahcu",
  description: "Tahcu is free and simple to chat",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} user-select-none`}>
        {children}
      </body>
    </html>
  );
}
