import { Icon } from '@iconify/react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import vision2030 from '@/assets/images/vision2030.png';

export default function Vision2030Slide() {
    const t = useTranslations('vision2030');
    const locale = useLocale();
    const isRTL = locale === "ar";
    
    return (
        <section className='pt-10 bg-white shadow-[4px_4px_24px_0_#0000001F] mt-18 rounded-2xl'>
            <div className="mx-10 h-[650px] rounded-2xl relative">
                <Image src={vision2030} alt="vision2030" className='w-full h-full object-contain object-top' />
                {/* Main Content Card */}
                <div className={`absolute bottom-0 overflow-hidden max-w-[90%] ${isRTL ? 'right-0' : 'left-0'}`}>
                    <div className={`bg-white shadow-[11px_11px_24px_0_#0000001F] p-8 w-fit ${isRTL ? 'rounded-l-2xl' : 'rounded-r-2xl'}`}>
                        <h2 className={`text-5xl font-bold mb-6 text-stroke ${isRTL ? 'text-right' : 'text-left'}`}>
                            <span className="text-primary">{t('title.part1')} </span>
                            <span className="text-secondary">{t('title.part2')}</span>
                        </h2>
                        <p className={`text-gray-600 mb-8 leading-relaxed ${isRTL ? 'text-lg text-right' : 'text-sm text-left'}`}>
                            {t('description')} <br />{t('through')}
                        </p>
                        <div className="space-y-3">
                            {['financial', 'economy', 'sustainability', 'transformation', 'opportunities'].map((benefit) => (
                                <div key={benefit} className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className='bg-primary/10 rounded-full p-1 w-6 h-6 flex items-center justify-center flex-shrink-0'>
                                        <Icon icon="material-symbols:check" className="text-primary text-xl" />
                                    </div>
                                    <p className={`text-gray-700 leading-relaxed ${isRTL ? 'text-lg text-right' : 'text-sm text-left'}`}>
                                        {t(`benefits.${benefit}`)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}