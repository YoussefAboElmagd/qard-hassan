import Image from "next/image";
import authSocials from "@/assets/images/authSocialMedia.png";
import iphone from "@/assets/images/iphone-register.png";
import rectangle from "@/assets/images/Rectangle37.png";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="min-h-screen flex">
                {/* Right Half - App Promotion */}
                <div className="w-[40%] bg-gradient-to-br from-primary to-primary/90 flex flex-col items-center pt-16 p-8 text-white relative z-0">
                    <div className="text-start max-w-md">
                        {/* Main Headline */}
                        <h2 className="text-4xl font-bold mb-6" >
                            تمويل خير.. <span className="text-secondary">بلا فوائد</span>
                        </h2>

                        {/* Description */}
                        <p className="text-lg leading-relaxed mb-12 opacity-90 font-bold" >
                            نقدم لك قروضًا حسنة بدون فوائد ربوية، متوافقة مع أحكام الشريعة الإسلامية. نؤمن بأن التمويل يجب أن يكون وسيلة لتمكين الأفراد والمجتمعات، لا عبئًا يثقل كاهلهم.                    </p>

                        {/* App Store Badges */}
                        <div className="flex gap-4 justify-center mb-12">
                            <Image src={authSocials.src} alt="authSocials" width={1200} height={1000} />
                        </div>

                        {/* Phone Mockup */}
                        <div className="absolute bottom-0 right-0">
                            <div className="relative">
                                <Image src={iphone.src} alt="iphone" width={300} height={500} className=" bottom-0 right-0" />
                                <Image src={rectangle.src} alt="rectangle" width={400} height={400} className="absolute bottom-0 right-10 -z-1" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Left Half - Registration Form */}
                {children}
            </div>

        </>
    )
}

export default AuthLayout;