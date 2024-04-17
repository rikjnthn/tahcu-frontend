"use client";

import ChatPage from "@/components/chat-page";

export default function Page({
  searchParams,
}: {
  searchParams: { chatId: string };
}) {
  if (searchParams.chatId) return <ChatPage contactId={searchParams.chatId} />;

  return null;
}
