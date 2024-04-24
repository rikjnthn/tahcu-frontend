"use client";

import ChatPage from "@/components/chat-page";
import { useURLHash } from "@/context/url-hash-context";

export default function Page() {
  const { hash } = useURLHash();

  if (!hash) return;

  return <ChatPage contactId={hash} />;
}
