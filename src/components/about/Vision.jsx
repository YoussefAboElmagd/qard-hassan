import Image from "next/image";
import tower from "../../assets/images/tower.jpg";
export default function Vision() {
  return (
    <div className="grid md:grid-cols-3 ms:grid-cols-2 grid-cols-1 max-w-6xl   mb-10  mx-auto ">
      <div className="px-5 py-3 w-full sm:w-4/5 sm:ms-auto   border-[1px] border-chart-4 rounded-xl me-3 shadow-xl mb-3 sm:mb-0">
        <h5 className="text-chart-4 text-2xl font-semibold mb-4">رؤيتنا:</h5>
        <p className="text-muted-foreground">
          "أن نكون المؤسسة الرائدة في تقديم القروض الحسنة وأن نساهم في تحقيق
          التنمية المستدامة والرفاه الاجتماعي." "بناء مجتمع قوي ومزدهر، يتمتع
          فيه الجميع بفرص متساوية لتحقيق أحلامهم وتطوير حياتهم، من خلال توفير
          حلول تمويلية إسلامية ميسرة." "أن نحدث فرقًا إيجابيًا في حياة الأفراد
          والأسر، من خلال توفير قروض حسنة تساعدهم على تحقيق أهدافهم وتجاوز
          التحديات المالية."
        </p>
      </div>
      <div className="px-5 py-3 w-full sm:w-4/5 sm:ms-auto   border-[1px] border-chart-4 rounded-xl me-3 shadow-xl mb-3 sm:mb-0">
        <h5 className="text-primary text-2xl font-semibold mb-4">رسالتنا:</h5>
        <p className="text-muted-foreground">
          "توفير قروض حسنة بدون فوائد للأفراد والأسر، لدعمهم في تحقيق أهدافهم
          وتطوير حياتهم، مع الالتزام بأعلى معايير الشفافية والنزاهة." "تمكين
          المجتمع من خلال توفير حلول تمويلية إسلامية ميسرة، تساهم في تحقيق
          التنمية المستدامة والعدالة الاجتماعية." "نشر ثقافة التمويل الإسلامي
          وتعزيز الوعي بأهمية القروض الحسنة في تحقيق التنمية المجتمعية."
        </p>
      </div>
      <div className="relative h-[400px] px-5 py-3 w-full sm:w-4/5 sm:ms-auto   rounded-xl shadow-xl mb-3 sm:mb-0">
        <Image
          alt="header-white-top"
          fill
          src={tower}
          className="object-cover rounded-xl"
        />
      </div>
    </div>
  );
}
