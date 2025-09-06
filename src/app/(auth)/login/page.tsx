"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import mainLogo from "@/assets/images/main-logo.png";
import Link from "next/link";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-[60%] bg-white flex items-center justify-center p-8  shadow-[20px_0_40px_-10px_rgba(0,0,0,0.3)]">
            <div className="w-full max-w-2xl">
                {/* Logo and Welcome Section */}
                <div className="text-start mb-10">
                    <div className="mb-8">
                        <Image src={mainLogo.src} alt="Logo" width={170} height={170} className="" />
                    </div>
                    <h1 className="text-4xl font-bold text-primary mb-2">
                        مرحباً بكم من جديد!
                    </h1>
                </div>

                {/* Login Form */}
                <div className="space-y-2">
                    {/* Email Field */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-bold text-[#919499] block">
                            الايميل
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Name@gmail.com"
                            className="h-12 placeholder:text-gray-400 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-bold text-[#919499] block">
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

                    {/* Forgot Password Link */}
                    <div className="text-end mb-6">
                        <Link href="/ar/forgot-password" className="text-sm text-secondary hover:text-secondary/90 font-bold">
                            نسيت كلمة المرور؟
                        </Link>
                    </div>

                    {/* Login Button */}
                    <Button className="w-full bg-secondary hover:bg-secondary/90 cursor-pointer text-white font-bold h-14 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all mt-8">
                        تسجيل الدخول
                    </Button>

                    {/* Register Link */}
                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-600">
                            ليس لديك حساب؟{"  "}
                            <Link href="/register" className="text-secondary hover:text-secondary/90 font-bold">
                                انشاء حساب
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
