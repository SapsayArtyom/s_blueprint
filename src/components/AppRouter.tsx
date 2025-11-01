import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import { routeConfig } from "../configs/routeConfig"
import PageLoader from "../pages/PageLoader/PageLoader"
// import { routeConfig } from "src/configs/routeConfig/routeConfig"

const AppRouter = () => {
 
	return (
		<Routes>
			{Object.values(routeConfig).map(({element, path}) => (
				<Route 
					key={path}
					path={path}
					element={(
						<Suspense fallback={<PageLoader />}>
							{element}
						</Suspense>
					)}
				/>
			))}
		</Routes>
	)
}
 
export default AppRouter