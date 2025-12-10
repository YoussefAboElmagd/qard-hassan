'use client'
import React from 'react';
import { RiGraduationCapFill } from 'react-icons/ri';
import RiyalIcon from '@/assets/images/SaudiRiyalSymbol.svg';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';

interface LoanCardProps {
    id: number;
    name: string;
    loan_amount: number;
    loan_reason: string;
    number_of_installments: number;
    submission_date: string;
    start_date: string | null;
    end_date: string | null;
    status: "under_review" | "approved" | "rejected" ;
    buttonText?: string;
    buttonColor?: string;
    buttonHoverColor?: string;
    onButtonClick?: () => void;
}

export default function LoanCard({
    id,
    loan_amount,
    loan_reason,
    number_of_installments,
    submission_date,
    status,
    buttonText,
    buttonColor = status === "under_review" ? "bg-gray-400" : status === "approved" ? "bg-green-700" : "bg-red-700",
    buttonHoverColor = status === "under_review" ? "hover:bg-gray-500" : status === "approved" ? "hover:bg-green-800" : "hover:bg-red-800",
    onButtonClick
}: LoanCardProps) {
    const router = useRouter();
    const t = useTranslations('userProfile.loanCard');
    const locale = useLocale();
    const isRTL = locale === "ar";
    const progressPercentage = status === "under_review" ? 0 : status === "approved" ? 50 : 100;
    
    const getButtonText = () => {
        if (buttonText) return buttonText;
        if (status === "under_review") return t('underReview');
        if (status === "approved") return t('approved');
        return t('rejected');
    };
    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-300 p-6 mx-auto" dir={isRTL ? "rtl" : "ltr"}>
            {/* Top section with icon, title and amount */}
            <div className='flex items-center justify-between border-b border-gray-100 pb-4 mb-4' >
                <div className="flex items-center gap-2">
                    <div className='w-12 h-12 bg-[#F2F2F7] flex justify-center items-center rounded-lg '>
                        { <RiGraduationCapFill className='text-primary text-2xl' />}
                    </div>
                    <div>
                        <h3 className='text-lg font-bold'>{loan_reason}</h3>
                        <p className='text-sm text-gray-500'>{number_of_installments} {t('month')}</p>
                    </div>
                </div>
                <div className=''>
                    <div
                        className="radial-progress bg-transparent text-secondary text-lg font-bold border-gray-100 border-4"
                        style={{ "--value": status === "under_review" ? 0 : status === "approved" ? 50 : 100, "--size": "3rem", "--thickness": "4px" } as React.CSSProperties} aria-valuenow={status === "under_review" ? 0 : status === "approved" ? 50 : 100} role="progressbar">
                        {progressPercentage ? progressPercentage : "0" }%
                    </div>
                </div>
            </div>

            <div className='flex items-center justify-between' >
                <div>
                    <div className='text-gray-500 text-sm flex items-center gap-1'>
                        <span className='text-black text-2xl font-bold'>{loan_amount}</span>
                        <RiyalIcon 
                            className="w-5 h-5 inline-block fill-secondary"
                        />
                    </div>
                    <div className='text-gray-500 text-sm'>{submission_date}</div>
                </div>
                <button 
                    onClick={onButtonClick || (() => router.push(`/${locale}/user-profile/loans/loan-info?loanId=${id}`))} 
                    className={`${buttonColor} text-white px-5 py-2 rounded-xl font-bold ${buttonHoverColor} cursor-pointer transition-colors`}
                >
                    {getButtonText()}
                </button>
            </div>

            {/* Payment button */}

        </div>
    );
}