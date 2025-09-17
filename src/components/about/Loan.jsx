import icon1 from "../../assets/images/icons.png";
import icon2 from "../../assets/images/icons (1).png";
import icon3 from "../../assets/images/icons (2).png";
import icon4 from "../../assets/images/icons (3).png";
import LoanCard from "./LoanCard";

const cards = [
  {
    title: "شروط ميسرة",
    text: "غالبًا ما تكون إجراءات الحصول على القرض الحسن أسهل وأسرع من القروض التقليدية، مما يجعله خيارًا جذابًا للكثيرين.",
    ref: icon1,
  },
  {
    title: "بدون فوائد",
    text: "هذه هي الميزة الأساسية والأهم في القرض الحسن، حيث لا يتم احتساب أي فوائد أو رسوم ربوية على المبلغ المقترض، مما يجعله متوافقًا مع الشريعة الإسلامية.",
    ref: icon2,
  },
  {
    title: "دعم فني 24/7",
    text: "فريقنا جاهز لمساعدتك في أي وقت. إذا كانت لديك أي أسئلة أو مشاكل، فلا تتردد في التواصل معنا.",
    ref: icon3,
  },
  {
    title: "حل للمشاكل الطارئة",
    text: " يوفر القرض الحسن حلاً سريعًا للمشاكل الطارئة التي قد تواجه الأفراد والأسر، مثل العلاج أو الإصلاحات المنزلية الضرورية.",
    ref: icon4,
  },
];

export default function Loan() {
  return (
    <div className="mx-auto px-10 mt-20 max-w-7xl">
      <h5 className="text-center text-4xl font-bold text-chart-3 mb-5">
        لماذا تبدأ بتمويل قرضك في<span className="text-chart-4"> قرض حسن</span>
      </h5>
      <p className="text-center mb-15 w-2/5 text-md text-muted-foreground mx-auto">
        من خلال دمج التقنيات المتقدمة، يعيد التمويل الإسلامي تشكيل المشهد
        المالي، مما يجعله أكثر سهولة في الاستخدام وتكيفًا مع الاحتياجات الحديثة.
      </p>

      <div className="grid md:grid-cols-4 grid-cols-2 mb-10  mx-auto">
        {cards.map((ele, index) => (
          <LoanCard
            title={ele.title}
            text={ele.text}
            refe={ele.ref}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
