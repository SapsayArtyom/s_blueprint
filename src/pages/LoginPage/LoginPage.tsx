import { type ReactNode } from 'react';
import { useGetProgramMeActiveQuery } from '../../api';
import { useAuth } from '../../hooks/useAuth';

interface LoginPageProps {
    className?: string;
    children?: ReactNode;
}

export function LoginPage({ className }: LoginPageProps) {
	const { user, loading, logout } = useAuth();
	const { data: programData } = useGetProgramMeActiveQuery(undefined, {
		skip: !user, // Skip the query if user is not logged in
	});

	// Log program data when it changes
	if (programData) {
		console.log('Program data:', programData);
	}

	if (loading) return <p>Загрузка...</p>;

	const apiUrl = import.meta.env.VITE_API_URL || 'https://sport-blueprint-api-310298945951.us-central1.run.app/api';
	// Убираем trailing slash из BASE_URL если он есть
	const basePath = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
	const redirectUrl = `${window.location.origin}${basePath}`;
	
	console.log('API URL:', apiUrl); // Для отладки
	console.log('Base Path:', basePath); // Для отладки
	console.log('Redirect URL:', redirectUrl); // Для отладки
	
	if (!user) {
		return (
			<div>
				<a href={`${apiUrl}/auth/google?redirect=${encodeURIComponent(redirectUrl)}`}>
					Войти через Google
				</a>
			</div>
		);
	}

	return (
		<div className={className}>
			<h1>Привет, {user.name} 👋</h1>
			<button onClick={logout}>Выйти</button>
		</div>
	);
}

export default LoginPage;
