import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App.tsx';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary.tsx';
import PageError from './components/pageError/PageError.tsx';
import { BASE_PATH } from './configs/config.ts';
import './index.css';
import { store } from './store/store.ts';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<BrowserRouter basename={BASE_PATH}>
				<ErrorBoundary fallback={<PageError />}>
					<App />
				</ErrorBoundary>
			</BrowserRouter>
		</Provider>
	</StrictMode>,
);
