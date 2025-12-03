"use client"
import { Plus } from "lucide-react";
import { useLocale } from "next-intl";

export default function Card({ num , title, k = false, isLast = false }: { num: string, title: string, k: boolean, isLast: boolean }) {
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <div className={`text-center py-3 px-4 my-2 ${!isLast ? (isRTL ? 'border-e-[1px] border-e-primary' : 'border-s-[1px] border-s-primary') : ''}`}>
      <p className={`flex justify-center items-center text-primary mb-3 font-semibold ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
        <span className="text-5xl">{num}</span>
        {k && <span className="text-4xl mt-[4.9px]">K</span>}
        <span className={`mt-[6.9px] ${isRTL ? 'me-3' : 'ms-3'}`}>
          <Plus size={24} />
        </span>
      </p>
      <p className="text-xs text-gray-600">{title}</p>
    </div>
  );
}
