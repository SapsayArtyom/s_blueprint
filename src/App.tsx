import AppRouter from './components/AppRouter';
import Navbar from './components/navbar/Navbar';
import { classNames } from './helpers/classNames';

export const App = () => {
	return (
		<div id="app" className={classNames('', {}, ['flex', 'justify-center', 'items-center', 'flex-col'])}>
			{/* <div className="flex justify-start p-[13px] absolute z-10 top-0 left-0"> */}
			<Navbar />
			{/* </div> */}
			<div className="layout">
				<AppRouter />
			</div>
		</div>
	);
}
