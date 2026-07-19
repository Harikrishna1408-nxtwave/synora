import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ChatClient from "@/components/chat/ChatClient";

export default async function ChatPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-transparent pt-24 pb-8 px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <ChatClient />
      </div>
    </main>
  );
}