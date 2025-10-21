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
              أن نكون الوقف الرائد و المرجع للنظراء في المملكة العربية السعودية في مجال الإقراض الحسن و نكون نموذجًا يحتذى به في التمكين المالي المسؤول، بما يحقق التنمية المستدامة ويعزز الأثر الاجتماعي والاقتصادي.
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
              تقديم خدمات الإقراض الحسن وفق أعلى معايير الكفاءة والشفافية، بآليات وقف مستدامة، وشراكات استراتيجية مع القطاعين العام والخاص والقطاع غير الربحي، بما يسهم في تحسين جودة الحياة.
              </p>
              <p className="text-gray-700 leading-relaxed">
              تمكين المستفيدين من الاعتماد على أنفسهم، ودعم الابتكار المجتمعي والاقتصادي.
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
