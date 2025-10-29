"use server";

import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

interface ContactUsData {
    name: string;
    email: string;
    message: string;
}

export async function contactUs(data: ContactUsData) {
    try {
        const cookieStore = await cookies();
        const sessionId = cookieStore.get("session_id")?.value;
        const api_session = cookieStore.get("api_session")?.value;
        
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/contact-us`, data, {
            headers: {
                "Content-Type": "application/json",
                Cookie: `api_session=${api_session}; session_id=${sessionId}`,
            },
            withCredentials: true
        });

        return {
            success: true,
            message: response.data.message || "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.",
            data: response.data
        };

    } catch (error) {
        console.log(error);
        console.log((error as AxiosError).response?.data);
        console.error("Error contacting us:", error);
        return {
            success: false,
            error: "حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى."
        };
    }
}