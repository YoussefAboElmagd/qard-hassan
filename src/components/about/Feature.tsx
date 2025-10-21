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

        <div className="space-y-4 md:space-y-5">
          <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
            وقف الصدقة الجارية يعيد تشكيل مشهد الإقراض الحسن، مما يجعله خيارًا جاذبًا للكثيرين.
            من خلال دمج التقنيات المتقدمة، يعيد التمويل الإسلامي تشكيل المشهد المالي ليصبح أكثر سهولة وتكيفًا مع الاحتياجات الحديثة.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-right">
            <li className="flex items-center justify-start gap-2 bg-gray-50 rounded-lg px-3 py-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-secondary/10 text-secondary text-xs">✓</span>
              <span className="text-sm sm:text-base text-gray-700">حل للمشاكل الطارئة</span>
            </li>
            <li className="flex items-center justify-start gap-2 bg-gray-50 rounded-lg px-3 py-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-secondary/10 text-secondary text-xs">✓</span>
              <span className="text-sm sm:text-base text-gray-700">دعم فني 24/7</span>
            </li>
            <li className="flex items-center justify-start gap-2 bg-gray-50 rounded-lg px-3 py-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-secondary/10 text-secondary text-xs">✓</span>
              <span className="text-sm sm:text-base text-gray-700">بدون فوائد</span>
            </li>
            <li className="flex items-center justify-start gap-2 bg-gray-50 rounded-lg px-3 py-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-secondary/10 text-secondary text-xs">✓</span>
              <span className="text-sm sm:text-base text-gray-700">شروط ميسرة</span>
            </li>
          </ul>

          <div className="space-y-2 text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
<p>يُقدّم وقف الصدقة الجارية للإقراض الحسن حلًّا سريعًا ومشروعًا للمشكلات المالية مثل العلاج أو الإصلاحات المنزلية، مع فريقٍ جاهزٍ دائمًا لتقديم المساعدة والإجابة عن أي استفسار أو مشكلة.</p>
<p>يُمنح القرض دون أي فوائد أو رسوم، بما يضمن التوافق مع أحكام الشريعة الإسلامية، وتتميّز إجراءاته بالسهولة والسرعة مقارنةً بالقروض التقليدية، مما يجعله خيارًا مثاليًا للكثيرين.</p>
          </div>
        </div>
      </div>
    </div>
  );
}