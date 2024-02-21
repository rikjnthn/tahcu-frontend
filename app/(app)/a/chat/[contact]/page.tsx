import { redirect } from "next/navigation";

import { isTahcuTokenVerified } from "@/action/auth";
import ChatPage from "@/components/chat-page";

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
