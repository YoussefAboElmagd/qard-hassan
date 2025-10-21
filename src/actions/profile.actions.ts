"use server";
import axios from "axios";
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
        
        return response.data;
    } catch (error) {
        console.error("Error getting profile data:", error);
        throw error;
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
        
        return response.data;
    } catch (error) {
        console.error("Error editing profile data:", error);
        throw error;
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

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/change-profile-photo`, formData, {
            headers: {
                Cookie: `api_session=${api_session}; session_id=${sessionId}`,
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Error changing profile photo:", error);
        throw error;
    }
}
