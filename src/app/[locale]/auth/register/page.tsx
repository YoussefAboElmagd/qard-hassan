"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import mainLogo from "@/assets/images/main-logo.png";
import { Link } from "@/i18n/navigation";
import { userRegister } from "@/actions/auth.actions";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface RegisterFormData {
    name: string;
    email: string;
    phone: string;
    national_id: string;
    id_expiry_date: string;
    password: string;
    confirmPassword: string;
}

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();

    const registerSchema = z.object({
        name: z.string().nonempty("الاسم مطلوب").min(2, "الاسم يجب أن يكون على الأقل حرفين"),
        email: z.string().nonempty("البريد الإلكتروني مطلوب").email("البريد الإلكتروني غير صالح"),
        phone: z.string().nonempty("رقم الهاتف مطلوب").min(9, "رقم الهاتف يجب أن يكون من 9 إلى 15 رقمًا").max(15, "رقم الهاتف يجب أن يكون من 9 إلى 15 رقمًا").regex(/^\d+$/, "رقم الهاتف يجب أن يحتوي على أرقام فقط"),
        national_id: z.string().nonempty("رقم الهوية مطلوب").length(9, "رقم الهوية يجب أن يكون 9 أرقام").regex(/^\d+$/, "رقم الهوية يجب أن يحتوي على أرقام فقط"),
        id_expiry_date: z.string().min(1, "تاريخ الانتهاء مطلوب").refine((date) => new Date(date) >= new Date(new Date().setHours(0, 0, 0, 0)), "تاريخ الانتهاء يجب أن يكون تاريخًا مستقبليًا"),
        password: z.string().nonempty("كلمة المرور مطلوبة").min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل").regex(/^[a-zA-Z0-9]+$/, "كلمة المرور يجب أن تحتوي على حروف وأرقام فقط"),
        confirmPassword: z.string().nonempty("تأكيد كلمة المرور مطلوب")
    }).refine((data) => data.password === data.confirmPassword, {
        message: "كلمة المرور غير متطابقة",
        path: ["confirmPassword"]
    });
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        criteriaMode: "all",
        mode: "onChange",

    });

    const handleRegister = async (data: RegisterFormData) => {
        console.log(data);
        const response = await userRegister(data);
        console.log(response);
        if (response.success == true) {
            try {
                sessionStorage.setItem("userEmail", data.email);
                sessionStorage.setItem("otpType", "register");
            } catch (error: unknown) {
                console.error("Register error:", error);
                setError((error as { error: string }).error);
             }
            router.push("/ar/auth/otp-verification");
        }
        if (response.success == false) {
            setError(response.error);
        }
    }
    return (
        <div className="w-full">
            {/* Logo and Welcome Section */}
            <div className="text-start mb-8">
                <div className="mb-8">
                    <Image src={mainLogo.src} alt="Logo" width={170} height={170} className="" />
                </div>
                <h1 className="text-4xl font-bold text-primary mb-2" >
                    مرحباً بكم من جديد!
                </h1>
            </div>

            {/* Registration Form */}
            <div className="space-y-2">
                {/* Error Message */}
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
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
                        {...register("name")}
                        required
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
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
                        {...register("email")}
                        required
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
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
                        {...register("phone")}
                        required
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>

                {/* ID Number and Expiry Date Fields */}
                <div className="grid grid-cols-2 gap-4">
                    {/* ID Number Field */}
                    <div className="space-y-2">
                        <Label htmlFor="idNumber" className="text-sm font-bold text-[#919499] block" >
                            رقم الهوية
                        </Label>
                        <Input
                            dir="rtl"
                            id="national_id"
                            type="text"
                            placeholder="1234567890"
                            className="h-12 placeholder:text-gray-400 placeholder:text-start border-gray-300 rounded-lg text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            {...register("national_id")}
                            required
                        />
                        {errors.national_id && <p className="text-red-500 text-sm mt-1">{errors.national_id.message}</p>}
                    </div>

                    {/* Expiry Date Field */}
                    <div className="space-y-2" dir="rtl">
                        <Label htmlFor="expiryDate" className="text-sm font-bold text-[#919499] block" >
                            تاريخ الانتهاء
                        </Label>
                        <Input
                            id="id_expiry_date"
                            type="date"
                            placeholder="تاريخ الانتهاء"
                            className="h-12 placeholder:text-gray-400 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            {...register("id_expiry_date")}
                            required
                        />
                        {errors.id_expiry_date && <p className="text-red-500 text-sm mt-1">{errors.id_expiry_date.message}</p>}
                    </div>
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
                            {...register("password")}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute end-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
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
                            {...register("confirmPassword")}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute end-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                </div>

                {/* Register Button */}
                <Button onClick={handleSubmit(handleRegister)} disabled={isSubmitting} className="w-full bg-secondary hover:bg-secondary/90 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold h-14 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all mt-8">
                    {isSubmitting ? "جاري الإنشاء..." : "انشاء حساب"}
                </Button>

                {/* Login Link */}
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600" >
                        لديك حساب؟{"  "}
                        <Link href="/auth/login" className="text-secondary hover:text-secondary/90 font-bold">
                            تسجيل الدخول
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}