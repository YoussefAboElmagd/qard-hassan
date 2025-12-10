'use client'
import LoanCard from "@/components/user-profile/LoanCard";
import { useRouter } from "next/navigation";
import { FaCommentDollar } from "react-icons/fa";
import { getUserLoansList } from "@/actions/loan.actions";
import { useEffect, useState, useCallback } from "react";
import { useTranslations, useLocale } from 'next-intl';
import { Pagination } from "@/components/ui/pagination";

interface Loan {
  id: number;
  name: string;
  loan_amount: number;
  loan_reason: string;
  number_of_installments: number;
  submission_date: string;
  start_date: string | null;
  end_date: string | null;
  status: "under_review" | "approved" | "rejected";
}

interface PaginationData {
  page: number;
  pageLimit: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

const PAGE_LIMIT = 10;

export default function LoanDashboard() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const t = useTranslations('userProfile.loansPage');
  const locale = useLocale();
  const router = useRouter();
  const isRtl = locale === 'ar';

  const getLoans = useCallback(async (page: number) => {
    setIsLoading(true);
    try {
      const loansData = await getUserLoansList(page, PAGE_LIMIT);
      setLoans(loansData?.loans ?? []);
      setPagination(loansData?.pagination ?? null);
    } catch (error) {
      console.error("Error fetching loans:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getLoans(currentPage);
  }, [currentPage, getLoans]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 justify-between w-full bg-[#d0d5dd52] p-3 rounded-xl">
          <div className="flex items-center gap-2 ">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <FaCommentDollar className="w-6 h-6 text-primary" />
            </div>
            <span className="text-primary text-lg font-bold">{t('title')}</span>
          </div>
          <button 
            onClick={() => router.push(`/${locale}/user-profile/loans/loan-request`)} 
            className="border-2 border-secondary text-secondary px-5 py-1 rounded-full font-bold cursor-pointer hover:bg-secondary hover:text-white transition-colors"
          >
            {t('requestLoan')}
          </button>
        </div>
      </div>

      {/* Loan Cards */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : loans.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {t('noLoans')}
          </div>
        ) : (
          loans.map((loan: Loan) => (
            <LoanCard 
              key={loan.id} 
              id={loan.id} 
              name={loan.name} 
              loan_amount={loan.loan_amount} 
              loan_reason={loan.loan_reason} 
              number_of_installments={loan.number_of_installments} 
              submission_date={loan.submission_date} 
              start_date={loan.start_date} 
              end_date={loan.end_date} 
              status={loan.status} 
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.total_pages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.total_pages}
            hasNext={pagination.has_next}
            hasPrevious={pagination.has_previous}
            onPageChange={handlePageChange}
            isRtl={isRtl}
          />
        </div>
      )}
    </div>
  );
}
