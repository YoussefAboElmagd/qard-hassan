"use client";

import { useState } from "react";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatArea } from "@/components/chat/ChatArea";

const mockConversations = [
  {
    id: "1",
    name: "مشكلة بشاشة القروض",
    preview: "مشكلة بشاشة القروض.....",
    timestamp: "12m",
    status: "in-progress" as const,
  },
  {
    id: "2",
    name: "مشكلة بشاشة القروض",
    preview: "مشكلة بشاشة القروض.....",
    timestamp: "12m",
  },
  {
    id: "3",
    name: "مشكلة بشاشة القروض",
    preview: "مشكلة بشاشة القروض.....",
    timestamp: "12m",
    status: "resolved" as const,
  },
  {
    id: "4",
    name: "مشكلة بشاشة القروض",
    preview: "مشكلة بشاشة القروض.....",
    timestamp: "12m",
    status: "resolved" as const,
  },
  {
    id: "5",
    name: "مشكلة بشاشة القروض",
    preview: "مشكلة بشاشة القروض.....",
    timestamp: "12m",
    status: "resolved" as const,
  },
];

const mockMessages = [
  {
    id: "1",
    text: "لدي مشكلة بشاشة طلب القرض",
    sender: "user" as const,
    timestamp: "12m",
  },
  {
    id: "2",
    text: "ناسف لسماع ذلك",
    sender: "support" as const,
    timestamp: "12m",
  },
];

export default function ChatPage() {
  const [selectedConversation, setSelectedConversation] = useState("1");

  return (
    <div className="flex h-screen bg-white rounded-xl overflow-hidden shadow-lg">
      <ChatArea
        contactName="جاري العمل"
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

