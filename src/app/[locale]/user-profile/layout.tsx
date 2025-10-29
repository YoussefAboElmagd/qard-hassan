import React from 'react'
import Image from 'next/image'
import background from "@/assets/images/background-arabic.png"
import Navbar from '@/components/navbar/navbar'
import headerWhiteTop from "@/assets/images/LandingImgs/header-white-top.png"
import UserProfileSidebar from '@/components/user-profile/UserProfileSidebar'
import ConditionalLoanStatus from '@/components/user-profile/ConditionalLoanStatus'
import { getActiveLoanDetails } from '@/actions/loan.actions'

interface LayoutProps {
  children: React.ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  const loanResponse = await getActiveLoanDetails();
  const activeLoan = loanResponse?.success ? loanResponse.data?.active_loan : null;
  return (
    <div className="min-h-screen bg-gray-50" >
      {/* Header Background */}
      <header className="w-full relative h-[30vh] sm:h-[35vh] md:h-[40vh] lg:h-[45vh]">
        {/* Background Image with Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-no-repeat bg-[100%_40%]"
          style={{
            backgroundImage: `url(${background.src})`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(77,128,168,0.8)] to-[rgba(29,78,116,0.8)]" />
        
        {/* Content */}
        <div className="relative z-10">
        <Navbar />

        <Image
          src={headerWhiteTop.src}
          alt="header-white-top"
          width={450}
          height={100}
          className="absolute top-0 start-0 hidden lg:block"
        />
        </div>
      </header>

      {/* Main Content with proper spacing */}
      <main className="relative -mt-16 sm:-mt-20 md:-mt-24 lg:-mt-32 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 lg:gap-8">
            {/* Sidebar */}
            <aside className="w-full xl:w-auto xl:flex-shrink-0">
              <UserProfileSidebar />
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0 space-y-4 sm:space-y-6">
              {/* Loan Status Card */}
              <ConditionalLoanStatus activeLoan={activeLoan} />
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
