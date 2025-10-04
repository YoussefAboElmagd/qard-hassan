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
    <div className="relative text-white px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col rounded-xl w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] overflow-hidden">
      {/* Background with gradient overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${background.src})`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(30,74,116,0.95)] to-[rgba(29,78,116,0.95)]" />
      
      {/* Decorative circles */}
      <div className="absolute bottom-15 right-4 sm:right-8 w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-white/15" />
      <div className="absolute -bottom-25 -right-25 w-40 h-40 sm:w-64 sm:h-64 rounded-full bg-white/8" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header - centered */}
        <div className="text-start mb-8 sm:mb-12">
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3">معلومات الاتصال</p>
          <p className="text-sm sm:text-base opacity-90">قل شيئا لبدء محادثة مباشرة!</p>
        </div>

        {/* Contact Information - RTL layout preserved */}
        <div className="mb-8 sm:mb-12 lg:mb-16 space-y-4 sm:space-y-6">
          <div className="flex gap-x-3 sm:gap-x-4 justify-end items-center">
            <span className="text-sm sm:text-base lg:text-lg">+1012 3456 789</span>
            <span>
              <PhoneCall size={18} className="sm:w-5 sm:h-5" />
            </span>
          </div>
          <div className="flex gap-x-3 sm:gap-x-4 justify-end items-center">
            <span className="text-sm sm:text-base lg:text-lg">demo@gmail.com</span>
            <span>
              <Mail size={18} className="sm:w-5 sm:h-5" />
            </span>
          </div>
          <div className="flex gap-x-3 sm:gap-x-4 justify-end items-start">
            <span className="text-end text-sm sm:text-base lg:text-lg leading-relaxed">
              132 Dartmouth Street Boston,<br />
              Massachusetts 02156 United States
            </span>
            <span className="mt-1">
              <MapPin size={18} className="sm:w-5 sm:h-5" />
            </span>
          </div>
        </div>

        {/* Social Media Icons - with boxes like in image */}
        <div className="flex gap-x-3 sm:gap-x-4 mt-auto justify-end">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded border border-white/40 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
            <Instagram size={18} className="sm:w-[22px] sm:h-[22px]" />
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded border border-white/40 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
            <Facebook size={18} className="sm:w-[22px] sm:h-[22px]" />
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded border border-white/40 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
            <Twitter size={18} className="sm:w-[22px] sm:h-[22px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
