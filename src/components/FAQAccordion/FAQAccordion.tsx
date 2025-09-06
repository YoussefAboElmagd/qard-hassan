'use client'
import React, { useState } from 'react';

const FAQAccordion = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: 'ماهي المدة اللازمة لمعالجة طلب التمويل ؟',
            answer: 'يتم معالجة طلب التمويل خلال 24-48 ساعة من تقديم جميع المستندات المطلوبة.'
        },
        {
            question: 'كيف يمكنني توقيع عقد التمويل و سندات الأمر؟',
            answer: 'يمكنك توقيع العقد إلكترونياً من خلال المنصة باستخدام التوقيع الرقمي المعتمد.'
        },
        {
            question: 'هل يمكن الحصول على تمويل نقدي في حال وجود التزامات أخرى',
            answer: 'نعم، يمكن الحصول على تمويل بشرط ألا تتجاوز نسبة الالتزامات الشهرية 50% من الدخل الشهري.'
        }
    ];

    const toggleFAQ = (index: number | null) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="py-16 bg-[#d0d5dd52]" dir="rtl">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-primary mb-12">
                    أسئلة مكررة
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border-b-2  border-gray-200 overflow-hidden transition-all duration-300"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-5 flex justify-between items-center cursor-pointer text-right transition-colors"
                            >
                                <span className="text-gray-800 font-medium text-lg">
                                    {faq.question}
                                </span>
                                <svg
                                    className={`w-6 h-6 text-black transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            <div
                                className={`px-6 transition-all duration-300 ${openIndex === index ? 'py-4 pb-6' : 'max-h-0 overflow-hidden'
                                    }`}
                            >
                                <p className="text-gray-600 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQAccordion;