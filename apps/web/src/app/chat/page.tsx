import { auth } from "@/auth";
import { redirect } from "next/navigation";

import ChatHeader from "@/components/chat/ChatHeader";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatInput";
import SuggestedPrompts from "@/components/chat/SuggestedPrompts";

export default async function ChatPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl p-8">
        <div className="space-y-8">
          <ChatHeader />

          <div className="grid gap-8 lg:grid-cols-4">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ChatSidebar />
            </div>

            {/* Chat Area */}
            <div className="space-y-6 lg:col-span-3">
              <SuggestedPrompts />

              <ChatMessages />

              <ChatInput />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}