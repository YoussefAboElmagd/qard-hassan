"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import LoanRequestForm from '@/components/user-profile/LoanRequestCard';
import FinancialStatusForm from '@/components/user-profile/FinancialStatusForm';
import GuarantorInformationForm from '@/components/user-profile/GuarantorInformationForm';


// Financial Status Component

// Guarantor Information Component


// Main Loan Request Page Component
export default function LoanRequest() {
  return (
    <div className=" space-y-8" dir="rtl">
      
      <LoanRequestForm />
      <FinancialStatusForm />
      <GuarantorInformationForm />

      
      {/* Final Submit Button */}
      <div className="flex justify-end p-4 bg-[#D0D5DD52] items-center rounded-xl">
        <Button 
          variant="outline"
          className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white px-12 py-3 rounded-full font-semibold text-lg transition-colors"
          size="lg"
        >
          إرسال الطلب
        </Button>
      </div>
    </div>
  );
}