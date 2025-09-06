import { MdLocationSearching } from 'react-icons/md'
import { RiBankLine, RiCustomerService2Line } from 'react-icons/ri'
import BgPattern from '@/assets/images/LandingImgs/Background-pattern.png'
import iphone15 from '@/assets/images/LandingImgs/iphone15.png'
import screenBg from '@/assets/images/LandingImgs/Rectangle37.png'
import googlePlay from '@/assets/images/LandingImgs/googleplay.png'
import appleStore from '@/assets/images/LandingImgs/applestore.png'
import Image from 'next/image'
import React from 'react'

const LoanFundingIntro = () => {
    return (
        <>
            <section className='bg-primary w-full max-w-[90%] md:max-w-[85%] lg:max-w-[80%] mx-auto text-white rounded-xl'>
                <div style={{
                    backgroundImage: `url(${BgPattern.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top',
                    backgroundRepeat: 'no-repeat',
                    height: '100%',
                }} className='relative flex flex-col lg:flex-row items-center justify-between' >
                    <div className='w-full lg:w-[50%] flex flex-col gap-6 md:gap-8 lg:gap-10 p-6 md:p-8 lg:p-10'>
                        <div className='ms-0 sm:ms-6 lg:ms-10'>
                            <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-5'>لنبدأ بتمويل قرضك:</h2>
                            <p className='text-base md:text-lg lg:text-xl max-w-[475px] w-full'>من خلال دمج التقنيات المتقدمة، يعيد التمويل الإسلامي تشكيل المشهد المالي، مما يجعله أكثر سهولة في الاستخدام وتكيفًا مع الاحتياجات الحديثة.</p>
                        </div>
                        <ul className='flex flex-col gap-8'>
                            <li className='flex items-start gap-5'>
                                <div className='bg-white rounded-full flex items-center justify-center w-12 h-12 flex-shrink-0'>
                                    <RiBankLine className='text-2xl text-primary' />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h3 className='text-2xl font-bold'>قم بإنشاء حساب</h3>
                                    <p className=' max-w-[440px] w-full'>أنشئ حسابًا باستخدام عنوان بريدك الإلكتروني أو ملفك الشخصي على وسائل التواصل الاجتماعي. عملية تسجيل سريعة ومباشرة.</p>
                                </div>
                            </li>
                            <li className='flex items-start gap-5'>
                                <div className='bg-white rounded-full flex items-center justify-center w-12 h-12 flex-shrink-0'>
                                    <MdLocationSearching className='text-2xl text-primary' />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h3 className='text-2xl font-bold'>تتبع معاملاتك لحظة بلحظة:</h3>
                                    <p className=' max-w-[440px] w-full'>راقب حالة معاملاتك بتحديثات وإشعارات فورية.</p>
                                </div>
                            </li>
                            <li className='flex items-start gap-5'>
                                <div className='bg-white rounded-full flex items-center justify-center w-12 h-12 flex-shrink-0'>
                                    <RiCustomerService2Line className='text-2xl text-primary' />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h3 className='text-2xl font-bold'>الوصول إلى دعم العملاء على مدار الساعة:</h3>
                                    <p className=' max-w-[440px] w-full'>احصل على المساعدة في أي وقت مع فريق الدعم المتخصص لدينا والمستعد للمساعدة في أي مشاكل أو أسئلة.</p>
                                </div>
                            </li>
                        </ul>
                        <div className='flex gap-4 md:gap-5 py-8 justify-center'>
                            <Image src={googlePlay.src} alt='google-play' width={150} height={50} />
                            <Image src={appleStore.src} alt='apple-store' width={150} height={50} />
                        </div>
                    </div>
                    <div className='w-full lg:w-[50%] relative lg:absolute lg:bottom-0 lg:left-0 mt-16 lg:mt-0 min-h-[260px] sm:min-h-[320px] lg:min-h-0'>
                            <Image src={screenBg.src} alt='screen-frame' width={500} height={400} className='absolute bottom-0 left-[50%] translate-x-[-50%] w-[280px] sm:w-[360px] lg:w-[500px] h-auto' />
                            <Image src={iphone15.src} alt='screen-here' width={450} height={250} className='absolute bottom-0 left-[50%] translate-x-[-50%] w-[240px] sm:w-[300px] lg:w-[450px] h-auto' />
                    </div>
                </div>
            </section>
        </>
    )
}

export default LoanFundingIntro