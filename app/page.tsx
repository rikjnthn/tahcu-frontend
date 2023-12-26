import React from "react";

import ChatHomePage from "@/components/chat-home-page";
import CreateGroupPage from "@/components/create-group-page";

export default function Page() {
  return (
    <main>
      <div>
        <ChatHomePage />
      </div>
      <div>
        <CreateGroupPage />
      </div>
    </main>
  );
}
