"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FcBusinessman } from 'react-icons/fc';
import { PiStarFourFill } from 'react-icons/pi';

const TestimonialsCarousel = () => {
    const testimonials = [
        { name: 'فتحي ابراهيم', text: 'لقد اقترضت المال وكانت الخطوات بسيطة و سريعة وبدون فوائد', img: <FcBusinessman className='text-4xl rounded-full' /> },
        { name: 'فتحي ابراهيم', text: 'لقد اقترضت المال وكانت الخطوات بسيطة و سريعة وبدون فوائد', img: <FcBusinessman className='text-4xl rounded-full' /> },
        { name: 'فتحي ابراهيم', text: 'لقد اقترضت المال وكانت الخطوات بسيطة و سريعة وبدون فوائد', img: <FcBusinessman className='text-4xl rounded-full' /> },
        { name: 'فتحي ابراهيم', text: 'لقد اقترضت المال وكانت الخطوات بسيطة و سريعة وبدون فوائد', img: <FcBusinessman className='text-4xl rounded-full' /> },
        { name: 'فتحي ابراهيم', text: 'لقد اقترضت المال وكانت الخطوات بسيطة و سريعة وبدون فوائد', img: <FcBusinessman className='text-4xl rounded-full' /> },

    ];

    return (
        <div className="p-16  mt-10" dir="rtl">
            <div className="text-center mb-12">
                <div className='flex items-center justify-center gap-2 mb-4'>
                    <PiStarFourFill className='text-lg text-primary' />
                    <button className="text-primary text-xl font-bold">شهادات </button>
                </div>
                <h2 className="text-4xl font-bold">
                    ماذا يقول <span className="text-yellow-500">مستخدمنا السعيد</span>
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
                className="p-8 "
            >
                {testimonials.map((item, i) => (
                    <SwiperSlide key={i}>
                        <div className="bg-white rounded-xl p-6 shadow-lg my-10">
                            <p className="text-gray-600 mb-6">{item.text}</p>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
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
};

export default TestimonialsCarousel;