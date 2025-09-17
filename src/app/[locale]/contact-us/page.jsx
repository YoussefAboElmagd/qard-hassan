import Navbar from "@/components/navbar/navbar";
import Image from "next/image";
import Landing_Hero from "../../../components/landingHero/Landing_Hero";
import ContactFrom from "../../../components/contactus/ContactFrom";
import BannerFrom from "../../../components/contactus/BannerFrom";
import background from "@/assets/images/background-arabic.png";
import map from "@/assets/images/map.png";
import headerWhiteTop from "@/assets/images/LandingImgs/header-white-top.png";
import Footer from "../../../components/Footer/footer";
export default function page() {
  return (
    <>
      <header
        className="w-full relative h-auto lg:h-[40vh] pb-10 lg:pb-0 bg-cover bg-center mb-16"
        style={{
          backgroundImage: `linear-gradient(rgba(77, 128, 168, 0.8), rgba(29, 78, 116, 0.8)) , url(${background.src})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Navbar />
        {/* Hero Content Section */}
        <div className="flex  justify-center items-center">
          <Landing_Hero
            mainText={"تواصل معنا"}
            linkOne={"/ar"}
            linkTwo={"/ar/contact-us"}
            textOne={"الصفحة الرئسية"}
            textTwo={"تواصل معنا"}
          />
        </div>
        <Image
          src={headerWhiteTop.src}
          alt="header-white-top"
          width={450}
          height={100}
          className="absolute top-0 start-0 hidden lg:block"
        />

        <div className="absolute -bottom-15 right-10 hidden lg:block"></div>
      </header>

      <div className=" max-w-7xl mx-auto ">
        <p className="text-primary font-semibold">تواصل معنا</p>
        <h3 className="text-primary font-semibold text-3xl py-3 ">
          أبق على <span className="text-chart-4">اتصال</span>
        </h3>
        <p className="font-semibold text-sm">
          لا تتردد في التواصل معنا فريق الدعم لدينا في انتظار كم علي مدار الساعة
        </p>

        <div className="my-10 flex">
          <ContactFrom />
          <BannerFrom />
        </div>

        <div className="relative w-full h-[650px] rounded-md ">
          <Image src={map} fill className="object-cover rounded-md"  />
        </div>

        <Footer/>
      </div>
    </>
  );
}
