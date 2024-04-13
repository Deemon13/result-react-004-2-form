import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	base: 'result-react-004-2-form',
	plugins: [react()],
	server: {
		open: true,
	},
});
