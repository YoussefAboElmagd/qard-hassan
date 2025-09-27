"use client";

export default function ContactFrom() {
  return (
      <div className="space-y-4 sm:space-y-5 flex flex-col h-full">
        <div>
          <label className="text-gray-600 font-bold text-sm sm:text-base" htmlFor="name">الإسم</label>
          <input
            id="name"
            type="text"
            placeholder="الإسم"
            className="block border-[1px] border-sidebar-ring w-full py-2 sm:py-3 px-3 mt-1 rounded-md focus:outline-0 focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-colors text-sm sm:text-base"
          />
        </div>
        <div>
          <label className="text-gray-600 font-bold text-sm sm:text-base" htmlFor="email">البريد الإلكتروني</label>
          <input
            type="email"
            id="email"
            placeholder="example@gmail.com"
            className="block border-[1px] border-sidebar-ring w-full py-2 sm:py-3 px-3 mt-1 rounded-md focus:outline-0 focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-colors text-sm sm:text-base"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <label className="text-gray-600 font-bold text-sm sm:text-base" htmlFor="message">الرسالة</label>
          <textarea
            name="message"
            rows={6}
            placeholder="رسالتك"
            className="block border-[1px] border-sidebar-ring w-full py-2 sm:py-3 px-3 mt-1 rounded-md focus:outline-0 focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-colors resize-none text-sm sm:text-base flex-1"
          ></textarea>
        </div>
        <button className="bg-secondary rounded-lg text-white py-2 sm:py-3 cursor-pointer px-5 sm:px-6 font-semibold ms-auto block hover:bg-secondary/90 transition-colors text-sm sm:text-base w-full sm:w-auto mt-auto">
          إرسال 
        </button>
      </div>
  );
}
