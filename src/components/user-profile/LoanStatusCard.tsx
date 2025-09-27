import SaudiRiyalIcon from '@/assets/images/SaudiRiyalSymbol.svg';
import React from 'react';
import { AiOutlineDollar } from 'react-icons/ai';

interface LoanStatusCardProps {
  totalAmount?: number;
  remainingInstallments?: number;
  completionDate?: string;
  progressPercentage?: number;
  currency?: string;
}

function LoanStatusCard(props: LoanStatusCardProps = {}) {
  const {
    totalAmount = 10000,
    remainingInstallments = 2,
    completionDate = "05 May, 2026",
    progressPercentage = 60,
  } = props;


  return (
    <div className="bg-primary rounded-xl p-6  text-white shadow-lg mb-6 border-white border-8">
      <div className="flex flex-row-reverse items-center justify-between">
        {/* Progress Circle and Remaining Installments - Right side in RTL */}
        <div className="flex flex-col items-center">
          <div
            className="radial-progress bg-primary text-xl font-bold text-secondary border-gray-100 border-4"
            style={{ "--value": progressPercentage } as React.CSSProperties} aria-valuenow={progressPercentage} role="progressbar">
            {progressPercentage}%
          </div>
          {/* Remaining Installments below circle */}
          <div className="text-center flex items-center gap-2 mt-4">
            <div className="font-bold">الأقساط المتبقية</div>
            <div className="text-2xl font-bold">{remainingInstallments}</div>
          </div>
        </div>

        {/* Content - Left side in RTL */}
        <div className="flex flex-col ">
          {/* Total Amount Section */}
          <div className="flex items-center justify-start gap-2 mb-4">
            <div className="bg-white/20 rounded-full p-1.5">
              <AiOutlineDollar className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-lg">إجمالي القرض</span>
          </div>

          {/* Amount Display */}
          <div className="flex items-center justify-start gap-2 mb-6 px-4">
            <span className="text-4xl font-bold">{totalAmount.toLocaleString()}</span>
            <SaudiRiyalIcon className="fill-secondary inline-block w-8 h-8" />
          </div>

          {/* Bottom Info Row */}
          <div className="flex items-center justify-between text-sm opacity-90">
            <div className="text-start flex gap-2">
              <span className="font-bold text-lg">تاريخ الانتهاء</span>
              <span className="text-lg">{completionDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanStatusCard;