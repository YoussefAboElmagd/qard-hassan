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
    <div className="w-[330px] border-r border-gray-200">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <h2 className="text-gray-800 font-bold text-lg text-stroke">رسائل الدعم</h2>
              <span className="text-black font-bold text-lg bg-primary/20 rounded-3xl px-3">12</span>
            </div>
          </div>
          <button className="w-8 h-8 my-2 rounded-full bg-[#4A7396] text-white flex items-center justify-center hover:bg-[#3A6386] transition-colors">
            <Plus className="w-5 h-5 " />
          </button>
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        <div className="m-4">
          <input
            type="text"
            placeholder="بحث"
            className="w-full text-right bg-gray-100 border border-gray-200 h-10 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#4A7396] focus:border-transparent"
          />
        </div>
        <div className="flex flex-col">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => onSelectConversation(conversation.id)}
              className={`px-5 py-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${selectedId === conversation.id ? "bg-gray-50" : ""
                }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-primary/80 text-sm font-bold text-stroke">{conversation.name}</h3>
                <span className="text-sm text-gray-400">{conversation.timestamp}</span>
              </div>
              <p className="text-sm text-gray-400 mb-2 text-right">{conversation.preview}</p>
              {conversation.status && (
                <div className="flex justify-end">
                  <span
                    className={`inline-flex items-center rounded-md px-3 py-0.5 text-sm ${conversation.status === "in-progress"
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

