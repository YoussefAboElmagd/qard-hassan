"use client"
import Image from "next/image";
import calcu from "../../assets/images/calcu.jpg";
import house from "../../assets/images/house.png";

export default function Feature() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-28">
      {/* Images Container */}
      <div className="w-full max-w-[539px] mx-auto lg:mx-0 relative order-1 lg:order-0">
        {/* House Image */}
        <div className="w-full h-[280px] sm:h-[350px] lg:h-[439px] relative ">
          <Image
            src={house}
            alt="house"
            fill
            className="object-cover rounded-lg lg:rounded-none"
          />
        </div>

        {/* Calculator Image - Overlaid */}
        <div className="absolute top-40 right-5 lg:top-[50%] lg:-right-[15%] lg:translate-x-0 w-[180px] h-[220px] sm:w-[220px] sm:h-[260px] lg:w-[253px] lg:h-[304px] border-[6px] sm:border-8 lg:border-[10px] border-white rounded-xl shadow-2xl overflow-hidden">
          <Image
            src={calcu}
            alt="calc"
            fill
            className="object-cover object-right-bottom"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 text-center lg:text-right space-y-4 lg:space-y-5  order-0 lg:order-1">
        <p className="text-secondary text-base sm:text-lg">تعزيز الوضوح المالي</p>

        <h4 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary font-bold">
          نافذة امل نحو <span className="text-secondary">مستقبل افضل</span>
        </h4>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed">
          &quot;في قرض حسن، نؤمن بأن لكل شخص الحق في فرصة لتحقيق أحلامه وتطوير حياته.
          انطلاقًا من هذا الإيمان، تأسس مشروعنا لتقديم قروض حسنة بدون فوائد،
          تماشيًا مع مبادئ الشريعة الإسلامية السمحة، ودعمًا لمجتمعنا نحو مستقبل
          مزدهر.&quot;
        </p>
      </div>
    </div>
  );
}