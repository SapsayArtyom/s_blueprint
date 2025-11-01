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

	if (!user) {
		return (
			<div>
				<h1>Добро пожаловать!</h1>
				<a href={`${import.meta.env.VITE_API_URL}/auth/google`}>Войти через Google</a>
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
