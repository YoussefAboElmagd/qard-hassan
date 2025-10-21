import { Icon } from '@iconify/react';
import Image from 'next/image';
import vision2030 from '@/assets/images/vision2030.png';

export default function Vision2030Slide() {
    return (
        <section className='pt-10  bg-white shadow-[4px_4px_24px_0_#0000001F] mt-18 rounded-2xl'>
            <div className="mx-10 h-[650px] rounded-2xl  relative">
                <Image src={vision2030} alt="vision2030" className='w-full h-full object-contain object-top' />
                {/* Main Content Card */}
                <div className="absolute bottom-8 shadow-[11px_11px_24px_0_#0000001F] start-0 overflow-hidden">
                    <div className="bg-white rounded-e-2xl shadow-2xl p-8 ">
                        <h2 className="text-5xl font-bold mb-6 text-right text-stroke">
                            <span className="text-primary">المساهمة في </span>
                            <span className="text-secondary">تحقيق رؤية المملكة</span>
                        </h2>
                        <p className="text-gray-600 text-lg mb-8 text-right leading-relaxed">
                            يسهم وقف الصدقة الجارية للقراض الحسن في دعم مستهدفات رؤية المملكة 2030  <br />من خلال:
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-4">
                                <div className='bg-primary/10 rounded-full p-1 w-6 h-6 flex items-center justify-center'>
                                    <Icon icon="material-symbols:check" className="text-primary text-xl flex-shrink-0" />
                                </div>
                                <p className="text-gray-700 text-lg text-right leading-relaxed">
                                    تمكين الأفراد والأسر مالياً بما يحقق الاكتفاء الذاتي ويحد من الحاجة إلى الدعم التقليدي.
                                </p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className='bg-primary/10 rounded-full p-1 w-6 h-6 flex items-center justify-center'>
                                    <Icon icon="material-symbols:check" className="text-primary text-xl flex-shrink-0" />
                                </div>
                                <p className="text-gray-700 text-lg text-right leading-relaxed">
                                    دعم الاقتصاد الوطني عبر تمويل المشروعات المتناهية الصغر بروح من العدالة والإحسان.
                                </p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className='bg-primary/10 rounded-full p-1 w-6 h-6 flex items-center justify-center'>
                                    <Icon icon="material-symbols:check" className="text-primary text-xl flex-shrink-0" />
                                </div>
                                <p className="text-gray-700 text-lg text-right leading-relaxed">
                                    المساهمة في استدامة القطاع غير الربحي من خلال نموذج وقفي مبتكر بدعم التنمية الشاملة.
                                </p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className='bg-primary/10 rounded-full p-1 w-6 h-6 flex items-center justify-center'>
                                    <Icon icon="material-symbols:check" className="text-primary text-xl flex-shrink-0" />
                                </div>
                                <p className="text-gray-700 text-lg text-right leading-relaxed">
                                    المواءمة مع برامج التحول الوطني الرامية إلى تحسين جودة الحياة وتوسيع دائرة الفرص لجميع
                                </p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className='bg-primary/10 rounded-full p-1 w-6 h-6 flex items-center justify-center'>
                                    <Icon icon="material-symbols:check" className="text-primary text-xl flex-shrink-0" />
                                </div>
                                <p className="text-gray-700 text-lg text-right leading-relaxed">
                                    المواءمة مع برامج التحول الوطني الرامية إلى تحسين جودة الحياة وتوسيع دائرة الفرص لجميع
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}