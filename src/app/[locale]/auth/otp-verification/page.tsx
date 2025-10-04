"use client";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import mainLogo from "@/assets/images/main-logo.png";
import { resendOtp, userOtpVerification } from "@/actions/auth.actions";
import { useRouter } from "next/navigation";

export default function OTPVerification() {
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [resendMessage, setResendMessage] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [otpType, setOtpType] = useState<string>("login");
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    const router = useRouter();
    
    // Helper function to get cookie value
    const getCookie = (name: string): string | null => {
        if (typeof document === 'undefined') return null;
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            const cookieValue = parts.pop()?.split(';').shift() || null;
            // Decode URL-encoded values (like %40 for @)
            return cookieValue ? decodeURIComponent(cookieValue) : null;
        }
        return null;
    };

    // Get email and type from cookies on component mount
    useEffect(() => {
        const cookieEmail = getCookie("otp_email");
        const cookieType = getCookie("otp_type");

        if (cookieEmail) {
            setEmail(cookieEmail);
        } else {
            // Redirect to login if no email cookie found
            router.push("/ar/auth/login");
            return;
        }

        if (cookieType) {
            setOtpType(cookieType);
        }

        console.log("Email from cookie:", cookieEmail);
        console.log("OTP Type from cookie:", cookieType);
        setIsInitialized(true);
    }, [router]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (
            !/^[0-9]{1}$/.test(e.key) &&
            e.key !== "Backspace" &&
            e.key !== "Delete" &&
            e.key !== "Tab" &&
            !e.metaKey
        ) {
            e.preventDefault();
        }

        if (e.key === "Delete" || e.key === "Backspace") {
            const index = inputRefs.current.indexOf(e.target as HTMLInputElement);

            // If there's content in the current input, clear it
            if (otp[index]) {
                setOtp((prevOtp) => [
                    ...prevOtp.slice(0, index),
                    "",
                    ...prevOtp.slice(index + 1),
                ]);
            }
            // If current input is empty and we're not at the first input, move to previous
            else if (index > 0) {
                setOtp((prevOtp) => [
                    ...prevOtp.slice(0, index - 1),
                    "",
                    ...prevOtp.slice(index),
                ]);
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target } = e;
        const index = inputRefs.current.indexOf(target);

        // Clear error when user starts typing
        if (error) {
            setError("");
        }

        if (target.value) {
            // Replace the current value and move to next field
            setOtp((prevOtp) => [
                ...prevOtp.slice(0, index),
                target.value,
                ...prevOtp.slice(index + 1),
            ]);

            // Always move to next field if available
            if (index < otp.length - 1) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.select();
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const text = e.clipboardData.getData("text").trim();

        // Allow pasting 6 digits (exactly the OTP length)
        if (!/^[0-9]{6}$/.test(text)) {
            return;
        }

        const digits = text.split("");
        setOtp(digits);

        // Focus on the last input after pasting
        setTimeout(() => {
            inputRefs.current[5]?.focus();
        }, 0);
    };



    const handleConfirm = async () => {
        const otpCode = otp.join("");
        if (!email || !otpType) {
            console.error("Email or OTP type is missing");
            return;
        }
        setIsLoading(true);
        setError("");
        try {
            const response = await userOtpVerification({ email, otp: otpCode, type: otpType });
            console.log(response);
            document.cookie = `user=${response.user}; path=/; max-age=604800`;
            if (response.success == true) {
                if (otpType == "forgot_password") {
                    sessionStorage.setItem("otpNumber", otpCode);
                    router.push("/ar/auth/reset-password");
                } else if (otpType == "register") {
                    router.push("/ar/auth/login");
                } else {
                    router.push("/");
                }
            }
            // Check if the response indicates success
            if (response && response.success === false) {
                setError("كود OTP غير صحيح. يرجى المحاولة مرة أخرى.");
            }
        } catch (error) {
            console.error("OTP verification failed:", error);
            setError("كود OTP غير صحيح. يرجى المحاولة مرة أخرى.");
        } finally {
            setIsLoading(false);
        }
    }

    const handleResendCode = async () => {
        setIsLoading(true);
        setResendMessage("");
        try {
            const response = await resendOtp(email as string);
            console.log(response);
            if (response.success == true) {
                setResendMessage("تم إرسال الكود بنجاح ✅");
            }
            if (response.success == false) {
                setResendMessage("فشل في إرسال الكود. يرجى المحاولة مرة أخرى. ❌");
            }
        } catch (error) {
            console.error("Resend OTP error:", error);
            setResendMessage("فشل في إرسال الكود. يرجى المحاولة مرة أخرى.");
        } finally {
            setIsLoading(false);
        }
        
    }

    // Show loading while checking for cookies
    if (!isInitialized) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">جاري التحميل...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-screen flex flex-col justify-top gap-10 ">
            {/* Logo */}
            <div className="mb-12 flex justify-start">
                <Image src={mainLogo.src} alt="Logo" width={200} height={200} className="" />
            </div>

            <div>
                {/* Title */}
                <h1 className="text-5xl font-bold text-primary text-start ">
                    ادخال OTP
                </h1>

                {/* Description */}
                <p className="text-lg text-gray-600 mb-8 leading-relaxed text-start">
                    تم إرسال رسالة OTP التي تحتوي على الكود الخاص بك إلى {email}
                </p>
            </div>

            {/* Instruction */}
            <p className="text-center text-primary font-bold mb-6">
                ادخل الكود المرسل المكون من 6 أرقام
            </p>

            {/* OTP Input Fields */}
            <div className="flex justify-center gap-4 mb-8" dir="ltr">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={handleInput}
                        onKeyDown={handleKeyDown}
                        onFocus={handleFocus}
                        onPaste={handlePaste}
                        ref={(el) => {
                            inputRefs.current[index] = el;
                        }}
                        className={`flex w-16 h-16 items-center justify-center rounded-lg border-2 p-2 text-center text-xl font-semibold text-gray-900 outline-none transition-all ${error
                                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                : "border-gray-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                            }`}
                    />
                ))}
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-center font-medium">
                        {error}
                    </p>
                </div>
            )}

            {/* Timer */}
            {/* <div className="mb-6">
                    <p className="text-lg text-gray-600">
                        تم إرسال الكود <span className="text-red-500 font-bold">{formatTime(timer)}</span>
                    </p>
                </div> */}

            {/* Resend Link */}
            <div className="mb-10 flex flex-col gap-2 justify-center items-center">
                    <p className="text-base text-black">
                        لم يصلني الكود؟ {" "}
                        <button
                            onClick={handleResendCode}
                            className="text-primary hover:text-primary/80 cursor-pointer font-bold "
                        >
                               {isLoading ? (
                                    <span>جاري الإرسال...</span>
                            ) : (
                                "إرسال مره أخري"
                            )}
                        </button>
                    </p>
                    {resendMessage && (
                        <p className="text-green-500 text-lg text-center font-medium">
                            {resendMessage} 
                        </p>
                    )}
                </div>

            {/* Confirm Button */}
            <Button
                onClick={handleConfirm}
                className="w-full max-w-md mx-auto bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white font-bold h-14 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={otp.some(digit => !digit) || isLoading}
            >
                {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>جاري التحقق...</span>
                    </div>
                ) : (
                    "تأكيد"
                )}
            </Button>
        </div>

    );
}
