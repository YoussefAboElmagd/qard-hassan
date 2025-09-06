"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Image from "next/image";
import mainLogo from "@/assets/images/main-logo.png";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");

    return (
        <div className="w-[60%] bg-white flex items-start pt-16 justify-center shadow-[20px_0_0_0_rgb(0,0,0)]">
            <div className="w-full  text-start max-w-3xl p-16">
                {/* Logo */}
                <div className="mb-12 flex justify-start">
                    <Image src={mainLogo.src} alt="Logo" width={200} height={200} className="" />
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold text-primary mb-8">
                    استرداد الحساب
                </h1>

                {/* Description */}
                <p className="text-lg text-gray-600 mb-12 leading-relaxed">
                    ادخل الإيميل المسجل لإرسال OTP
                </p>

                {/* Email Field */}
                <div className="space-y-4 mb-12">
                    <Label htmlFor="email" className="text-sm font-bold text-[#919499] block">
                        الإيميل
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Name@gmail.com"
                        className="h-14 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                </div>

                {/* Confirm Button */}
                <Button 
                    className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white font-bold h-14 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all"
                    disabled={!email.trim()}
                >
                    تأكيد
                </Button>
            </div>
        </div>
    );
}
