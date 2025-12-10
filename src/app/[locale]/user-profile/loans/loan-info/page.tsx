"use client"
import React, { useEffect, useState, useCallback } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { RiGraduationCapFill } from 'react-icons/ri'
import SaudiRiyalIcon from '@/assets/images/SaudiRiyalSymbol.svg'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { getLoanDetailsWithPayments, installmentRequestDeferral } from '@/actions/loan.actions'
import { Button } from '@/components/ui/button'

interface Installment {
    id: number;
    amount: number;
    due_date: string;
    payment_date: string | null;
    status: "paid" | "due" | "overdue";
}

interface LoanDetails {
    id: number;
    name: string;
    loan_amount: number;
    loan_reason: string;
    number_of_installments: number;
    submission_date: string;
    start_date: string | null;
    end_date: string | null;
    installment_amount: number;
    remaining_amount: number;
    status: "under_review" | "approved" | "rejected";
    promissory_note_uploaded: boolean;
    installments: Installment[];
}

export default function LoanInfo() {
    const t = useTranslations('userProfile.loanInfo');
    const searchParams = useSearchParams();
    const loanId = searchParams.get('loanId');
    
    const [loanDetails, setLoanDetails] = useState<LoanDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deferralLoadingId, setDeferralLoadingId] = useState<number | null>(null);

    const fetchLoanDetails = useCallback(async () => {
        if (!loanId) {
            setError(t('noLoanId'));
            setIsLoading(false);
            return;
        }

        try {
            const response = await getLoanDetailsWithPayments(Number(loanId));
            if (response.success) {
                setLoanDetails(response.loan_details);
            } else {
                setError(t('fetchError'));
            }
        } catch {
            setError(t('fetchError'));
        } finally {
            setIsLoading(false);
        }
    }, [loanId, t]);

    useEffect(() => {
        fetchLoanDetails();
    }, [fetchLoanDetails]);

    const handleRequestDeferral = async (installmentId: number) => {
        setDeferralLoadingId(installmentId);
        try {
            await installmentRequestDeferral(installmentId);
            await fetchLoanDetails();
        } catch (err) {
            console.error('Error requesting deferral:', err);
        } finally {
            setDeferralLoadingId(null);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error || !loanDetails) {
        return (
            <div className="text-center py-16 text-gray-500">
                {error || t('noData')}
            </div>
        );
    }

    const paidAmount = loanDetails.loan_amount - loanDetails.remaining_amount;
    const progressPercentage = loanDetails.loan_amount > 0 
        ? Math.round((paidAmount / loanDetails.loan_amount) * 100) 
        : 0;

    const formatDate = (dateString: string | null) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'paid':
                return t('paid');
            case 'due':
                return t('unpaid');
            case 'overdue':
                return t('overdue');
            default:
                return status;
        }
    };

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'paid':
                return { bg: 'bg-green-100', text: 'text-green-700' };
            case 'due':
                return { bg: 'bg-primary', text: 'text-white' };
            case 'overdue':
                return { bg: 'bg-red-100', text: 'text-red-700' };
            default:
                return { bg: 'bg-gray-100', text: 'text-gray-700' };
        }
    };

    const getLoanStatusLabel = (status: string) => {
        switch (status) {
            case 'under_review':
                return t('underReview');
            case 'approved':
                return t('approved');
            case 'rejected':
                return t('rejected');
            default:
                return status;
        }
    };

    const getLoanStatusStyles = (status: string) => {
        switch (status) {
            case 'under_review':
                return 'bg-yellow-100 text-yellow-700';
            case 'approved':
                return 'bg-green-100 text-green-700';
            case 'rejected':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const isApproved = loanDetails.status === 'approved';

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
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {loanDetails.loan_reason || loanDetails.name}
                                </h2>
                                <p className="text-gray-600">{loanDetails.number_of_installments} {t('month')}</p>
                            </div>
                        </div>
                        {/* Right side - Progress percentage with curved progress bar or status badge */}
                        <div className="flex items-center gap-4">
                            {isApproved ? (
                                <div className="relative">
                                    <div 
                                        className="radial-progress text-secondary border-gray-300 border-2" 
                                        style={{ 
                                            "--value": progressPercentage, 
                                            "--size": "3.5rem", 
                                            "--thickness": "5px" 
                                        } as React.CSSProperties} 
                                        aria-valuenow={progressPercentage} 
                                        role="progressbar"
                                    >
                                        {progressPercentage}%
                                    </div>
                                </div>
                            ) : (
                                <span className={`px-4 py-2 rounded-lg text-sm font-bold ${getLoanStatusStyles(loanDetails.status)}`}>
                                    {getLoanStatusLabel(loanDetails.status)}
                                </span>
                            )}
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
                                            {loanDetails.loan_amount.toLocaleString()}
                                            <SaudiRiyalIcon className="fill-secondary inline-block w-5 h-5" />
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 mb-1">{t('remainingAmount')}</p>
                                        <p className="text-lg font-semibold text-primary">
                                            {loanDetails.remaining_amount.toLocaleString()}
                                            <SaudiRiyalIcon className="fill-secondary inline-block w-5 h-5" />
                                        </p>
                                    </div>
                                </div>
                                {/* second row */}
                                <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                                    <div>
                                        <p className="text-gray-600 mb-1">{t('installmentCount')}</p>
                                        <p className="text-lg font-semibold text-primary">{loanDetails.number_of_installments}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 mb-1">{t('installmentValue')}</p>
                                        <p className="text-lg font-semibold text-primary">
                                            {Math.round(loanDetails.installment_amount).toLocaleString()} {""}
                                            <SaudiRiyalIcon className="fill-secondary inline-block w-4 h-4" />
                                            {t('perMonth')}
                                        </p>
                                    </div>
                                </div>
                                {/* third row */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 mb-1">{t('applicationDate')}</p>
                                        <p className="text-lg text-primary font-bold">{formatDate(loanDetails.submission_date)}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 mb-1">{t('endDate')}</p>
                                        <p className="text-lg text-primary font-bold">{formatDate(loanDetails.end_date)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {isApproved && loanDetails.installments.length > 0 && (
                    <Card className="border border-gray-300 rounded-2xl">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-primary">{t('installments')}</h3>
                            </div>

                            {/* Table Header */}
                            <div className="grid grid-cols-3 gap-4 p-4 px-6 text-gray-600 font-medium border-t border-gray-100">
                                <div>{t('amount')}</div>
                                <div className="text-center">{t('date')}</div>
                                <div className="text-end">{t('status')}</div>
                            </div>

                            {/* Table Rows */}
                            <div className="space-y-3 mt-4">
                                {loanDetails.installments.map((installment) => {
                                    const statusStyles = getStatusStyles(installment.status);
                                    const isUnpaid = installment.status === 'due' || installment.status === 'overdue';
                                    const isLoadingDeferral = deferralLoadingId === installment.id;
                                    return (
                                        <div key={installment.id} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                                            <div className="grid grid-cols-3 gap-4 items-center">
                                                <div className="flex items-center gap-1">
                                                    <span className="text-gray-800 font-semibold text-lg">
                                                        {Math.round(installment.amount).toLocaleString()}
                                                    </span>
                                                    <SaudiRiyalIcon className="fill-yellow-500 w-5 h-5" />
                                                </div>
                                                <div className="text-center text-gray-600 font-medium">
                                                    {formatDate(installment.due_date)}
                                                </div>
                                                <div className="flex items-center justify-end gap-2">
                                                    {isUnpaid ? (
                                                        <>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="border-secondary text-secondary hover:bg-secondary hover:text-white text-xs px-3"
                                                                onClick={() => handleRequestDeferral(installment.id)}
                                                                disabled={isLoadingDeferral}
                                                            >
                                                                {isLoadingDeferral ? (
                                                                    <span className="animate-spin h-4 w-4 border-2 border-secondary border-t-transparent rounded-full" />
                                                                ) : (
                                                                    t('requestDeferral')
                                                                )}
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                className="bg-primary text-white hover:bg-primary/90 text-xs px-3"
                                                            >
                                                                {t('unpaid')}
                                                            </Button>
                                                        </>
                                                    ) : (
                                                        <span className={`px-4 py-2 rounded-lg ${statusStyles.text} text-sm font-bold ${statusStyles.bg}`}>
                                                            {getStatusLabel(installment.status)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </Card>
        </div>
    )
}
