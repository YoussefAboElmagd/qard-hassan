import Navbar from "@/components/navbar/navbar";
import background from "@/assets/images/background-arabic.png";
import headerWhiteTop from "@/assets/images/LandingImgs/header-white-top.png";
import Footer from "../../../components/Footer/footer"
import Image from "next/image";
import Landing_Hero from "../../../components/landingHero/Landing_Hero";
import Feature from "../../../components/about/Feature";
import Card from "../../../components/about/Card";
import Vision from "../../../components/about/Vision";
import Loan from "../../../components/about/Loan";


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
            mainText={"من نحن"}
            linkOne={"/ar"}
            linkTwo={"/ar/about-us"}
            textOne={"الصفحة الرئسية"}
            textTwo={"من نحن"}
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
      <div>
        <Feature />
        <div
          style={{
            position: "relative",
            top: "-100px",
          }}
          className="grid md:grid-cols-4 grid-cols-2 mb-10"
        >
          {cards.map((ele, index) => (
            <Card key={index} title={ele.title} num={ele.num} k={ele.k} />
          ))}
        </div>
      </div>

      <Vision />
      <Loan />
      <Footer/>
    </>
  );
}
