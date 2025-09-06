import React from 'react';
import { BsPieChartFill } from "react-icons/bs";
import { IoShieldCheckmarkSharp } from 'react-icons/io5';
import { PiSealPercentFill } from "react-icons/pi";
import { RiCustomerService2Line } from 'react-icons/ri';
interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureProps) {
  return (
    <div className="text-center">
      {/* Icon with circular background */}
      <div className="flex justify-center mb-4 md:mb-6">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-100 rounded-full flex items-center justify-center">
          {icon}
        </div>
      </div>
      
      {/* Title */}
      <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-black mb-3 md:mb-4">{title}</h3>
      
      {/* Description */}
      <p className="text-gray-600 leading-relaxed text-sm md:text-base px-2 md:px-0">{description}</p>
    </div>
  );
}

export default function WhyChooseUs() {
  const features = [
    {
        icon: (
            <BsPieChartFill className='w-10 h-10 text-primary' />

        ),
        title: "شروط ميسرة",
        description: "غالباً ما تكون إجراءات الحصول على القرض الحسن أسهل وأسرع من القروض التقليدية، مما يجعله خياراً جذاباً للكثيرين"
      },
      {
        icon: (
                <PiSealPercentFill className='w-10 h-10 text-primary' />

        ),
        title: "بدون فوائد",
        description: "هذه هي الميزة الأساسية والأهم في القرض الحسن، حيث لا يتم احتساب أي فوائد أو رسوم ربوية على المبلغ المقترض، مما يجعله متوافقاً مع الشريعة الإسلامية"
      },
      {
        icon: (
            <RiCustomerService2Line className='w-10 h-10 text-primary' />

        ),
        title: "دعم فني 24/7",
        description: "فريقنا جاهز لمساعدتك في أي وقت. إذا كانت لديك أي أسئلة أو مشاكل، فلا تتردد في التواصل معنا"
      },
    {
      icon: (
        <IoShieldCheckmarkSharp className='w-10 h-10 text-primary' />

      ),
      title: "حل للمشاكل الطارئة",
      description: "يوفر القرض الحسن حلاً سريعاً للمشاكل المالية التي قد تواجه الأفراد والأسر، مثل العلاج أو الإصلاحات المنزلية الضرورية"
    },



  ];

  return (
    <div className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 md:mb-6 leading-tight px-4">
            لماذا تبدأ بتمويل قرضك في{' '}
            <span className="text-secondary">قرض حسن</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
            من خلال دمج التقنيات المتقدمة، يعيد التمويل الإسلامي تشكيل المشهد المالي،
            <br className="hidden sm:block" />
            مما يجعله أكثر سهولة في الاستخدام وتكيفاً مع الاحتياجات الحديثة.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}