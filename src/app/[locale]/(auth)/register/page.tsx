"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import mainLogo from "@/assets/images/main-logo.png";
import Link from "next/link";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="w-[60%] bg-white flex items-center justify-center p-8  shadow-[20px_0_40px_-10px_rgba(0,0,0,0.3)]">
            <div className="w-full max-w-2xl">
                {/* Logo and Welcome Section */}
                <div className="text-start mb-10">
                    <div className="mb-8">
                        <Image src={mainLogo.src} alt="Logo" width={170} height={170} className="" />
                    </div>
                    <h1 className="text-4xl font-bold text-primary mb-2" >
                        مرحباً بكم من جديد!
                    </h1>
                </div>

                {/* Registration Form */}
                <div className="space-y-2">
                    {/* Name Field */}
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-bold text-[#919499] block" >
                            الاسم
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="احمد محمد احمد"
                            className="h-12 placeholder:text-gray-400 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500"

                        />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-bold text-[#919499] block" >
                            الايميل
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Name@gmail.com"
                            className="h-12  placeholder:text-gray-400 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    {/* Phone Field */}
                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-bold text-[#919499] block" >
                            رقم الهاتف
                        </Label>
                        <Input
                            dir="rtl"
                            id="phone"
                            type="tel"
                            placeholder="9975421345"
                            className="h-12 placeholder:text-gray-400 placeholder:text-start border-gray-300 rounded-lg text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-bold text-[#919499] block" >
                            كلمة المرور
                        </Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••"
                                className="h-12 placeholder:text-gray-400 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute end-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-sm font-bold text-[#919499] block" >
                            تأكيد كلمة المرور
                        </Label>
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="••••••"
                                className="h-12 placeholder:text-gray-400 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute end-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Register Button */}
                    <Button className="w-full bg-secondary hover:bg-secondary/90 cursor-pointer text-white font-bold h-14 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all mt-8">
                        انشاء حساب
                    </Button>

                    {/* Login Link */}
                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-600" >
                            لديك حساب؟{"  "}
                            <Link href="/ar/login" className="text-secondary hover:text-secondary/90 font-bold">
                                تسجيل الدخول
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}