"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import mainLogo from "@/assets/images/main-logo.png";

export default function ResetPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <div className="w-[60%] bg-white flex items-start pt-16 justify-center shadow-[20px_0_10px_0_rgb(0,0,0)]">
            <div className="w-full text-start max-w-xl">
                {/* Logo */}
                <div className="mb-12 flex justify-start">
                    <Image src={mainLogo.src} alt="Logo" width={200} height={200} className="" />
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold text-primary mb-8">
                    إعادة تعيين كلمة مرور
                </h1>

                {/* Description */}
                <p className="text-lg text-gray-600 mb-12 leading-relaxed">
                    ادخل كلمة المرور الجديدة المكونة من 8 أرقام وحروف ورموز
                </p>

                {/* Form Fields */}
                <div className="space-y-8">
                    {/* Password Field */}
                    <div className="space-y-4">
                        <Label htmlFor="password" className="text-sm font-bold text-[#919499] block">
                            كلمة المرور
                        </Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••"
                                className="h-14 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 "
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="space-y-4">
                        <Label htmlFor="confirmPassword" className="text-sm font-bold text-[#919499] block">
                            تأكيد كلمة المرور
                        </Label>
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••"
                                className="h-14 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 "
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Confirm Button */}
                <div className="mt-12">
                    <Button 
                        className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white font-bold h-14 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all"
                        disabled={!password.trim() || !confirmPassword.trim() || password !== confirmPassword}
                    >
                        تأكيد
                    </Button>
                </div>
            </div>
        </div>
    );
}
