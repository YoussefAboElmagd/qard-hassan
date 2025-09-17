import Image from "next/image";
import calcu from "../../assets/images/calcu.jpg";
import house from "../../assets/images/house.png";
export default function Feature() {
  return (
    <div className=" flex  max-w-5xl mx-auto  gap-x-10">
      <div className=" ">
        <div className="relative w-[539px] h-[439px]">
          <Image src={house} alt="house" fill className="" />
        </div>
        <div
          className="relative w-[253px] h-[304px]  border-[10px] rounded-xl border-white shadow-2xl"
          style={{
            top: "-226px",
            left: "83px",
          }}
        >
          <Image
            src={calcu}
            alt="calc"
            fill
            className="object-unset rounded-sm "
          />
        </div>
      </div>
      <div className="w-1/2 leading-relaxed tracking-wides">
        <p className="text-chart-4 mb-3">تعزيز الوضوح المالي</p>
        <h4 className="text-3xl  text-chart-3 font-semibold py-5 px-1">
          نافذة امل نحو <span className="text-chart-4">مستقبل افضل</span>
        </h4>
        <p className="py-5 px-1 text-muted-foreground">
          "في قرض حسن، نؤمن بأن لكل شخص الحق في فرصة لتحقيق أحلامه وتطوير حياته.
          انطلاقًا من هذا الإيمان، تأسس مشروعنا لتقديم قروض حسنة بدون فوائد،
          تماشيًا مع مبادئ الشريعة الإسلامية السمحة، ودعمًا لمجتمعنا نحو مستقبل
          مزدهر."
        </p>
      </div>
    </div>
  );
}
