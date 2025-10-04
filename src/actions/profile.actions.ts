"use server";
import axios from "axios";
import { cookies } from "next/headers";

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