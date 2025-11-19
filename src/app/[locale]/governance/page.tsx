import Navbar from "@/components/navbar/navbar";
import background from "@/assets/images/background-arabic.png";
import headerWhiteTop from "@/assets/images/LandingImgs/header-white-top.png";
import Footer from "@/components/Footer/footer";
import Image from "next/image";
import Landing_Hero from "@/components/landingHero/Landing_Hero";
import { FaChevronLeft } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";

const governanceDocuments = [
    { id: 1, title: "اللائحة الأساسية", icon: "📄" },
    { id: 2, title: "محضر اعتماد اللوائح والسياسات", icon: "📄" },
    { id: 3, title: "سياسة قواعد السلوك", icon: "📄" },
    { id: 4, title: "الميثاق الأخلاقي للعاملين", icon: "📄" },
    { id: 5, title: "لائحة أدوار ومسؤوليات مجلس الإدارة تجاه مكافحة غسل الأموال وتمويل الإرهاب", icon: "📄" },
    { id: 6, title: "سياسة إعادة توجيه مبلغ التبرع إلى مشروع آخر", icon: "📄" },
    { id: 7, title: "اختصاصات رئيس المجلس ونائبه واعضاء مجلس الإدارة وآلية اختيارهم", icon: "📄" },
    { id: 8, title: "لائحة الصلاحيات المالية والإدارية لمجلس الإدارة والادارة التنفيذية", icon: "📄" },
    { id: 9, title: "اختصاصات وصلاحيات اللجان الدائمة والمؤقتة", icon: "📄" },
    { id: 10, title: "سياسة تعارض المصالح", icon: "📄" },
    { id: 11, title: "آلية إعادة التبرع للمتبرع", icon: "📄" },
    { id: 12, title: "لائحة تعيين الرئيس التنفيذي", icon: "📄" },
    { id: 13, title: "اختصاصات وصلاحيات الرئيس التنفيذي", icon: "📄" },
    { id: 14, title: "فئات وشروط احكام العضوية في الجمعية العمومية واعتذار العضو او استقالته او وفاته", icon: "📄" },
    { id: 15, title: "لائحة الموارد البشرية وتنظيم العمل", icon: "📄" },
    { id: 16, title: "الميثاق الأخلاقي للمتطوعين", icon: "📄" },
    { id: 17, title: "لائحة إدارة التنظيم والتخصصين", icon: "📄" },
    { id: 18, title: "نظام الرقابة الداخلي", icon: "📄" },
    { id: 19, title: "اللائحة المالية", icon: "📄" },
    { id: 20, title: "لائحة اجراءات التعامل مع المقبوضات", icon: "📄" },
    { id: 21, title: "لائحة وإجراءات متابعة النقد من المتبرع الى المستفيد النهائي", icon: "📄" },
    { id: 22, title: "لائحة اجراءات المشتريات والتعاقدات", icon: "📄" },
    { id: 23, title: "لائحة شراء الأصول", icon: "📄" },
    { id: 24, title: "سياسة جمع الاتبرعات والهبات", icon: "📄" },
    { id: 25, title: "سياسة صرف المساعدات", icon: "📄" },
    { id: 26, title: "سياسة خصوصية البيانات", icon: "📄" },
    { id: 27, title: "سياسة جمع الاتبرعات والهبات", icon: "📄" },
    { id: 28, title: "سياسة تنظيم العلاقة مع المستفيدين", icon: "📄" },
    { id: 29, title: "آلية الثائر عن أستحكام المستفيد", icon: "📄" },
    { id: 30, title: "آلية زيادة التبرع للجعيد", icon: "📄" },
    { id: 31, title: "سياسة التعرف على المواضح والنشاطة", icon: "📄" },
    { id: 32, title: "سياسة تقييم المحاضل الداخلية والخارجية", icon: "📄" },
    { id: 33, title: "سياسة الاستثمار", icon: "📄" },
    { id: 34, title: "سياسة الاختتام بالوثائق والحفظها", icon: "📄" },
    { id: 35, title: "دليل السياسات والإجراءات المالية والمحاسبية", icon: "📄" },
    { id: 36, title: "سياسة الابلاغ عن المخالفات وحماية مقدمي البلاغات", icon: "📄" },
    { id: 37, title: "سياسة للانشاء مغادرات عضل الأموال وجرائم تمويل الإرهاب", icon: "📄" },
    { id: 38, title: "سياسة خدمات الوكالة عن معلومات عضل الأموال وجرائم تمويل الإرهاب", icon: "📄" },
    { id: 39, title: "الخدمات تحت القيام العسير في جعل وحجم شبعة عضل الأموال أو تمويل الإرهاب", icon: "📄" },
    { id: 40, title: "دليل ملفاتات وخدمات محاضة عضل إدارة الأموال ومخاطفة عملقات جرائم تمويل الإرهاب", icon: "📄" },
    { id: 41, title: "آلية التحليق تأثير حاضتة كإنباء السياسات والإجراءات والمواضجما لمكافحة تمويل الإرهاب", icon: "📄" }
];

export default function Page() {
    return (
        <>
            <header className="w-full relative h-auto lg:h-[45vh] pb-10 lg:pb-0 mb-16">
                <div
                    className="absolute inset-0 bg-cover bg-no-repeat bg-[100%_40%]"
                    style={{
                        backgroundImage: `url(${background.src})`
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[rgba(77,128,168,0.8)] to-[rgba(29,78,116,0.8)]" />
                <div className="relative z-10">
                    <Navbar />
                    <div className="flex justify-center items-center mt-5">
                        <Landing_Hero
                            mainText={"الحوكمة"}
                            linkOne={"/"}
                            linkTwo={"/governance"}
                            textOne={"الصفحة الرئسية"}
                            textTwo={"الحوكمة"}
                        />
                    </div>
                    <Image 
            src={headerWhiteTop.src} 
            alt="header-white-top" 
            width={450} 
            height={100} 
            className="absolute top-0 start-0 hidden lg:block w-[35vw] max-w-[400px] h-auto" 
          />
                </div>
            </header>

            <div className="w-[90%] lg:w-[80%] mx-auto py-10 mb-10">
                {/* Header Section */}
                <div className="text-start mb-12">

                    <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-primary">
                        اللوائح و <span className="text-secondary">السياسات</span>
                    </h1>
                </div>

                {/* Documents Grid */}
                <div className="space-y-3">
                    {governanceDocuments.map((document) => (
                        <div
                            key={document.id}
                            className="bg-white border-b border-gray-300 overflow-hidden cursor-pointer group"
                        >
                            <div className="flex items-stretch">
                                <div className="flex-1 flex items-center justify-between px-4 py-3">
                                    {/* Title */}
                                    <div className="flex items-center gap-2">
                                        <FaChevronLeft className="w-4 h-4 text-primary" />
                                        <span className="text-sm lg:text-base font-bold text-black">
                                            {document.title}
                                        </span>
                                    </div>

                                    {/* Action and arrow */}
                                    <div className="flex items-center gap-3 border border-primary rounded-md px-6 py-2 border-r-[15px] border-r-primary">
                                        <div>
                                            <div className="circle rounded-full p-2 border border-primary">
                                                <FaFilePdf className="w-8 h-8 text-primary" />

                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[13px] leading-4 font-semibold text-[#1D4E74]">عرض الملف</div>
                                            <div className="text-xs text-gray-500">pdf - 426 KB</div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer contactUsFooter={false} />
        </>
    );
}