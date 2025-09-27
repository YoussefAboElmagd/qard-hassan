import React from 'react'
import Image from 'next/image'
import logo from '@/assets/images/logo.png'

export default function LoadingScreen() {
    return (
        <div className='fixed inset-0 z-50 grid place-items-center bg-primary/70'>
            <div className='flex flex-col items-center gap-6 rounded-2xl bg-white/95 p-8 shadow-2xl backdrop-blur-md dark:bg-gray-900/95 border border-gray-200/50 dark:border-gray-700/50' role='status' aria-live='polite'>
                <div className='relative h-16 w-16'>
                    <span className='absolute inset-0 rounded-full border-4 border-gray-200 border-t-primary animate-spin [animation-duration:1.2s] dark:border-gray-700 dark:border-t-primary'></span>
                    <div className='absolute inset-2 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center'>
                        <Image src={logo} alt='شعار وقف للإقراض الحسن' width={45} height={45} priority className='object-contain' />
                    </div>
                </div>
                <div className='text-center'>
                    <p className='text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1'>جاري التحميل...</p>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>يرجى الانتظار</p>
                </div>
            </div>
        </div>
    )
}
