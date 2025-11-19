"use server";

import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

interface ContactUsData {
    name: string;
    email: string;
    message: string;
}

interface Ticket {
    id: number;
    ticket_number: string;
    chat_room_id: string;
    message: string;
    status: string;
}

interface MyTicketsResponse {
    success: boolean;
    tickets: Ticket[];
    total_count: number;
    pagination: {
        page: number;
        pageLimit: number;
        total_pages: number;
        has_next: boolean;
        has_previous: boolean;
    };
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

export async function getMyTickets(page: number = 1, pageLimit: number = 10) {
    try {
        const cookieStore = await cookies();
        const sessionId = cookieStore.get("session_id")?.value;
        const api_session = cookieStore.get("api_session")?.value;
        
        const response = await axios.get<MyTicketsResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}/api/my-tickets`,
            {
                params: { page, pageLimit },
                headers: {
                    "Content-Type": "application/json",
                    Cookie: `api_session=${api_session}; session_id=${sessionId}`,
                },
                withCredentials: true
            }
        );

        return {
            success: true,
            data: response.data
        };

    } catch (error) {
        console.log(error);
        console.log((error as AxiosError).response?.data);
        console.error("Error fetching tickets:", error);
        return {
            success: false,
            error: "حدث خطأ أثناء جلب التذاكر. يرجى المحاولة مرة أخرى.",
            data: null
        };
    }
}

export async function createTicket(message: string) {
    try {
        const cookieStore = await cookies();
        const sessionId = cookieStore.get("session_id")?.value;
        const api_session = cookieStore.get("api_session")?.value;
        
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/contact-ticket`,
            {
                message: message
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Cookie: `api_session=${api_session}; session_id=${sessionId}`,
                },
                withCredentials: true
            }
        );

        return {
            success: true,
            message: "تم إنشاء التذكرة بنجاح!",
            data: response.data
        };

    } catch (error) {
        console.log(error);
        console.log((error as AxiosError).response?.data);
        console.error("Error creating ticket:", error);
        return {
            success: false,
            error: "حدث خطأ أثناء إنشاء التذكرة. يرجى المحاولة مرة أخرى.",
            data: null
        };
    }
}