"use client"
import Image from "next/image";
import calcu from "../../assets/images/calcu.jpg";
import house from "../../assets/images/house.png";
import { useTranslations, useLocale } from "next-intl";

export default function Feature() {
  const t = useTranslations('aboutUs.feature');
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <div className={`flex flex-col lg:flex-row gap-6 lg:gap-8 mb-28 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
      {/* Images Container */}
      <div className={`w-full max-w-[539px] mx-auto lg:mx-0 relative ${isRTL ? 'order-1 lg:order-1' : 'order-1 lg:order-0'}`}>
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
        <div className={`absolute top-40 lg:top-[50%] lg:translate-x-0 w-[180px] h-[220px] sm:w-[220px] sm:h-[260px] lg:w-[253px] lg:h-[304px] border-[6px] sm:border-8 lg:border-[10px] border-white rounded-xl shadow-2xl overflow-hidden ${isRTL ? 'right-5 lg:-right-[15%]' : 'left-5 lg:-left-[15%]'}`}>
          <Image
            src={calcu}
            alt="calc"
            fill
            className="object-cover object-right-bottom"
          />
        </div>
      </div>

      {/* Content */}
      <div className={`flex-1 text-center space-y-4 lg:space-y-5 ${isRTL ? 'lg:text-right order-0 lg:order-0' : 'lg:text-left order-0 lg:order-1'}`}>
        <p className="text-secondary text-base sm:text-lg">{t('subtitle')}</p>

        <h4 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary font-bold">
          {t('title')} <span className="text-secondary">{t('titleHighlight')}</span>
        </h4>

        <div className="space-y-4 md:space-y-5">
          <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
            {t('description')}
          </p>

          <ul className={`grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 ${isRTL ? 'text-right' : 'text-left'}`}>
            <li className={`flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 ${isRTL ? 'justify-start' : 'justify-start'}`}>
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-secondary/10 text-secondary text-xs">✓</span>
              <span className="text-sm sm:text-base text-gray-700">{t('benefits.emergencySolutions')}</span>
            </li>
            <li className={`flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 ${isRTL ? 'justify-start' : 'justify-start'}`}>
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-secondary/10 text-secondary text-xs">✓</span>
              <span className="text-sm sm:text-base text-gray-700">{t('benefits.technicalSupport')}</span>
            </li>
            <li className={`flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 ${isRTL ? 'justify-start' : 'justify-start'}`}>
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-secondary/10 text-secondary text-xs">✓</span>
              <span className="text-sm sm:text-base text-gray-700">{t('benefits.noInterest')}</span>
            </li>
            <li className={`flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 ${isRTL ? 'justify-start' : 'justify-start'}`}>
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-secondary/10 text-secondary text-xs">✓</span>
              <span className="text-sm sm:text-base text-gray-700">{t('benefits.easyTerms')}</span>
            </li>
          </ul>

          <div className={`space-y-2 text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
            {t.raw('additionalInfo').map((info: string, index: number) => (
              <p key={index}>{info}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}