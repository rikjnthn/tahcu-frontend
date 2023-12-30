import ChatPage from "@/components/chat-page";

export default function Page({ params }: { params: { contact: string } }) {
  return (
    <div>
      <ChatPage params={{ contact: params.contact }} />
    </div>
  );
}
