import React from 'react';
import { BsPieChartFill } from "react-icons/bs";
import { IoShieldCheckmarkSharp } from 'react-icons/io5';
import { PiSealPercentFill } from "react-icons/pi";
import { RiCustomerService2Line } from 'react-icons/ri';
import { useTranslations } from 'next-intl';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureProps) {
  return (
    <div className="text-center">
      {/* Icon with circular background */}
      <div className="flex justify-start mb-4 md:mb-6">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-100 rounded-full flex items-center justify-center">
          {icon}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-black mb-3 md:mb-4 text-start">{title}</h3>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed text-sm md:text-base px-2 md:px-0 text-start">{description}</p>
    </div>
  );
}

export default function WhyChooseUs() {
  const t = useTranslations('whyChooseUs');

  const features = [
    {
      icon: (
        <BsPieChartFill className='w-10 h-10 text-primary' />
      ),
      title: t('features.easyTerms.title'),
      description: t('features.easyTerms.description')
    },
    {
      icon: (
        <PiSealPercentFill className='w-10 h-10 text-primary' />
      ),
      title: t('features.noInterest.title'),
      description: t('features.noInterest.description')
    },
    {
      icon: (
        <RiCustomerService2Line className='w-10 h-10 text-primary' />
      ),
      title: t('features.support247.title'),
      description: t('features.support247.description')
    },
    {
      icon: (
        <IoShieldCheckmarkSharp className='w-10 h-10 text-primary' />
      ),
      title: t('features.emergencySolution.title'),
      description: t('features.emergencySolution.description')
    },
  ];

  return (
    <div className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 md:mb-6 leading-tight px-4 ">
            <span className='text-secondary'>{t('mainTitleHighlight')}</span> {t('mainTitle')}<br /> {t('mainTitleEnd')}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
            {t('subtitle')}
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
