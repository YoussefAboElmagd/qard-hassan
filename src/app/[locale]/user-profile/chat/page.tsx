"use client";

import { useState } from "react";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatArea } from "@/components/chat/ChatArea";

const mockConversations = [
  {
    id: "1",
    name: "مشكلة بشاشة القروض",
    preview: "مشكلة بشاشة القروض.....",
    timestamp: "١٢ دقيقة",
    status: "in-progress" as const,
    active: true,
  },
  {
    id: "3",
    name: "مشكلة بشاشة القروض",
    preview: "مشكلة بشاشة القروض.....",
    timestamp: "١٢ دقيقة",
    status: "resolved" as const,
    active: false,
  },
  {
    id: "4",
    name: "مشكلة بشاشة القروض",
    preview: "مشكلة بشاشة القروض.....",
    timestamp: "١٢ دقيقة",
    status: "resolved" as const,
    active: false,
  },
  {
    id: "5",
    name: "مشكلة بشاشة القروض",
    preview: "مشكلة بشاشة القروض.....",
    timestamp: "١٢ دقيقة",
    status: "resolved" as const,
    active: false,
  },
];

const mockMessages = [
  {
    id: "1",
    text: "لدي مشكلة بشاشة طلب القرض",
    sender: "user" as const,
    timestamp: "١٢ دقيقة",
  },
  {
    id: "2",
    text: "ناسف لسماع ذلك",
    sender: "support" as const,
    timestamp: "١٢ دقيقة",
  },
];

export default function ChatPage() {
  const [selectedConversation, setSelectedConversation] = useState("1");

  return (
    <div className="flex min-h-screen rounded-3xl overflow-hidden py-4">
      <ChatArea
        chatName="مشكلة بشاشة القروض"
        status="متصل"
        statusBadge="in-progress"
        messages={mockMessages}
        isOnline={true}
      />
      <ChatSidebar
        conversations={mockConversations}
        selectedId={selectedConversation}
        onSelectConversation={setSelectedConversation}
      />
    </div>
  );
}



