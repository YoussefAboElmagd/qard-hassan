'use client'
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { HiChevronDown } from 'react-icons/hi';

function FAQAccordion() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const t = useTranslations('faq');
    const locale = useLocale();
    const isRTL = locale === 'ar'; // Adjust based on your RTL locales

    const faqs = [
        {
            question: t('questions.processingTime.question'),
            answer: t('questions.processingTime.answer')
        },
        {
            question: t('questions.signContract.question'),
            answer: t('questions.signContract.answer')
        },
        {
            question: t('questions.otherObligations.question'),
            answer: t('questions.otherObligations.answer')
        }
    ];

    const toggleFAQ = (index: number | null) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="py-16 bg-[#d0d5dd52]" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-primary mb-12">
                    {t('title')}
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border-b-2 border-gray-200 overflow-hidden transition-all duration-300"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-5 flex items-center cursor-pointer transition-colors relative"
                            >
                                <span className={`flex-1 text-gray-800 font-medium text-lg ${
                                    isRTL ? 'text-right' : 'text-left'
                                }`}>
                                    {faq.question}
                                </span>
                                <HiChevronDown
                                    className={`w-6 h-6 text-black transition-transform duration-300 flex-shrink-0 absolute end-0 ${
                                        openIndex === index ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            <div
                                className={`px-6 transition-all duration-300 ${
                                    openIndex === index ? 'py-4 pb-6' : 'max-h-0 overflow-hidden'
                                }`}
                            >
                                <p className={`text-gray-600 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FAQAccordion;