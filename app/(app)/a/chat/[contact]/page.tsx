import dynamic from "next/dynamic";

const ChatPage = dynamic(() => import("@/components/chat-page"), {
  ssr: false,
});

export default async function Page({
  params,
}: {
  params: { contact: string };
}) {
  return (
    <div>
      <ChatPage contactId={params.contact} />
    </div>
  );
}
