"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef } from "react";
import Image from "next/image";
import mainLogo from "@/assets/images/main-logo.png";

export default function OTPVerification() {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(150); // 2:30 in seconds
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Format timer to MM:SS
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleInputChange = (index: number, value: string) => {
        if (value.length > 1) return;
        
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleResendCode = () => {
        setTimer(150); // Reset timer to 2:30
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
    };

    return (
        <div className="w-[60%] bg-white flex items-center justify-center p-8 shadow-[20px_0_40px_-10px_rgba(0,0,0,0.3)]">
            <div className="w-full max-w-2xl text-center">
                {/* Logo */}
                <div className="mb-12 flex justify-start">
                    <Image src={mainLogo.src} alt="Logo" width={200} height={200} className="" />
                </div>

                {/* Title */}
                <h1 className="text-5xl font-bold text-primary text-start mb-8">
                    ادخال OTP
                </h1>

                {/* Description */}
                <p className="text-lg text-gray-600 mb-8 leading-relaxed text-start">
                    تم إرسال رسالة OTP التي تحتوي على الكود الخاص بك إلى ahmed@yahoo.com
                </p>

                {/* Instruction */}
                <p className="text-base text-primary font-bold mb-6">
                    ادخل الكود المرسل المكون من 6 أرقام
                </p>

                {/* OTP Input Fields */}
                <div className="flex justify-center gap-4 mb-8" dir="ltr">
                    {otp.map((digit, index) => (
                        <Input
                            key={index}
                            // ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-16 h-16 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-pr focus:ring-2 focus:ring-pr/20"
                        />
                    ))}
                </div>

                {/* Timer */}
                <div className="mb-6">
                    <p className="text-lg text-gray-600">
                        تم إرسال الكود <span className="text-red-500 font-bold">{formatTime(timer)}</span>
                    </p>
                </div>

                {/* Resend Link */}
                <div className="mb-10">
                    <p className="text-base text-black">
                        لم يصلني الكود؟{" "}
                        <button
                            onClick={handleResendCode}
                            className="text-primary hover:text-primary/80 font-bold "
                        >
                            إرسال مره أخري
                        </button>
                    </p>
                </div>

                {/* Confirm Button */}
                <Button 
                    className="w-full max-w-md bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white font-bold h-14 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all"
                    disabled={otp.some(digit => !digit)}
                >
                    تأكيد
                </Button>
            </div>
        </div>
    );
}
