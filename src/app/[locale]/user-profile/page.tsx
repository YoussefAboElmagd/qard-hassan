"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function UserProfile() {
  const router = useRouter();
  const locale = useLocale();
  
  useEffect(() => {
    router.push(`/${locale}/user-profile/personal-info`);
  }, [router, locale]);
  
  return null;
}
