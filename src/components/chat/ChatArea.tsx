
import { useState } from "react";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import userAvatar from "@/assets/images/userProfileImg.jpg";

interface Message {
  id: string;
  text: string;
  sender: "user" | "support";
  timestamp: string;
  avatar: string;
}

interface ChatAreaProps {
  chatName: string;
  status: string;
  statusBadge: "in-progress" | "resolved" | "pending";
  messages: Message[];
  isOnline: boolean;
}

export function ChatArea({ chatName, status, statusBadge, messages }: ChatAreaProps) {
  const [messageText, setMessageText] = useState("");

  const handleSend = () => {
    if (messageText.trim()) {
      console.log("Sending:", messageText);
      setMessageText("");
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 py-4">
        <div className="flex items-center justify-between gap-3 px-3">
          <div className="text-right">
            <h2 className="text-gray-800 mb-0.5 font-bold text-stroke text-lg">{chatName}</h2>
            <div className="flex-row-reverse items-center justify-end gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 me-2"></span>
              <span className="text-sm text-gray-500 text-right font-bold">{status}</span>
            </div>
          </div>
          <div >
            <span
              className={`inline-flex items-center rounded-md font-bold px-3 py-0.5 ${statusBadge === "in-progress"
                ? "bg-secondary/15 text-secondary"
                : "bg-green-500/50 text-green-500"
                }`}
            >
              {statusBadge === "in-progress" ? "جاري العمل" : statusBadge === "resolved" ? "تم الحل" : "قيد الانتظار"}
            </span>
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
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center shrink-0">
                    <Image src={userAvatar} alt="User" width={40} height={40} className="object-cover scale-150" />
                  </div>
                  <div className="bg-[#4A7396] text-white px-5 py-2 rounded-2xl rounded-tr-md max-w-md">
                    <p className="text-right">{message.text}</p>
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
          <button className="text-black cursor-pointer p-2 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g clipPath="url(#clip0_4418_9143)">
                <path
                  d="M11.97 12V15.5C11.97 17.43 13.54 19 15.47 19C17.4 19 18.97 17.43 18.97 15.5V10C18.97 6.13 15.84 3 11.97 3C8.09997 3 4.96997 6.13 4.96997 10V16C4.96997 19.31 7.65997 22 10.97 22"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_4418_9143">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
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
              className="absolute left-2 top-1/2 -translate-y-1/2  text-primary rotate-y-180 rounded-lg w-8 h-8 flex items-center justify-center"
              onClick={handleSend}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#fff"
              >
                <g clipPath="url(#clip0_4418_8610)">
                  <path
                    d="M16.1401 2.95907L7.11012 5.95907C1.04012 7.98907 1.04012 11.2991 7.11012 13.3191L9.79012 14.2091L10.6801 16.8891C12.7001 22.9591 16.0201 22.9591 18.0401 16.8891L21.0501 7.86907C22.3901 3.81907 20.1901 1.60907 16.1401 2.95907ZM16.4601 8.33907L12.6601 12.1591C12.5101 12.3091 12.3201 12.3791 12.1301 12.3791C11.9401 12.3791 11.7501 12.3091 11.6001 12.1591C11.3101 11.8691 11.3101 11.3891 11.6001 11.0991L15.4001 7.27907C15.6901 6.98907 16.1701 6.98907 16.4601 7.27907C16.7501 7.56907 16.7501 8.04907 16.4601 8.33907Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_4418_8610">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

