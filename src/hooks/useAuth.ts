import { useState, useEffect } from 'react';
import { checkAuth, userLogout } from '@/actions/auth.actions';

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const verifyAuth = async () => {
        try {
            const isAuth = await checkAuth();
            setIsAuthenticated(isAuth);
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
        } catch (error) {
            console.error('Logout failed:', error);
            // setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        verifyAuth();
    }, []);

    return { isAuthenticated, isLoading, logout };
}