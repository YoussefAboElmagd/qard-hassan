import { Paperclip, Scissors } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import logo from "@/assets/images/logo.png";

interface Message {
  id: string;
  text: string;
  sender: "user" | "support";
  timestamp: string;
  avatar?: string;
}

interface ChatAreaProps {
  contactName: string;
  status: string;
  statusBadge: "in-progress" | "resolved" | null;
  messages: Message[];
  isOnline: boolean;
  userAvatar?: string;
}

export function ChatArea({ contactName, status, statusBadge, messages, isOnline, userAvatar }: ChatAreaProps) {
  const [messageText, setMessageText] = useState("");

  const handleSend = () => {
    if (messageText.trim()) {
      console.log("Sending:", messageText);
      setMessageText("");
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white h-screen">
      {/* Header */}
      <div className="border-b border-gray-200 px-8 py-4">
        <div className="flex-row-reverse items-center justify-end gap-3">
          <div className="text-right">
            <h2 className="text-gray-900 mb-0.5 font-medium text-lg">{contactName}</h2>
            <div className="flex-row-reverse items-center justify-end gap-1.5">
              {isOnline && <span className="w-2 h-2 rounded-full bg-green-500"></span>}
              <span className="text-sm text-gray-500 text-right">{status}</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            {userAvatar ? (
              <Image src={userAvatar} alt="User" width={40} height={40} className="object-cover" />
            ) : (
              <span className="text-gray-500 text-lg">م</span>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="flex flex-col gap-4 max-w-4xl">
          {messages.map((message) => (
            <div key={message.id}>
              {message.sender === "user" ? (
                /* User message */
                <div className="flex justify-start items-start gap-3">
                  <div className="bg-[#4A7396] text-white px-5 py-3 rounded-2xl rounded-tr-md max-w-md">
                    <p className="text-right">{message.text}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center shrink-0">
                    {userAvatar ? (
                      <Image src={userAvatar} alt="User" width={40} height={40} className="object-cover" />
                    ) : (
                      <span className="text-gray-500 text-lg">م</span>
                    )}
                  </div>
                </div>
              ) : (
                /* Support message */
                <div className="flex justify-end items-end gap-3">
                 
                  <div className="bg-gray-100 text-gray-900 px-5 py-3 rounded-2xl rounded-tl-md max-w-md">
                    <p className="text-right">{message.text}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-white border-2 border-green-400 flex items-center justify-center shrink-0">
                    <Image src={logo} alt="Support" width={24} height={24} className="object-contain" />
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          <div className="flex justify-end items-end gap-3">
           
            <div className="bg-gray-100 text-gray-900 px-5 py-3 rounded-2xl rounded-tl-md max-w-md">
              <p className="text-right">يكتب...</p>
            </div>
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white border-2 border-green-400 flex items-center justify-center shrink-0">
              <Image src={logo} alt="Support" width={24} height={24} className="object-contain" />
            </div>
          </div>

        </div>
      </div>

      {/* Input Area */}
      <div className="px-8 py-5 border-t border-gray-200">
        <div className="flex items-center gap-3 max-w-4xl">
          <button className="text-gray-400 hover:text-gray-600 p-2 shrink-0">
            <Paperclip className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="اكتب هنا"
              className="w-full text-right border border-gray-200 h-12 rounded-xl pr-4 pl-12 focus:outline-none focus:ring-2 focus:ring-[#4A7396] focus:border-transparent"
            />
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#4A7396] hover:bg-[#3A6386] text-white rounded-lg w-8 h-8 flex items-center justify-center"
              onClick={handleSend}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

