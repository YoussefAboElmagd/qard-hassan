import { Icon } from '@iconify/react';

export default function StrategicGoals() {
    return (
        <section className="py-14 px-10 rounded-2xl shadow-[4px_4px_24px_0_#0000001F]">
            <div className="max-w-7xl mx-auto">
                {/* Title */}
                <h2 className="text-4xl md:text-5xl font-bold text-center text-stroke mb-16 tracking-wide">
                    <span className="text-secondary">الأهداف</span>{' '}
                    <span className="text-primary">الإستراتيجية</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <div className="flex items-start gap-6 text-right">
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
                                <Icon icon="stash:user-group" className="text-primary text-3xl" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl  font-bold text-primary mb-4 text-stroke">
                                التركيز على الفئات الأكثر احتياجاً
                            </h3>
                            <p className="text-gray-600  leading-relaxed">
                                توسيع نطاق المستفيدين من خدمات الإقراض الحسن، مع التركيز على الفئات الأكثر احتياجاً
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-6 text-right">
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
                                <Icon icon="mage:building-b" className="text-primary text-3xl" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl tracking-widest font-bold text-primary mb-4 text-stroke ">
                                قامة شراكات استراتيجية
                            </h3>
                            <p className="text-gray-600  leading-relaxed">
                                قامة شراكات استراتيجية مع الجهات الحكومية والخاصة وغير الربحية لتعظيم الأثر
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-6 text-right">
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
                                <Icon icon="hugeicons:money-safe" className="text-primary text-3xl" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl tracking-widest font-bold text-primary mb-4 text-stroke">
                                تعزيز الاستدامة
                            </h3>
                            <p className="text-gray-600  leading-relaxed">
                                تعزيز الاستدامة المالية للوقف عبر تنمية موارده واستثمارتة بما يضمن استمرار العطاء.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-6 text-right">
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
                                <Icon icon="material-symbols-light:developer-mode-tv-outline-rounded" className="text-primary text-3xl" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl tracking-widest font-bold text-primary mb-4 text-stroke">
                                التطوير
                            </h3>
                            <p className="text-gray-600  leading-relaxed">
                                تطوير البرامج والمبادرات التي تربط بين الإقراض الحسن والتنمية الاقتصادية والاجتماعية.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-6 text-right">
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
                                <Icon icon="carbon:subnet-acl-rules" className="text-primary text-3xl" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl tracking-widest font-bold text-primary mb-4 text-stroke">
                                ترسيخ مبادئ الحوكمة
                            </h3>
                            <p className="text-gray-600  leading-relaxed">
                                ترسيخ مبادئ الحوكمة والشفافية والمساءلة في إدارة الوقف وبرامجه.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-6 text-right">
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
                                <Icon icon="ix:capacity" className="text-primary text-3xl" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl tracking-widest font-bold text-primary mb-4 text-stroke">
                                بناء قدرات المستفيدين
                            </h3>
                            <p className="text-gray-600  leading-relaxed">
                                بناء قدرات المستفيدين عبر التثقيف المالي والدعم غير المالي لتعزيز فرص نجاحهم.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}