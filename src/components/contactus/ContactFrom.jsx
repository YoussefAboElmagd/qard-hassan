"use client";

export default function ContactFrom() {
  return (
    <div className="w-2/3  ">
      <div className="w-4/5">
        <div>
          <label htmlFor="name">الاسم</label>
          <input
            id="name"
            type="text"
            placeholder="الاسم"
            className="block border-[1px] border-sidebar-ring w-full py-2 px-3 mx-1 mt-1 rounded-md focus:outline-0"
          />
        </div>
        <div className="my-5">
          <label htmlFor="email">البريد الالكتروني</label>
          <input
            type="text"
            id="email"
            placeholder="example@gmail.com"
            className="block border-[1px] border-sidebar-ring w-full py-2 px-3 mx-1 mt-1 rounded-md focus:outline-0"
          />
        </div>
        <div className="my-5">
          <label htmlFor="messgae">الرساله</label>
          <textarea
            name="message"
            rows="10"
            placeholder="رسالتك"
            className="block border-[1px] border-sidebar-ring w-full py-2 px-3 mx-1 mt-1 rounded-md focus:outline-0"
          ></textarea>
        </div>
        <button className="bg-chart-4 rounded-lg text-white py-2 cursor-pointer px-5 font-semibold ms-auto block">
          ارسال
        </button>
      </div>
    </div>
  );
}
