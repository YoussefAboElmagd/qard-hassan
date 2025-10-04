"use client";
import React, { useRef, useState, forwardRef, useImperativeHandle } from "react";
import { Input } from "./input";

interface OtpInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
  onChange?: (otp: string) => void;
  className?: string;
  disabled?: boolean;
}

export interface OtpInputRef {
  focus: () => void;
  clear: () => void;
  getValue: () => string;
}

const OtpInput = forwardRef<OtpInputRef, OtpInputProps>(
  ({ length = 6, onComplete, onChange, className = "", disabled = false }, ref) => {
    const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRefs.current[0]?.focus();
      },
      clear: () => {
        setOtp(Array(length).fill(""));
        inputRefs.current[0]?.focus();
      },
      getValue: () => otp.join(""),
    }));

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Allow only numbers, backspace, delete, tab, and arrow keys
      if (
        !/^[0-9]{1}$/.test(e.key) &&
        e.key !== "Backspace" &&
        e.key !== "Delete" &&
        e.key !== "Tab" &&
        e.key !== "ArrowLeft" &&
        e.key !== "ArrowRight" &&
        !e.metaKey &&
        !e.ctrlKey
      ) {
        e.preventDefault();
      }

      const index = inputRefs.current.indexOf(e.target as HTMLInputElement);
      
      if (e.key === "Delete" || e.key === "Backspace") {
        if (index > 0 && !otp[index]) {
          // If current field is empty and we're not on the first field, move to previous
          setOtp((prevOtp) => [
            ...prevOtp.slice(0, index - 1),
            "",
            ...prevOtp.slice(index),
          ]);
          inputRefs.current[index - 1]?.focus();
        } else if (otp[index]) {
          // If current field has value, clear it
          setOtp((prevOtp) => [
            ...prevOtp.slice(0, index),
            "",
            ...prevOtp.slice(index + 1),
          ]);
        }
      }
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { target } = e;
      const index = inputRefs.current.indexOf(target);
      const value = target.value;

      // Only allow single digit
      if (value.length > 1) return;

      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Call onChange with the complete OTP
      const otpString = newOtp.join("");
      onChange?.(otpString);

      // Check if OTP is complete
      if (otpString.length === length && !otpString.includes("")) {
        onComplete?.(otpString);
      }

      // Auto-focus next input
      if (value && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      e.target.select();
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const text = e.clipboardData.getData("text");
      
      // Check if pasted text contains only numbers and has correct length
      if (!new RegExp(`^[0-9]{${length}}$`).test(text)) {
        return;
      }

      const digits = text.split("").slice(0, length);
      setOtp(digits);
      
      const otpString = digits.join("");
      onChange?.(otpString);
      
      if (otpString.length === length) {
        onComplete?.(otpString);
      }

      // Focus the last filled input or the next empty one
      const lastFilledIndex = digits.findIndex(digit => !digit);
      const focusIndex = lastFilledIndex === -1 ? length - 1 : lastFilledIndex;
      inputRefs.current[focusIndex]?.focus();
    };

    return (
      <div className={`flex gap-3 justify-center ${className}`} dir="ltr">
        {otp.map((digit, index) => (
          <Input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onPaste={handlePaste}
            disabled={disabled}
            className="w-16 h-16 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
          />
        ))}
      </div>
    );
  }
);

OtpInput.displayName = "OtpInput";

export { OtpInput };
