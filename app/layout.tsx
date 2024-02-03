import type { Metadata } from "next";

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
      <body>{children}</body>
    </html>
  );
}
