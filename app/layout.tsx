import type { Metadata } from "next";

import "../style/globals.scss";

export const metadata: Metadata = {
  title: "Tahcu",
  description: "Tahcu is free and simple to chat",
  icons: {
    icon: "/tahcu-white.svg",
    apple: "/tahcu-white.svg",
  },
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
