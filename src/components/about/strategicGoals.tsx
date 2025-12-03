"use client"
import { Icon } from '@iconify/react';
import { useTranslations, useLocale } from 'next-intl';

export default function StrategicGoals() {
    const t = useTranslations('aboutUs.strategicGoals');
    const locale = useLocale();
    const isRTL = locale === 'ar';

    const goals = [
        { key: 'focusOnNeedy', icon: 'stash:user-group' },
        { key: 'strategicPartnerships', icon: 'mage:building-b' },
        { key: 'enhanceSustainability', icon: 'hugeicons:money-safe' },
        { key: 'development', icon: 'material-symbols-light:developer-mode-tv-outline-rounded' },
        { key: 'governancePrinciples', icon: 'carbon:subnet-acl-rules' },
        { key: 'capacityBuilding', icon: 'ix:capacity' },
    ];

    return (
        <section className="py-14 px-10 rounded-2xl shadow-[4px_4px_24px_0_#0000001F]">
            <div className="max-w-7xl mx-auto">
                {/* Title */}
                <h2 className="text-4xl md:text-5xl font-bold text-center text-stroke mb-16 tracking-wide">
                    <span className="text-secondary">{t('title')}</span>{' '}
                    <span className="text-primary">{t('titleHighlight')}</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {goals.map((goal) => (
                        <div key={goal.key} className={`flex items-start gap-6 ${isRTL ? 'text-right flex-row' : 'text-left flex-row-reverse'}`}>
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
                                    <Icon icon={goal.icon} className="text-primary text-3xl" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className={`text-xl font-bold text-primary mb-4 text-stroke ${isRTL ? '' : 'tracking-widest'}`}>
                                    {t(`goals.${goal.key}.title`)}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {t(`goals.${goal.key}.description`)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}