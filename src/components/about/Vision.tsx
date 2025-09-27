import Image from "next/image";
import tower from "../../assets/images/tower.jpg";

export default function Vision() {
  return (
    <div className=" py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-8 shadow-xl border-[1px] border-secondary">
            <h2 className="text-3xl font-bold text-secondary mb-6 text-right">
              رؤيتنا
            </h2>
            <div className="space-y-4 text-right">
              <p className="text-gray-700 leading-relaxed">
                أن نكون المؤسسة الرائدة في تقديم القروض الحسنة وأن نساهم في تحقيق
                التنمية المستدامة والرفاه الاجتماعي.
              </p>
              <p className="text-gray-700 leading-relaxed">
                بناء مجتمع قوي ومزدهر، يتمتع فيه الجميع بفرص متساوية لتحقيق أحلامهم
                وتطوير حياتهم، من خلال توفير حلول تمويلية إسلامية ميسرة.
              </p>
              <p className="text-gray-700 leading-relaxed">
                أن نحدث فرقًا إيجابيًا في حياة الأفراد والأسر، من خلال توفير قروض
                حسنة تساعدهم على تحقيق أهدافهم وتجاوز التحديات المالية.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-xl border-[1px] border-secondary">
            <h2 className="text-3xl font-bold text-secondary mb-6 text-right">
              رسالتنا
            </h2>
            <div className="space-y-4 text-right">
              <p className="text-gray-700 leading-relaxed">
                توفير قروض حسنة بدون فوائد للأفراد والأسر، لدعمهم في تحقيق أهدافهم
                وتطوير حياتهم، مع الالتزام بأعلى معايير الشفافية والنزاهة.
              </p>
              <p className="text-gray-700 leading-relaxed">
                تمكين المجتمع من خلال توفير حلول تمويلية إسلامية ميسرة، تساهم في
                تحقيق التنمية المستدامة والعدالة الاجتماعية.
              </p>
              <p className="text-gray-700 leading-relaxed">
                نشر ثقافة التمويل الإسلامي وتعزيز الوعي بأهمية القروض الحسنة في
                تحقيق التنمية المجتمعية.
              </p>
            </div>
          </div>

          <div className="relative h-[500px] rounded-xl overflow-hidden shadow-xl border-[1px] border-secondary">
            <Image
              alt="Kingdom Centre Tower"
              fill
              src={tower}
              className="object-cover"
            />
          </div>

          
        
        </div>
      </div>
    </div>
  );
}
