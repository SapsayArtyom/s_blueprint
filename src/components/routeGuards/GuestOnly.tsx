import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function GuestOnly({ children }: { children: ReactNode }) {
	const { user, loading } = useAuth();
	const location = useLocation();

	if (loading) return null;

	if (user) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const redirectTo = (location.state as any)?.from?.pathname || '/';
		return <Navigate to={redirectTo} replace />;
	}

	return <>{children}</>;
}
