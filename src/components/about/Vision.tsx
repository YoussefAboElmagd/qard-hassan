"use client"
import Image from "next/image";
import tower from "../../assets/images/tower.jpg";
import { useTranslations, useLocale } from "next-intl";

export default function Vision() {
  const t = useTranslations('aboutUs');
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <div className=" py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {isRTL ? (
            <>
              <div className="relative h-[500px] rounded-xl overflow-hidden shadow-xl border-[1px] border-secondary">
                <Image
                  alt="Kingdom Centre Tower"
                  fill
                  src={tower}
                  className="object-cover"
                />
              </div>
              <div className="bg-white rounded-xl p-8 shadow-xl border-[1px] border-secondary">
                <h2 className="text-3xl font-bold text-secondary mb-6 text-right">
                  {t('vision.title')}
                </h2>
                <div className="space-y-4 text-right">
                  {t.raw('vision.content').map((content: string, index: number) => (
                    <p key={index} className="text-gray-700 leading-relaxed">
                      {content}
                    </p>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-xl border-[1px] border-secondary">
                <h2 className="text-3xl font-bold text-secondary mb-6 text-right">
                  {t('mission.title')}
                </h2>
                <div className="space-y-4 text-right">
                  {t.raw('mission.content').map((content: string, index: number) => (
                    <p key={index} className="text-gray-700 leading-relaxed">
                      {content}
                    </p>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white rounded-xl p-8 shadow-xl border-[1px] border-secondary">
                <h2 className="text-3xl font-bold text-secondary mb-6 text-left">
                  {t('vision.title')}
                </h2>
                <div className="space-y-4 text-left">
                  {t.raw('vision.content').map((content: string, index: number) => (
                    <p key={index} className="text-gray-700 leading-relaxed">
                      {content}
                    </p>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-xl border-[1px] border-secondary">
                <h2 className="text-3xl font-bold text-secondary mb-6 text-left">
                  {t('mission.title')}
                </h2>
                <div className="space-y-4 text-left">
                  {t.raw('mission.content').map((content: string, index: number) => (
                    <p key={index} className="text-gray-700 leading-relaxed">
                      {content}
                    </p>
                  ))}
                </div>
              </div>
              <div className="relative h-[500px] rounded-xl overflow-hidden shadow-xl border-[1px] border-secondary">
                <Image
                  alt="Kingdom Centre Tower"
                  fill
                  src={tower}
                  className="object-cover"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
