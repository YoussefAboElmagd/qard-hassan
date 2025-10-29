"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getProfileData } from '@/actions/profile.actions';

interface UserProfile {
    name: string;
    email: string;
    phone: string;
    national_id: string;
    id_expiry_date: string;
    image_url?: string;
}

interface UserContextType {
    user: UserProfile | null;
    isLoading: boolean;
    refreshUser: () => Promise<void>;
    updateUser: (userData: Partial<UserProfile>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUserData = async () => {
        try {
            setIsLoading(true);
            const data = await getProfileData();
            
            if (data.success && data.profile) {
                setUser({
                    name: data.profile.name,
                    email: data.profile.email,
                    phone: data.profile.phone,
                    national_id: data.profile.national_id,
                    id_expiry_date: data.profile.id_expiry_date,
                    image_url: data.profile.image_url
                });
            }
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const refreshUser = async () => {
        await fetchUserData();
    };

    const updateUser = (userData: Partial<UserProfile>) => {
        setUser(prev => prev ? { ...prev, ...userData } : null);
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={{ user, isLoading, refreshUser, updateUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}

