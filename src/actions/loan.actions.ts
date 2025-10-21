"use server";

import axios from "axios";
import { cookies } from "next/headers";

interface LoanRequestResponse {
    success: boolean;
    message?: string;
    data?: unknown;
    errors?: Record<string, string[]>;
}

/**
 * Submit a loan request with all required information and documents
 * 
 * Expected FormData fields:
 * 
 * Requester Information:
 * - requester_name: string
 * - requester_national_id: string
 * - requester_id_expiry_date: string (YYYY-MM-DD)
 * - requester_nationality_id: string
 * - requester_phone: string
 * - requester_email: string
 * - requester_street: string
 * - requester_work_address: string
 * - requester_work_phone: string
 * - requester_city: string
 * - requester_backup_name: string
 * - requester_backup_phone: string
 * 
 * Guarantor Information:
 * - guarantor_name: string
 * - guarantor_national_id: string
 * - guarantor_id_expiry_date: string (YYYY-MM-DD)
 * - guarantor_nationality_id: string
 * - guarantor_phone: string
 * - guarantor_email: string
 * - guarantor_street: string
 * - guarantor_work_address: string
 * - guarantor_work_phone: string
 * - guarantor_city: string
 * - guarantor_backup_name: string
 * - guarantor_backup_phone: string
 * 
 * Financial Information:
 * - rent_amount_number: string (decimal)
 * - electricity_avg_number: string (decimal)
 * - income_amount_number: string (decimal)
 * - loan_amount_number: string (decimal)
 * - number_of_installments: string (integer)
 * - loan_reason_id: string (integer)
 * - has_other_commitments: string (boolean)
 * - other_commitments_details: string
 * 
 * Requester Documents (File):
 * - requester_signature: File
 * - requester_national_address_image: File
 * - requester_imam_recommendation: File
 * - requester_income_proof: File
 * - requester_credit_report: File
 * - requester_valid_id: File
 * - requester_najiz_report: File
 * - requester_iban_certificate: File
 * - requester_promissory_note: File
 * 
 * Guarantor Documents (File):
 * - guarantor_national_address_image: File
 * - guarantor_income_proof: File
 * - guarantor_credit_report: File
 * - guarantor_valid_id: File
 */
export async function requestLoan(formData: FormData): Promise<LoanRequestResponse> {
    console.log(formData, 'formData');
    console.log(process.env.NEXT_PUBLIC_API_URL, 'process.env.NEXT_PUBLIC_API_URL');
    
    // Log all FormData entries for debugging
    console.log('=== FormData Entries ===');
    for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
            console.log(`${key}: [File] ${value.name} (${value.size} bytes, ${value.type})`);
        } else {
            console.log(`${key}: ${value}`);
        }
    }
    console.log('=== End FormData Entries ===');
    
    try {
        const cookieStore = await cookies();
        const sessionId = cookieStore.get("session_id")?.value;
        const api_session = cookieStore.get("api_session")?.value;
        // Send FormData directly to the API endpoint
        const response = await axios.post<LoanRequestResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}/api/loan/create`,
            formData,
            {
                headers: {
                    Cookie: `api_session=${api_session}; session_id=${sessionId}`,
                },
                withCredentials: true
            },
        );
        console.log(response.data);
        return {
            success: true,
            message: response.data.message || "تم إرسال طلب القرض بنجاح",
            data: response.data,
        };
    } catch (error: unknown) {
        console.error("Loan request error:", error);

        if (axios.isAxiosError(error)) {
            // Log full error details for debugging
            console.error("Error response status:", error.response?.status);
            console.error("Error response data:", JSON.stringify(error.response?.data, null, 2));
            console.error("Error response headers:", error.response?.headers);
            
            if (error.response?.data) {
                return {
                    success: false,
                    message: error.response.data.message || "حدث خطأ أثناء إرسال طلب القرض",
                    errors: error.response.data.errors,
                };
            }

            return {
                success: false,
                message: error.message || "فشل الاتصال بالخادم",
            };
        }

        return {
            success: false,
            message: "حدث خطأ غير متوقع",
        };
    }
}

export async function getCountries() {

    try {
        const cookieStore = await cookies();
        const sessionId = cookieStore.get("session_id")?.value;
        const api_session = cookieStore.get("api_session")?.value;
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/countries`, {
            headers: {
                Cookie: `api_session=${api_session}; session_id=${sessionId}`,
            },
            withCredentials: true
        });
        return response.data;


    } catch (error) {
        console.error("Error getting countries:", error);
        throw error;
    }
}

export async function getLoanReasons() {
    try {
        const cookieStore = await cookies();
        const sessionId = cookieStore.get("session_id")?.value;
        const api_session = cookieStore.get("api_session")?.value;
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/loan/reasons`, {
            headers: {
                Cookie: `api_session=${api_session}; session_id=${sessionId}`,
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Error getting loan reasons:", error);
        throw error;
    }
}