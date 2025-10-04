"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import mainLogo from "@/assets/images/main-logo.png";
import { resetPassword } from "@/actions/auth.actions";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface ResetPasswordFormData {
    password: string;
    confirmPassword: string;
}

export default function ResetPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const resetPasswordSchema = z.object({
        password: z.string().nonempty("كلمة المرور مطلوبة").min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل").regex(/^[a-zA-Z0-9]+$/, "كلمة المرور يجب أن تحتوي على حروف وأرقام فقط"),
        confirmPassword: z.string().nonempty("تأكيد كلمة المرور مطلوب")
    }).refine((data) => data.password === data.confirmPassword, {
        message: "كلمة المرور غير متطابقة",
        path: ["confirmPassword"]
    });

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
        criteriaMode: "all",
        mode: "onChange",
    });

    useEffect(() => {
        const email = sessionStorage.getItem("userEmail");
        const otp = sessionStorage.getItem("otpNumber");
        setEmail(email || "");
        setOtp(otp || "");
    }, []);

    const handleResetPassword = async (data: ResetPasswordFormData) => {
        setError("");
        setSuccess("");
        try {
            const response = await resetPassword({ email, otp, password: data.password, confirmPassword: data.confirmPassword });
            if (response.success == true) {
                setSuccess("تم إعادة تعيين كلمة المرور بنجاح. سيتم التحويل إلى صفحة تسجيل الدخول...");
                setTimeout(() => {
                    router.push("/ar/auth/login");
                }, 2000);
            }
            if (response.success == false) {
                setError(response.error);
            }
        } catch (error) {
            setError(error as string);
        }
    }
    return (
     
            <div className="w-full mt-16">
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

                {/* Form */}
                <form onSubmit={handleSubmit(handleResetPassword)} className="space-y-6">
                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                            <p className="text-red-700 text-center font-medium">{error}</p>
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                            <p className="text-green-700 text-center font-medium">{success}</p>
                        </div>
                    )}

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
                                className="h-14 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20"
                                {...register("password")}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-sm font-bold text-[#919499] block">
                            تأكيد كلمة المرور
                        </Label>
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="••••••"
                                className="h-14 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20"
                                {...register("confirmPassword")}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                    </div>

                    {/* Confirm Button */}
                    <Button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold h-14 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all mt-8"
                    >
                        {isSubmitting ? "جاري التحديث..." : "تأكيد"}
                    </Button>
                </form>
            </div>

    );
}
