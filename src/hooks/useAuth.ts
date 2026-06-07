// src/hooks/useAuth.ts
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useFetchMeQuery, useLogoutMutation } from '../api';
import { clearAuthToken } from '../utils/authToken';

export function useAuth() {
    const { data: user, isLoading: loading, error } = useFetchMeQuery();
    const [logoutMutation] = useLogoutMutation();
    const isUnauthorized = (error as FetchBaseQueryError | undefined)?.status === 401;
    const safeUser = isUnauthorized ? undefined : user;

    const handleLogout = async () => {
        try {
            await logoutMutation().unwrap();
        } finally {
            clearAuthToken();
        }
    };

    return { user: safeUser, loading, logout: handleLogout };
}
