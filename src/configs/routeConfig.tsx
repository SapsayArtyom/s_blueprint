import { type RouteProps } from 'react-router-dom';
import GuestOnly from '../components/routeGuards/GuestOnly';
import RequireAuth from '../components/routeGuards/RequireAuth';
import LoginPage from '../pages/LoginPage/LoginPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import SchedulePage from '../pages/SchedulePage/SchedulePage';

export enum AppRoutes {
    HOME = 'home',
    LOGIN = 'login',
    // SIZES = 'sizes',
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
	[AppRoutes.HOME]: '/',
	[AppRoutes.LOGIN]: '/login',
	// [AppRoutes.SIZES]: '/sizes',
	[AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
	[AppRoutes.HOME]: {
		path: RoutePath.home,
		element: (
			<RequireAuth>
				<SchedulePage />
			</RequireAuth>
		),
	},
	[AppRoutes.LOGIN]: {
		path: RoutePath.login,
		element: (
			<GuestOnly>
				<LoginPage />
			</GuestOnly>
		),
	},
	// [AppRoutes.SIZES]: {
	//     path: RoutePath.sizes,
	//     element: <SizesPage />,
	// },
	[AppRoutes.NOT_FOUND]: {
		path: RoutePath.not_found,
		element: <NotFoundPage />,
	},
};
