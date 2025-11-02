'use client'
import Navbar from "@/components/navbar/navbar";
import background from "@/assets/images/LandingImgs/landingHeaderBG.png";
import headerWhiteTop from "@/assets/images/LandingImgs/header-white-top.png";
import headerWhiteBottom from "@/assets/images/LandingImgs/header-white-bottom.png";
import headerBottomImg from "@/assets/images/LandingImgs/headerBottomImg.png";
import usersRating from "@/assets/images/LandingImgs/usersRating.png";
import Image from "next/image";
import WhyChooseUs from "@/components/WhyChooseUs/whyChooseUs";
import LoanFundingIntro from "@/components/LoanFundingIntroCard/LoanFundingIntro";
import TestimonialsCarousel from "@/components/TestimonialCard/testimonialCard";
import FAQAccordion from "@/components/FAQAccordion/FAQAccordion";
import Footer from "@/components/Footer/footer";
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function LandingPage() {
  const router = useRouter();
  return (
    <>
      <header className="w-full relative h-auto lg:h-[60vh] pb-10 lg:pb-0 mb-16">
        {/* Background Image with Gradient Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage: `url(${background.src})`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(77,128,168,0.8)] to-[rgba(29,78,116,0.8)]" />

        {/* Content */}
        <div className="relative z-10">
          <Navbar />
          {/* Hero Content Section */}
          <div className="container ms-auto px-4 sm:px-5 pt-20 lg:pt-16">
            <div className="flex items-center justify-center lg:justify-center">
              <div className="text-center md:text-right text-white max-w-5xl w-full lg:w-auto">
                <h1 className="text-5xl lg:text-[64px] font-bold mb-6 leading-tight text-stroke">
                  نحن ندعمك <span className="text-secondary">ماليًا .</span>
                </h1>

                <p className="text-lg lg:text-xl mb-8 leading-relaxed opacity-90">
                وقف الصدقة الجارية يقدم لك قرضًا حسنًا متوافقًا مع أحكام الشريعة.
                </p>

                <button onClick={() => router.push('/ar/user-profile/loans/loan-request')} className="bg-secondary cursor-pointer hover:bg-secondary/90 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 flex items-center gap-2 w-fit mx-auto lg:ml-0 lg:mr-auto -translate-x-10">
                  <span> لسد احتياجاتك والوفاء بمتطلباتك</span>
                 <FaArrowLeftLong className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Top decorative image - responsive sizing */}
          <Image 
            src={headerWhiteTop.src} 
            alt="header-white-top" 
            width={450} 
            height={100} 
            className="absolute top-0 start-0 hidden lg:block w-[30vw] max-w-[400px] h-auto" 
          />
        </div>

        {/* Bottom decorative image - responsive sizing */}
        <Image 
          src={headerWhiteBottom.src} 
          alt="header-white-bottom" 
          width={800} 
          height={100} 
          className="bottom-0 absolute hidden lg:block w-[50vw] max-w-[800px] h-auto" 
        />
        
        <div className="absolute -bottom-10 right-10 hidden lg:block">
          <Image 
            src={headerBottomImg.src} 
            alt="header-bottom-img" 
            width={420} 
            height={100} 
            className="w-[25vw] max-w-[420px] h-auto" 
          />
          <Image 
            src={usersRating.src} 
            alt="users-rating" 
            width={200} 
            height={100} 
            className="absolute -bottom-16 left-0 z-10 w-[11vw] max-w-[200px] h-auto" 
          />
        </div>
      </header>
      <WhyChooseUs />
      <LoanFundingIntro />
      <TestimonialsCarousel />
      <FAQAccordion />
      <Footer contactUsFooter={false} />
    </>
  )
}