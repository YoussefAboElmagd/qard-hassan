"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FcBusinessman } from 'react-icons/fc';
import { PiStarFourFill } from 'react-icons/pi';
import { useTranslations, useLocale } from 'next-intl';

function TestimonialsCarousel() {
    const t = useTranslations('testimonials');
    const locale = useLocale();
    const isRTL = locale === 'ar';

    const testimonials = [
        { name: t('testimonial1.name'), text: t('testimonial1.text'), img: <FcBusinessman className='text-4xl rounded-full' /> },
        { name: t('testimonial2.name'), text: t('testimonial2.text'), img: <FcBusinessman className='text-4xl rounded-full' /> },
        { name: t('testimonial3.name'), text: t('testimonial3.text'), img: <FcBusinessman className='text-4xl rounded-full' /> },
        { name: t('testimonial4.name'), text: t('testimonial4.text'), img: <FcBusinessman className='text-4xl rounded-full' /> },
        { name: t('testimonial5.name'), text: t('testimonial5.text'), img: <FcBusinessman className='text-4xl rounded-full' /> },
    ];

    return (
        <div className="p-16 mt-10">
            <div className="text-center mb-12">
                <div className={`flex items-center justify-center gap-2 mb-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <PiStarFourFill className='text-lg text-primary' />
                    <button className="text-primary text-xl font-bold">{t('sectionLabel')}</button>
                </div>
                <h2 className="text-4xl font-bold text-primary">
                    {t('title')} <span className="text-secondary">{t('titleHighlight')}</span>
                </h2>
            </div>

            <Swiper
                modules={[Pagination]}
                spaceBetween={20}
                slidesPerView={3}
                pagination={{ clickable: true }}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                }}
                className="p-8"
                dir={isRTL ? 'rtl' : 'ltr'}
            >
                {testimonials.map((item, i) => (
                    <SwiperSlide key={i}>
                        <div className="bg-white rounded-xl p-6 shadow-lg my-10  flex flex-col h-full ">
                            <p className="text-gray-600 mb-6 flex-grow">{item.text}</p>
                            <div className={`flex justify-between items-center ${isRTL ? 'flex-row' : 'flex-row-reverse'}`}>
                                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row' : 'flex-row-reverse'}`}>
                                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">{item.img}</div>
                                    <span className="font-semibold">{item.name}</span>
                                </div>
                                <div className="text-yellow-400">★★★★★</div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default TestimonialsCarousel;
