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

export default function LandingPage() {
  const router = useRouter();
  return (
    <>
      <header className="w-full relative h-auto lg:h-[60vh] pb-10 lg:pb-0 bg-cover bg-center mb-16" style={{
        backgroundImage: `linear-gradient(rgba(77, 128, 168, 0.8), rgba(29, 78, 116, 0.8)) , url(${background.src})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}>
        <Navbar />
        {/* Hero Content Section */}
        <div className="container mx-auto px-4 sm:px-5 pt-20 lg:pt-16">
          <div className="flex items-center justify-center lg:justify-end">
            <div className="text-center md:text-right text-white max-w-3xl w-full lg:w-auto">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                هل تحتاج إلى دعم مالي
                <span className="text-secondary">... القرض الحسن هنا لدعمك!</span>
              </h1>

              <p className="text-lg lg:text-xl mb-8 leading-relaxed opacity-90">
                نقدم لك قروضًا حسنة بدون فوائد ربوية، متوافقة مع أحكام الشريعة الإسلامية. نؤمن بأن التمويل يجب أن يكون وسيلة لتمكين الأفراد والمجتمعات، لا عبئًا يثقل كاهلهم.
              </p>

              <button onClick={() => router.push('/ar/user-profile/loans/loan-request')} className="bg-secondary cursor-pointer hover:bg-secondary/90 text-black font-bold py-3 px-8 rounded-full transition-all duration-300 flex items-center gap-2 w-fit mx-auto lg:ml-0 lg:mr-auto">
                <span>اطلب الان</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <Image src={headerWhiteTop.src} alt="header-white-top" width={450} height={100} className="absolute top-0 start-0 hidden lg:block" />
        <Image src={headerWhiteBottom.src} alt="header-white-bottom" width={800} height={100} className="bottom-0 absolute hidden lg:block" />
        <div className="absolute -bottom-15 right-10 hidden lg:block">
          <Image src={headerBottomImg.src} alt="header-bottom-img" width={420} height={100} className="a" />
          <Image src={usersRating.src} alt="users-rating" width={200} height={100} className="absolute -bottom-16 left-0 z-10" />
        </div>
      </header>
      <WhyChooseUs />
      <LoanFundingIntro/>
      <TestimonialsCarousel/>
      <FAQAccordion/>
      <Footer contactUsFooter={false} />
    </>
  )
}
