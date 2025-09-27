'use client'
import React from 'react';
import { RiGraduationCapFill } from 'react-icons/ri';
import RiyalIcon from '@/assets/images/SaudiRiyalSymbol.svg';
import { useRouter } from 'next/navigation';

interface LoanCardProps {
    title?: string;
    duration?: string;
    amount?: string;
    date?: string;
    progress?: number;
}

export default function LoanCard({
    title = "قرض للدراسة",
    duration = "12 شهر",
    amount = "10,000",
    date = "May 5, 2026",
    progress = 25
}: LoanCardProps) {
    const router = useRouter();
    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-300 p-6 mx-auto" dir="rtl">
            {/* Top section with icon, title and amount */}
            <div className='flex items-center justify-between border-b border-gray-100 pb-4 mb-4' >
                <div className="flex items-center gap-2">
                    <div className='w-12 h-12 bg-[#F2F2F7] flex justify-center items-center rounded-lg '>
                        <RiGraduationCapFill className='text-primary text-2xl' />
                    </div>
                    <div>
                        <h3 className='text-lg font-bold'>{title}</h3>
                        <p className='text-sm text-gray-500'>{duration}</p>
                    </div>
                </div>
                <div className=''>
                    <div
                        className="radial-progress bg-transparent text-secondary text-lg font-bold border-gray-100 border-4"
                        style={{ "--value": progress, "--size": "3rem", "--thickness": "4px" } as React.CSSProperties} aria-valuenow={progress} role="progressbar">
                        {progress}%
                    </div>
                </div>
            </div>

            <div className='flex items-center justify-between' >
                <div>
                    <div className='text-gray-500 text-sm flex items-center gap-1'>
                        <span className='text-black text-2xl font-bold'>{amount}</span>
                        <RiyalIcon 
                            className="w-5 h-5 inline-block fill-secondary"
                        />
                    </div>
                    <div className='text-gray-500 text-sm'>{date}</div>
                </div>
                <button onClick={() => router.push('/ar/user-profile/loans/loan-info')} className="bg-green-700 text-white px-5 py-2 rounded-xl font-bold hover:bg-green-800 cursor-pointer transition-colors">
                    تسديد
                </button>
            </div>

            {/* Payment button */}

        </div>
    );
}