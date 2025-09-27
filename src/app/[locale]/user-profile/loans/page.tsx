'use client'
import LoanCard from "@/components/user-profile/LoanCard";
import { useRouter } from "next/navigation";
import { FaCommentDollar } from "react-icons/fa";
export default function LoanDashboard() {
  const router = useRouter();
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 justify-between w-full bg-[#d0d5dd52] p-3 rounded-xl">
          <div className="flex items-center gap-2 ">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <FaCommentDollar className="w-6 h-6 text-primary" />

          </div>
            <span className="text-primary text-lg font-bold">القروض</span>
          </div>
          <button onClick={() => router.push('/ar/user-profile/loans/loan-request')} className="border-2 border-secondary text-secondary px-5 py-1 rounded-full font-bold cursor-pointer hover:bg-secondary hover:text-white transition-colors">
            طلب قرض
          </button>
        </div>
      </div>

      {/* Loan Cards */}
      <div className="space-y-4">
        <LoanCard
          title="قرض للدراسة"
          duration="12 شهر"
          amount="10,000"
          date="May 5, 2026"
          progress={25}
        />

        <LoanCard
          title="قرض للدراسة"
          duration="12 شهر"
          amount="10,000"
          date="May 5, 2026"
          progress={25}
        />
      </div>

      {/* Apply for Loan Button */}
      <div className="mt-8 flex justify-end">

      </div>
    </div>
  );
}