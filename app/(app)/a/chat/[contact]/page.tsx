import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

import { isTahcuTokenVerified } from "@/action/auth";

const ChatPage = dynamic(() => import("@/components/chat-page"), {
  ssr: false,
});

export default async function Page({
  params,
}: {
  params: { contact: string };
}) {
  const isValid = await isTahcuTokenVerified();
  if (!isValid) redirect("/login");

  return (
    <div>
      <ChatPage contact={params.contact} />
    </div>
  );
}
