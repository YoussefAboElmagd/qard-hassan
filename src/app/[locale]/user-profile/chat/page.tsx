"use client";

import { useState } from "react";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatArea } from "@/components/chat/ChatArea";

interface SelectedTicket {
  ticketNumber: string;
  chatRoomId: string;
  message: string;
  status: string;
}

export default function ChatPage() {
  const [selectedTicket, setSelectedTicket] = useState<SelectedTicket | null>(null);

  const handleSelectConversation = (
    ticketNumber: string,
    chatRoomId: string,
    message: string,
    status: string
  ) => {
    setSelectedTicket({ ticketNumber, chatRoomId, message, status });
  };

  return (
    <div className="flex  flex-1  overflow-hidden h-full pt-10">
      <div className="flex flex-1 h-full">
        {selectedTicket ? (
          <ChatArea
            ticketNumber={selectedTicket.ticketNumber}
            chatRoomId={selectedTicket.chatRoomId}
            initialMessage={selectedTicket.message}
            status={selectedTicket.status}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            اختر تذكرة لعرض المحادثة
          </div>
        )}
      </div>

      <div className="h-full">
        <ChatSidebar
          selectedId={selectedTicket?.ticketNumber || ""}
          onSelectConversation={handleSelectConversation}
        />
      </div>
    </div>
  );
}
