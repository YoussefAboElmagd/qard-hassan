import React from 'react'
import Image from 'next/image'
import background from "@/assets/images/background-arabic.png"
import Navbar from '@/components/navbar/navbar'
import headerWhiteTop from "@/assets/images/LandingImgs/header-white-top.png"
import UserProfileSidebar from '@/components/user-profile/UserProfileSidebar'
import LoanStatusCard from '@/components/user-profile/LoanStatusCard'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50" >
      {/* Header Background */}
      <header
        className="w-full relative h-[30vh] sm:h-[35vh] md:h-[40vh] lg:h-[45vh] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(77, 128, 168, 0.8), rgba(29, 78, 116, 0.8)) , url(${background.src})`,
          backgroundPosition: "100% 40%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Navbar />

        <Image
          src={headerWhiteTop.src}
          alt="header-white-top"
          width={450}
          height={100}
          className="absolute top-0 start-0 hidden lg:block"
        />
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
              <LoanStatusCard />
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
