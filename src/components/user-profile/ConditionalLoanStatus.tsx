'use client'

import { usePathname } from 'next/navigation'
import LoanStatusCard from './LoanStatusCard'

interface ActiveLoan {
  id?: number
  name?: string
  loan_amount?: number
  remaining_installments?: number
  paid_installments_percentage?: number
  end_date?: string
  status?: string
  total_installments?: number
}

interface ConditionalLoanStatusProps {
  activeLoan?: ActiveLoan | null
}

export default function ConditionalLoanStatus({ activeLoan }: ConditionalLoanStatusProps) {
  const pathname = usePathname()
  
  // Hide loan status card on chat page
  if (pathname.includes('/user-profile/chat')) {
    return null
  }
  
  return <LoanStatusCard activeLoan={activeLoan} />
}

