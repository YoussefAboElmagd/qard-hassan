import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RiGraduationCapFill } from 'react-icons/ri'
import SaudiRiyalIcon from '@/assets/images/SaudiRiyalSymbol.svg'
import { useTranslations } from 'next-intl'

export default function LoanInfo() {
    const t = useTranslations('userProfile.loanInfo');
    // Sample data - in real app this would come from props or API
    const loanData = {
        loanAmount: 10000,
        remainingAmount: 7500,
        installmentAmount: 833,
        installmentCount: 12,
        applicationDate: 'May 5, 2025',
        startDate: 'May 5, 2025',
        progressPercentage: 25
    }

    const paymentSchedule = [
        { date: 'May 5, 2026', amount: 833, status: t('unpaid'), statusColor: 'bg-primary', statusTextColor: 'text-white' },
        { date: 'May 5, 2026', amount: 833, status: t('paid'), statusColor: 'bg-green-100', statusTextColor: 'text-green-700' },
        { date: 'May 5, 2026', amount: 833, status: t('paid'), statusColor: 'bg-green-100', statusTextColor: 'text-green-700' },
        { date: 'May 5, 2026', amount: 833, status: t('paid'), statusColor: 'bg-green-100', statusTextColor: 'text-green-700' },
        { date: 'May 5, 2026', amount: 833, status: t('paid'), statusColor: 'bg-green-100', statusTextColor: 'text-green-700' }
    ]


    return (
        <div className="space-y-6 shadow-lg rounded-2xl p-5 py-10" >
            {/* Top Progress Card */}
            <Card className="border border-primary rounded-2xl p-0 py-3">
                <CardContent className="p-6 py-0">
                    <div className="flex items-center justify-between">
                        {/* Left side - Title and graduation cap icon */}
                        <div className="flex items-center gap-4">
                            <div className="bg-[#F2F2F7] p-4 rounded-xl">
                                <RiGraduationCapFill className='text-primary text-3xl' />
                            </div>
                            <div className="text-right">
                                <h2 className="text-xl font-semibold text-gray-800">{t('loanForStudy')}</h2>
                                <p className="text-gray-600">12 {t('month')}</p>
                            </div>

                        </div>
                        {/* Right side - Progress percentage with curved progress bar */}
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                {/* Circular progress indicator */}
                                {/* <div className="w-16 h-16 relative"> */}
                                <div className="radial-progress text-secondary border-gray-300 border-2" style={{ "--value": loanData.progressPercentage, "--size": "3.5rem", "--thickness": "5px" } as React.CSSProperties} aria-valuenow={loanData.progressPercentage} role="progressbar">
                                    {loanData.progressPercentage}%
                                </div>
                                {/* </div> */}
                            </div>
                        </div>

                    </div>
                </CardContent>
            </Card>

            <Card className="border border-gray-300 rounded-2xl p-3">
                {/* Main Details Grid */}
                <Card>
                    <CardContent className="px-8">
                        <div className="">
                            <div className="space-y-4">
                                {/* first row */}
                                <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                                    <div>
                                        <p className="text-gray-600 mb-1">{t('loanAmount')}</p>
                                        <p className="text-lg font-semibold text-primary">
                                            {loanData.loanAmount.toLocaleString()}
                                            <SaudiRiyalIcon className="fill-secondary inline-block w-5 h-5" />
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 mb-1">{t('remainingAmount')}</p>
                                        <p className="text-lg font-semibold text-primary">
                                            {loanData.remainingAmount.toLocaleString()}
                                            <SaudiRiyalIcon className="fill-secondary inline-block w-5 h-5" />
                                        </p>
                                    </div>
                                </div>
                                {/* second row */}
                                <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                                    <div>
                                        <p className="text-gray-600 mb-1">{t('installmentCount')}</p>
                                        <p className="text-lg font-semibold text-primary">{loanData.installmentCount}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 mb-1">{t('installmentValue')}</p>
                                        <p className="text-lg font-semibold text-primary">
                                            {loanData.installmentAmount} {""}
                                            <SaudiRiyalIcon className="fill-secondary inline-block w-4 h-4" />
                                            {t('perMonth')}
                                        </p>
                                    </div>
                                </div>
                                {/* third row */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 mb-1">{t('applicationDate')}</p>
                                        <p className="text-lg text-primary font-bold">{loanData.applicationDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 mb-1">{t('endDate')}</p>
                                        <p className="text-lg text-primary font-bold">{loanData.startDate}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Payment Schedule */}
                <Card className="border border-gray-300 rounded-2xl">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-primary">{t('installments')}</h3>
                            <Button
                                variant="outline"
                                className="text-secondary border-secondary hover:bg-secondary hover:text-white cursor-pointer rounded-full px-6 font-bold"
                            >
                                {t('acceleratedPayment')}
                            </Button>
                        </div>

                        {/* Table Header */}
                        <div className="flex justify-between p-4 px-6 text-gray-600 font-medium  border-t border-gray-100">
                            <div className="">{t('amount')}</div>
                            <div className="">{t('date')}</div>
                            <div className="">{t('status')}</div>
                        </div>

                        {/* Table Rows */}
                        <div className="space-y-3 mt-4">
                            {paymentSchedule.map((payment, index) => (
                                <div key={index} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                                    <div className="grid grid-cols-3 gap-4 items-center">
                                        <div className=" flex items-center gap-1">
                                            <span className="text-gray-800 font-semibold text-lg">{payment.amount}</span>
                                            <SaudiRiyalIcon className="fill-yellow-500 w-5 h-5" />
                                        </div>
                                        <div className="text-center text-gray-600 font-medium">
                                            {payment.date}
                                        </div>
                                        <div className="text-end">
                                            <span className={`px-4 py-2 rounded-lg ${payment.statusTextColor} text-sm font-bold ${payment.statusColor}`}>
                                                {payment.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </Card>

        </div >
    )
}
