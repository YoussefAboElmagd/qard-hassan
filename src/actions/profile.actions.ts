"use server";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

interface ProfileData {
    name: string;
    email: string;
    phone: string;
    national_id: string;
    id_expiry_date: string;
}

export async function getProfileData() {
    try {
        const cookieStore = await cookies();
        const sessionId = cookieStore.get("session_id")?.value;
        const api_session = cookieStore.get("api_session")?.value;
        
        
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/data`, {
            headers: {
                Cookie: `api_session=${api_session}; session_id=${sessionId}`,
            },
            withCredentials: true
        });
        
        return {
            success: true,
            ...response.data
        };
    } catch (error) {
        console.error("Error getting profile data:", error);
        
        const axiosError = error as AxiosError<{ message?: string; error?: string }>;
        const backendMessage = axiosError.response?.data?.message || axiosError.response?.data?.error;
        const statusCode = axiosError.response?.status;
        
        console.log("Backend error response:", axiosError.response?.data);
        
        return {
            success: false,
            message: backendMessage || "حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى.",
            status: statusCode
        };
    }
}


export async function editProfileData(data: ProfileData) {
    try {
        const cookieStore = await cookies();
        const sessionId = cookieStore.get("session_id")?.value;
        const api_session = cookieStore.get("api_session")?.value;
        
        
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/edit`, data, {
            headers: {
                Cookie: `api_session=${api_session}; session_id=${sessionId}`,
            },
            withCredentials: true
        });
        
        return {
            success: true,
            message: response.data.message || "تم حفظ التعديلات بنجاح!",
            data: response.data
        };
    } catch (error) {
        console.error("Error editing profile data:", error);
        
        const axiosError = error as AxiosError<{ message?: string; error?: string }>;
        const backendMessage = axiosError.response?.data?.message || axiosError.response?.data?.error;
        const statusCode = axiosError.response?.status;
        
        console.log("Backend error response:", axiosError.response?.data);
        
        return {
            success: false,
            message: backendMessage || "حدث خطأ أثناء حفظ التعديلات. يرجى المحاولة مرة أخرى.",
            status: statusCode
        };
    }
}

interface ResetPasswordData {
    current_password: string;
    new_password: string;
    confirm_password: string;
}

export async function resetPassword(data: ResetPasswordData) {
    try {
        const cookieStore = await cookies();
        const sessionId = cookieStore.get("session_id")?.value;
        const api_session = cookieStore.get("api_session")?.value;
        
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/reset-password`, data, {
            headers: {
                Cookie: `api_session=${api_session}; session_id=${sessionId}`,
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Error resetting password:", error);
        throw error;
    }
}

export async function changeProfilePhoto(formData: FormData) {
    try {
        const cookieStore = await cookies();
        const sessionId = cookieStore.get("session_id")?.value;
        const api_session = cookieStore.get("api_session")?.value;

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/photo`, formData, {
            headers: {
                Cookie: `api_session=${api_session}; session_id=${sessionId}`,
            },
            withCredentials: true
        });
        
        return {
            success: true,
            message: response.data.message || "تم تحديث صورة الملف الشخصي بنجاح!",
            data: response.data
        };
    } catch (error) {
        console.error("Error changing profile photo:", error);
        const axiosError = error as AxiosError<{ message?: string }>;
        const statusCode = axiosError.response?.status;
        return {
            success: false,
            message: axiosError.response?.data?.message || "حدث خطأ أثناء تحديث الصورة. يرجى المحاولة مرة أخرى.",
            status: statusCode
        };
    }
}
