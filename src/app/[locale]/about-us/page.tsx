import Navbar from "@/components/navbar/navbar";
import background from "@/assets/images/background-arabic.png";
import headerWhiteTop from "@/assets/images/LandingImgs/header-white-top.png";
import Footer from "@/components/Footer/footer"
import Image from "next/image";
import TestimonialsCarousel from "@/components/TestimonialCard/testimonialCard";
import Feature from "@/components/about/Feature";
import Card from "@/components/about/Card";
import Vision from "@/components/about/Vision";
import Landing_Hero from "@/components/landingHero/Landing_Hero";
import StrategicGoals from "@/components/about/strategicGoals";
import Vision2030Slide from "@/components/about/Vision2030Card";
import BoardMembers from "@/components/about/BoardMembers";


const cards = [
  {
    title: "عملية اقتراض",
    num: "80",
    k: true,
  },
  {
    title: "عميل ",
    num: "54",
    k: true,
  },
  {
    title: "الأستشاريون الخبراء",
    num: "210",
    k: false,
  },
  {
    title: "المشاريع المكتملة",
    num: "34",
    k: true,
  },
];

export default function Page() {
  return (
    <>
      <header className="w-full relative h-auto lg:h-[45vh] pb-10 lg:pb-0 mb-16">
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
        {/* Hero Content Section */}
        <div className="flex justify-center items-center mt-5">
          <Landing_Hero
            mainText={"من نحن"}
            linkOne={"/"}
            linkTwo={"/about-us"}
            textOne={"الصفحة الرئسية"}
            textTwo={"من نحن"}
          />
        </div>
        <Image 
            src={headerWhiteTop.src} 
            alt="header-white-top" 
            width={450} 
            height={100} 
            className="absolute top-0 start-0 hidden lg:block w-[35vw] max-w-[400px] h-auto" 
          />

        <div className="absolute -bottom-15 right-10 hidden lg:block"></div>
        </div>
      </header>
      <div className="w-[80%] mx-auto">
        <Feature />
        <div
          className="grid md:grid-cols-4 grid-cols-2 mb-10 "
        >
          {cards.map((ele, index) => (
            <Card key={index} title={ele.title} num={ele.num} k={ele.k} isLast={index === cards.length - 1} />
          ))}
        </div>
        <Vision />
        <StrategicGoals/>
        <Vision2030Slide />
        <BoardMembers />

      </div>
      <TestimonialsCarousel />

      <Footer contactUsFooter={false} />
    </>
  );
}
