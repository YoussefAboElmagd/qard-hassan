import { useState, useEffect, useRef } from 'react';
import { checkAuth, userLogout } from '@/actions/auth.actions';

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const hasVerified = useRef(false);

    const verifyAuth = async () => {
        // Only verify once to avoid re-checking on every navigation
        if (hasVerified.current) {
            return;
        }

        try {
            setIsLoading(true);
            const isAuth = await checkAuth();
            setIsAuthenticated(isAuth);
            hasVerified.current = true;
        } catch (error) {
            console.error('Auth verification failed:', error);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            setIsLoading(true);
            await userLogout();
            setIsAuthenticated(false);
            hasVerified.current = false; // Reset verification flag on logout
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        verifyAuth();
    }, []);

    return { isAuthenticated, isLoading, logout };
}