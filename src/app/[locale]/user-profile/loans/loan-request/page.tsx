"use client";

import React from 'react';
import LoanRequestForm from '@/components/user-profile/LoanRequestCard';

// Main Loan Request Page Component
// LoanRequestForm now includes both FinancialStatusForm and GuarantorInformationForm integrated within it
export default function LoanRequest() {
  return (
    <div className=" space-y-8" dir="rtl">
      <LoanRequestForm />
    </div>
  );
}