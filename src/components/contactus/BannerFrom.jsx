import background from "@/assets/images/background-arabic.png";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  PhoneCall,
  Twitter,
} from "lucide-react";
export default function BannerFrom() {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(77, 128, 168, 0.8), rgba(29, 78, 116, 0.8)) , url(${background.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="text-white px-4 py-3 flex flex-col rounded-md w-2/6"
    >
      <p className="text-3xl font-semibold">معلومات الاتصال</p>
      <p className="text-sm">قل شيئا لبدء محادثة مباشرة!</p>
      <div className="mt-20 ">
        <div className="flex gap-x-3  justify-end mb-3">
          <span className="text-lg  ">+1012 3456 789</span>
          <span className="mt-1">
            <PhoneCall size={18} />
          </span>
        </div>
        <div className="flex gap-x-3 justify-end mb-3">
          <span className="">demo@gmail.com</span>
          <span className="mt-1">
            <Mail size={18} />
          </span>
        </div>
        <div className="flex  gap-x-3 justify-end mb-3">
          <span className=" text-end">
            132 Dartmouth Street Boston, Massachusetts 02156 United States
          </span>
          <span className="mt-1">
            <MapPin size={18} />
          </span>
        </div>
      </div>

      <div className="flex gap-x-3 mt-10   flex-1  justify-srart items-end flex-row-reverse">
        <span>
          <Facebook />
        </span>
        <span>
          <Instagram />
        </span>
        <span>
          <Twitter />
        </span>
      </div>
    </div>
  );
}
