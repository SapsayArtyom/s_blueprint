import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const ReactCompilerConfig = {
	/* ... */
};

// https://vite.dev/config/
export default defineConfig({
	// Base path для GitHub Pages - название репозитория
	base: '/s_blueprint/',
	plugins: [
		react({
			babel: {
				plugins: [
					['babel-plugin-react-compiler', ReactCompilerConfig],
				],
			},
		}),
		tailwindcss(),
	],
	server: {
		port: 3030,
		strictPort: false,
		open: true
	},
	build: {
		outDir: 'dist',
		sourcemap: false,
		// Оптимизация для продакшена
		minify: 'esbuild',
	},
});
