import { Plus } from "lucide-react";

interface Conversation {
  id: string;
  name: string;
  preview: string;
  timestamp: string;
  status?: "in-progress" | "resolved";
  unread?: boolean;
}

interface ChatSidebarProps {
  conversations: Conversation[];
  selectedId: string;
  onSelectConversation: (id: string) => void;
}

export function ChatSidebar({ conversations, selectedId, onSelectConversation }: ChatSidebarProps) {
  return (
    <div className="w-[330px] border-l border-gray-200 bg-white flex flex-col h-screen">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-200">
        <div className="flex-row-reverse items-center justify-between mb-4">
          {/* <button className="w-8 h-8 my-2 rounded-full bg-[#4A7396] text-white flex items-center justify-center hover:bg-[#3A6386] transition-colors">
            <Plus className="w-5 h-3" />
          </button> */}
          <div className="flex-row-reverse items-center gap-2">
            <span className="inline-flex items-center bg-[#FFF4E6] text-[#D4A574] rounded-md px-3 py-1 text-sm">
              جاري العمل
            </span>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-lg">12</span>
              <h2 className="text-gray-900 text-lg font-medium">رسائل الدعم</h2>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="بحث"
            className="w-full text-right bg-gray-50 border border-gray-200 h-10 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#4A7396] focus:border-transparent"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => onSelectConversation(conversation.id)}
              className={`px-5 py-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedId === conversation.id ? "bg-gray-50" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-sm text-gray-400">{conversation.timestamp}</span>
                <h3 className="text-gray-900 font-medium">{conversation.name}</h3>
              </div>
              <p className="text-sm text-gray-400 mb-2 text-right">{conversation.preview}</p>
              {conversation.status && (
                <div className="flex justify-end">
                  <span
                    className={`inline-flex items-center rounded-md px-3 py-0.5 text-sm ${
                      conversation.status === "in-progress"
                        ? "bg-[#FFF4E6] text-[#D4A574]"
                        : "bg-[#E6F7F0] text-[#5CB88F]"
                    }`}
                  >
                    {conversation.status === "in-progress" ? "جاري العمل" : "تم الحل"}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

