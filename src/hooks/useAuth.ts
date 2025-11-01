// src/hooks/useAuth.ts
import { useFetchMeQuery, useLogoutMutation } from '../api';

export function useAuth() {
	const { data: user, isLoading: loading } = useFetchMeQuery();
	const [logoutMutation] = useLogoutMutation();

	const handleLogout = async () => {
		await logoutMutation().unwrap();
	};

	return { user, loading, logout: handleLogout };
}
