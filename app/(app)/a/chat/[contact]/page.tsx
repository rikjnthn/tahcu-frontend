"use client";

import ChatPage from "@/components/chat-page";
import { ChatPageProvider } from "@/context/chat-page-context";

export default function Page({ params }: { params: { contact: string } }) {
  return (
    <div>
      <ChatPageProvider contact={params.contact}>
        <ChatPage />
      </ChatPageProvider>
    </div>
  );
}
